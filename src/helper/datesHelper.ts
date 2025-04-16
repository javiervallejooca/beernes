import { HOUR_BEERNES, MINUTES_BEERNES } from '../data/constants';

export const datesHelper = {
  /**
   * Returns the date of the last Friday of the current month.
   * @returns {Date} The last Friday of the month.
   */
  getLastFridayOfTheMonth: (): Date => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const lastDay = new Date(year, month + 1, 0);
    while (lastDay.getDay() !== 5) {
      lastDay.setDate(lastDay.getDate() - 1);
    }

    return lastDay;
  },

  /**
   * Checks if today is the last Friday of the current month.
   * @returns {boolean} True if today is the last Friday of the month, false otherwise.
   */
  isLastFridayOfTheMonth: (): boolean => {
    const today = new Date();
    const lastFriday = datesHelper.getLastFridayOfTheMonth();

    return (
      today.getFullYear() === lastFriday.getFullYear() &&
      today.getMonth() === lastFriday.getMonth() &&
      today.getDate() === lastFriday.getDate()
    );
  },

  /**
   * Formats a date as "D de monthName" in Spanish.
   * @param {Date} date - The date to format.
   * @returns {string} A string formatted as "D de monthName".
   */
  formatDateToDayMonthName: (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long' });

    const formattedMonth = month.charAt(0).toLowerCase() + month.slice(1);

    return `${day} de ${formattedMonth}`;
  },

  /**
   * Calculates the millisecond difference between now and a given target date,
   * setting the target time to the configured HOUR_BEERNES and MINUTES_BEERNES.
   * @param {Date} targetDate - The target date to compare with the current time.
   * @returns {number} The time difference in milliseconds.
   */
  getDiffUntil: (targetDate: Date): number => {
    const now = new Date();
    const targetTime = new Date(targetDate);
    targetTime.setHours(HOUR_BEERNES, MINUTES_BEERNES, 0, 0);
    return targetTime.getTime() - now.getTime();
  },

  /**
   * Calculates the remaining time until a given target date and time.
   * @param {Date} targetDate - The date to count down to.
   * @returns {Object} An object with the remaining days, hours, minutes, and seconds.
   */
  getTimeUntil: (
    targetDate: Date
  ): { days: number; hours: number; minutes: number; seconds: number } => {
    const diff = datesHelper.getDiffUntil(targetDate);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  },

  /**
   * Calculates the total time units (days, hours, minutes, seconds) until a given date.
   * @param {Date} targetDate - The target date.
   * @returns {Object} An object with total days, hours, minutes, and seconds remaining.
   */
  getTotalUnitsUntil: (
    targetDate: Date
  ): {
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
    totalSeconds: number;
  } => {
    const diff = datesHelper.getDiffUntil(targetDate);
    return {
      totalDays: Math.floor(diff / (1000 * 60 * 60 * 24)),
      totalHours: Math.floor(diff / (1000 * 60 * 60)),
      totalMinutes: Math.floor(diff / (1000 * 60)),
      totalSeconds: Math.floor(diff / 1000),
    };
  },
};
