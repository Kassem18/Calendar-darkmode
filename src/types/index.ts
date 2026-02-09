export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string | null; // base64 or blob URL
  color: string; // for fallback initials
}

export interface Task {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  assignedMemberId: string | null;
  color: string;
  completed: boolean;
}

export interface CalendarEvent extends Task {
  // Same as Task, extending for clarity
}

export type CalendarView = "month" | "week" | "day";

export interface CalendarState {
  tasks: Task[];
  teamMembers: TeamMember[];
  selectedDate: Date;
  view: CalendarView;
  darkMode: boolean;
}
