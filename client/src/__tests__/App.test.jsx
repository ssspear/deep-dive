import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ data: ['dolphins', 'manatees', 'sea turtles'] }),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /welcome to blue ocean/i })
    ).toBeInTheDocument();
  });

  it('renders sea creatures fetched from the API', async () => {
    render(<App />);
    expect(await screen.findByText(/dolphins/i)).toBeInTheDocument();
    expect(await screen.findByText(/sea turtles/i)).toBeInTheDocument();
  });
});
