const { test } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('../server');

const REQUIRED_FIELDS = ['name', 'habitat', 'diet', 'conservationStatus', 'funFact'];
const EXPECTED_NAMES = ['dolphins', 'manatees', 'sea turtles'];

test('GET /api/creatures returns 200 and JSON', async () => {
  const res = await request(app).get('/api/creatures');
  assert.strictEqual(res.status, 200);
  assert.match(res.headers['content-type'], /application\/json/);
});

test('GET /api/creatures returns a non-empty data array', async () => {
  const res = await request(app).get('/api/creatures');
  assert.ok(Array.isArray(res.body.data));
  assert.ok(res.body.data.length > 0);
});

test('each creature has all five required string fields', async () => {
  const res = await request(app).get('/api/creatures');
  for (const creature of res.body.data) {
    for (const field of REQUIRED_FIELDS) {
      assert.strictEqual(typeof creature[field], 'string', `expected ${field} to be a string`);
      assert.ok(creature[field].length > 0, `expected ${field} to be non-empty`);
    }
  }
});

test('the three expected creature names are present', async () => {
  const res = await request(app).get('/api/creatures');
  const names = res.body.data.map((creature) => creature.name);
  for (const expected of EXPECTED_NAMES) {
    assert.ok(names.includes(expected), `expected ${expected} to be present`);
  }
});
