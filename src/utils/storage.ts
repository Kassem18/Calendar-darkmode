import type { Task, TeamMember } from "../types";

const TASKS_KEY = "calendar_tasks";
const MEMBERS_KEY = "calendar_members";
const DARK_MODE_KEY = "calendar_dark_mode";

export const storage = {
  // Tasks
  getTasks: (): Task[] => {
    try {
      const data = localStorage.getItem(TASKS_KEY);
      return data
        ? JSON.parse(data).map((t: any) => ({
            ...t,
            startTime: new Date(t.startTime),
            endTime: new Date(t.endTime),
          }))
        : [];
    } catch {
      return [];
    }
  },

  saveTasks: (tasks: Task[]): void => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },

  // Team Members
  getTeamMembers: (): TeamMember[] => {
    try {
      const data = localStorage.getItem(MEMBERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveTeamMembers: (members: TeamMember[]): void => {
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
  },

  // Dark Mode
  getDarkMode: (): boolean => {
    try {
      const data = localStorage.getItem(DARK_MODE_KEY);
      return data ? JSON.parse(data) : false;
    } catch {
      return false;
    }
  },

  saveDarkMode: (isDark: boolean): void => {
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDark));
  },

  // Clear all
  clearAll: (): void => {
    localStorage.removeItem(TASKS_KEY);
    localStorage.removeItem(MEMBERS_KEY);
    localStorage.removeItem(DARK_MODE_KEY);
  },
};
