import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ data: ['dolphins', 'manatees', 'sea turtles'] }),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /welcome to blue ocean/i }),
    ).toBeInTheDocument();
  });

  it('renders sea creatures fetched from the API', async () => {
    render(<App />);
    expect(await screen.findByText(/dolphins/i)).toBeInTheDocument();
    expect(await screen.findByText(/sea turtles/i)).toBeInTheDocument();
  });

  it('shows a random related image when a creature link is clicked', async () => {
    render(<App />);
    fireEvent.click(await screen.findByRole('button', { name: /dolphins/i }));

    const img = await screen.findByRole('img', { name: /dolphins photo/i });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toMatch(
      /^https:\/\/loremflickr\.com\/400\/300\/dolphin\?lock=\d+$/,
    );
  });

  it('requests a different image on each click', async () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.9);
    render(<App />);
    const link = await screen.findByRole('button', { name: /sea turtles/i });

    fireEvent.click(link);
    const firstSrc = screen
      .getByRole('img', { name: /sea turtles photo/i })
      .getAttribute('src');
    expect(firstSrc).toContain('/400/300/sea,turtle?lock=');

    fireEvent.click(link);
    const secondSrc = screen
      .getByRole('img', { name: /sea turtles photo/i })
      .getAttribute('src');
    expect(secondSrc).not.toEqual(firstSrc);
  });
});
