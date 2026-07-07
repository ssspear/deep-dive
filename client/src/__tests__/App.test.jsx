import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import App from '../App';

const creaturesPayload = {
  data: [
    {
      name: 'dolphins',
      habitat: 'Oceans worldwide',
      diet: 'Fish and squid',
      conservationStatus: 'Least Concern',
      funFact: 'Dolphins use echolocation to navigate.',
    },
    {
      name: 'manatees',
      habitat: 'Shallow coastal waters',
      diet: 'Seagrasses',
      conservationStatus: 'Vulnerable',
      funFact: 'Manatees can eat a tenth of their body weight daily.',
    },
    {
      name: 'sea turtles',
      habitat: 'Tropical oceans',
      diet: 'Jellyfish and seagrasses',
      conservationStatus: 'Endangered',
      funFact: 'Female sea turtles return to the same beach to nest.',
    },
  ],
};

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => creaturesPayload,
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

  it('renders creature names fetched from the API', async () => {
    render(<App />);
    expect(await screen.findByText(/dolphins/i)).toBeInTheDocument();
    expect(await screen.findByText(/sea turtles/i)).toBeInTheDocument();
  });

  it('renders a CreatureCard when a creature link is clicked', async () => {
    render(<App />);
    fireEvent.click(await screen.findByRole('button', { name: /dolphins/i }));

    expect(
      await screen.findByRole('heading', { name: /dolphins/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/oceans worldwide/i)).toBeInTheDocument();
    expect(screen.getByText(/fish and squid/i)).toBeInTheDocument();
    expect(screen.getByText(/least concern/i)).toBeInTheDocument();
    expect(
      screen.getByText(/dolphins use echolocation/i),
    ).toBeInTheDocument();
  });

  it('generates a loremflickr image URL for the selected creature', async () => {
    render(<App />);
    fireEvent.click(await screen.findByRole('button', { name: /dolphins/i }));

    const img = await screen.findByRole('button', {
      name: /view full image of dolphins/i,
    });
    expect(img.tagName).toBe('IMG');
    expect(img.getAttribute('src')).toMatch(
      /^https:\/\/loremflickr\.com\/400\/300\/dolphin\?lock=\d+$/,
    );
  });

  it('generates a different image URL on each click', async () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.1).mockReturnValueOnce(0.9);
    render(<App />);
    const link = await screen.findByRole('button', { name: /sea turtles/i });

    fireEvent.click(link);
    const firstSrc = screen
      .getByRole('button', { name: /view full image of sea turtles/i })
      .getAttribute('src');
    expect(firstSrc).toContain('/400/300/sea,turtle?lock=');

    fireEvent.click(link);
    const secondSrc = screen
      .getByRole('button', { name: /view full image of sea turtles/i })
      .getAttribute('src');
    expect(secondSrc).not.toEqual(firstSrc);
  });

  it('fetches from the /api/creatures endpoint', async () => {
    render(<App />);
    await screen.findByText(/dolphins/i);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/creatures'),
    );
  });
});
