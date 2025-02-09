type Range = [min: number, max: number];

/**
 * Check if {@link value} is a number between the given range (inclusive).
 */
export const isBetween = (value: number, [min, max]: Range) =>
  value >= min && value <= max;
