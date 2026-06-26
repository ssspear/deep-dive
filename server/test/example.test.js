const { test } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('../server');

test('GET /api/example returns the list of sea creatures', async () => {
  const res = await request(app).get('/api/example');
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(res.body, {
    data: ['dolphins', 'manatees', 'sea turtles'],
  });
});

test('unknown routes respond with a 404 JSON error', async () => {
  const res = await request(app).get('/does-not-exist');
  assert.strictEqual(res.status, 404);
  assert.ok(res.body.message);
});
