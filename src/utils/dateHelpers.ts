export const dateHelpers = {
  startOfDay: (date: Date): Date => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  },

  endOfDay: (date: Date): Date => {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
  },

  startOfWeek: (date: Date, startDay: number = 0): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + startDay;
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  },

  endOfWeek: (date: Date): Date => {
    const d = new Date(dateHelpers.startOfWeek(date));
    d.setDate(d.getDate() + 6);
    d.setHours(23, 59, 59, 999);
    return d;
  },

  startOfMonth: (date: Date): Date => {
    const d = new Date(date);
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  },

  endOfMonth: (date: Date): Date => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    d.setHours(23, 59, 59, 999);
    return d;
  },

  formatDate: (date: Date, format: string = "MMM dd, yyyy"): string => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const mins = String(date.getMinutes()).padStart(2, "0");

    return format
      .replace("MMM", month)
      .replace("dd", day)
      .replace("yyyy", String(year))
      .replace("HH", hours)
      .replace("mm", mins);
  },

  isSameDay: (date1: Date, date2: Date): boolean => {
    return date1.toDateString() === date2.toDateString();
  },

  getDaysInMonth: (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  },

  getWeekDays: (startDate: Date): Date[] => {
    const days = [];
    const start = dateHelpers.startOfWeek(startDate);
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  },

  getMonthDays: (date: Date): Date[] => {
    const days = [];
    const start = dateHelpers.startOfMonth(date);
    const daysInMonth = dateHelpers.getDaysInMonth(date);
    for (let i = 0; i < daysInMonth; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  },

  addDays: (date: Date, days: number): Date => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  },

  addMonths: (date: Date, months: number): Date => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  },
};
