import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CreatureCard from '../CreatureCard';

const creature = {
  name: 'Blue Whale',
  habitat: 'Open ocean',
  diet: 'Krill',
  conservationStatus: 'Endangered',
  funFact: 'Largest animal ever known to have lived on Earth',
  imageUrl: 'https://example.com/whale.jpg',
};

describe('CreatureCard', () => {
  it('renders all five text fields', () => {
    render(<CreatureCard creature={creature} />);

    expect(screen.getByRole('heading', { name: /blue whale/i })).toBeInTheDocument();
    expect(screen.getByText(/open ocean/i)).toBeInTheDocument();
    expect(screen.getByText(/krill/i)).toBeInTheDocument();
    expect(screen.getByText(/endangered/i)).toBeInTheDocument();
    expect(screen.getByText(/largest animal ever known/i)).toBeInTheDocument();
  });

  it('renders the image with descriptive alt text', () => {
    render(<CreatureCard creature={creature} />);
    const img = screen.getByRole('button', { name: /view full image of blue whale/i });
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe('IMG');
    expect(img).toHaveAttribute('src', creature.imageUrl);
  });

  it('shows a placeholder when imageUrl is empty', () => {
    render(<CreatureCard creature={{ ...creature, imageUrl: '' }} />);
    expect(screen.getByText(/no image available/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /view full image/i })).not.toBeInTheDocument();
  });

  it('opens the lightbox dialog when the image is clicked', () => {
    render(<CreatureCard creature={creature} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /view full image/i }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('closes the lightbox when the close button is clicked', () => {
    render(<CreatureCard creature={creature} />);
    fireEvent.click(screen.getByRole('button', { name: /view full image/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the lightbox when Escape is pressed', () => {
    render(<CreatureCard creature={creature} />);
    fireEvent.click(screen.getByRole('button', { name: /view full image/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the lightbox when the backdrop is clicked', () => {
    render(<CreatureCard creature={creature} />);
    fireEvent.click(screen.getByRole('button', { name: /view full image/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('lightbox-backdrop'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('returns focus to the trigger image after closing', () => {
    render(<CreatureCard creature={creature} />);
    const trigger = screen.getByRole('button', { name: /view full image/i });
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(document.activeElement).toBe(trigger);
  });
});
