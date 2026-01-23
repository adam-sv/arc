import { NumberUtils } from './';

export const TIME_MS = {
  SECOND: 1000,
  MINUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
  DAY: 1000 * 60 * 60 * 24,
  WEEK: 1000 * 60 * 60 * 24 * 7,
  YEAR: 1000 * 60 * 60 * 24 * 365,
  LEAP_YEAR_CYCLE: 1000 * 60 * 60 * 24 * (365 * 4 - 1),
};

export const getRandomDate = (
  minimumDate?: Date, // defaults to now
  maximumDate?: Date // defaults to one year after minimum
) => {
  minimumDate = minimumDate || new Date();
  maximumDate = maximumDate || getDateFromReference(minimumDate, TIME_MS.YEAR);
  const minMs = Math.min(minimumDate.getTime(), maximumDate.getTime());
  const maxMs = Math.max(minimumDate.getTime(), maximumDate.getTime());
  const diffMs = maxMs - minMs;
  const randomMs = NumberUtils.getRandomInt(0, diffMs);
  const randomDate = new Date(minMs + randomMs);
  return randomDate;
};

export const getDateFromReference = (
  reference: Date,
  difference: number // in milliseconds
): Date => {
  return new Date(reference.getTime() + difference);
};
