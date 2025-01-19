// utils/dateUtils.js
import { Platform } from 'react-native';

/**
 * Converts a date to a human-readable "time ago" string
 * @param {Date|string|number} date - The date to convert
 * @returns {string} Human-readable time difference
 */
export const timeAgo = (date) => {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.round((now - then) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(days / 30);
  const years = Math.round(days / 365);

  if (seconds < 30) {
    return 'just now';
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (days < 7) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (weeks < 4) {
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (months < 12) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
};

/**
 * Formats a date to a specific format
 * @param {Date|string|number} date - The date to format
 * @param {string} format - The format to use
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'MMM DD, YYYY') => {
  const d = new Date(date);
  
  const formats = {
    'MMM DD, YYYY': () => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}, ${d.getFullYear()}`;
    },
    'YYYY-MM-DD': () => {
      return d.toISOString().split('T')[0];
    },
    'DD/MM/YYYY': () => {
      return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    },
    'HH:mm': () => {
      return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    },
    'full': () => {
      return d.toLocaleString();
    }
  };

  return formats[format] ? formats[format]() : formats['MMM DD, YYYY']();
};

/**
 * Returns the day name for a given date
 * @param {Date|string|number} date - The date
 * @param {boolean} short - Whether to return short day name
 * @returns {string} Day name
 */
export const getDayName = (date, short = false) => {
  const days = {
    long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  };
  const d = new Date(date);
  return days[short ? 'short' : 'long'][d.getDay()];
};

/**
 * Checks if a date is today
 * @param {Date|string|number} date - The date to check
 * @returns {boolean} Whether the date is today
 */
export const isToday = (date) => {
  const d = new Date(date);
  const today = new Date();
  return d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
};

/**
 * Get relative date label (Today, Tomorrow, Yesterday, or formatted date)
 * @param {Date|string|number} date - The date to format
 * @returns {string} Relative date label
 */
export const getRelativeDate = (date) => {
  const d = new Date(date);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (isToday(d)) {
    return 'Today';
  } else if (d.getDate() === tomorrow.getDate() &&
             d.getMonth() === tomorrow.getMonth() &&
             d.getFullYear() === tomorrow.getFullYear()) {
    return 'Tomorrow';
  } else if (d.getDate() === yesterday.getDate() &&
             d.getMonth() === yesterday.getMonth() &&
             d.getFullYear() === yesterday.getFullYear()) {
    return 'Yesterday';
  }
  return formatDate(d);
};

/**
 * Format a duration in milliseconds to human readable string
 * @param {number} ms - Duration in milliseconds
 * @returns {string} Formatted duration
 */
export const formatDuration = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);

  return parts.join(' ');
};

/**
 * Get a list of dates between two dates
 * @param {Date|string|number} startDate - Start date
 * @param {Date|string|number} endDate - End date
 * @returns {Date[]} Array of dates
 */
export const getDatesBetween = (startDate, endDate) => {
  const dates = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  let current = start;
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
};

/**
 * Check if a date is within a specified range
 * @param {Date|string|number} date - Date to check
 * @param {Date|string|number} startDate - Start of range
 * @param {Date|string|number} endDate - End of range
 * @returns {boolean} Whether date is within range
 */
export const isDateInRange = (date, startDate, endDate) => {
  const d = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  return d >= start && d <= end;
};

export const getLocalTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};