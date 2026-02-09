import { useState, useEffect, useCallback } from "react";
import type { Task, TeamMember } from "../types";
import { storage } from "../utils/storage";

export const useCalendar = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    setTasks(storage.getTasks());
    setTeamMembers(storage.getTeamMembers());
    setDarkMode(storage.getDarkMode());
    setLoading(false);
  }, []);

  // Save tasks to localStorage when they change
  useEffect(() => {
    if (!loading) {
      storage.saveTasks(tasks);
    }
  }, [tasks, loading]);

  // Save team members to localStorage when they change
  useEffect(() => {
    if (!loading) {
      storage.saveTeamMembers(teamMembers);
    }
  }, [teamMembers, loading]);

  // Save dark mode to localStorage when it changes
  useEffect(() => {
    if (!loading) {
      storage.saveDarkMode(darkMode);
    }
  }, [darkMode, loading]);

  // Task management
  const addTask = useCallback((task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const getTasksForDate = useCallback(
    (date: Date) => {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      return tasks.filter(
        (task) => task.startTime >= startOfDay && task.startTime <= endOfDay,
      );
    },
    [tasks],
  );

  // Team member management
  const addTeamMember = useCallback((member: Omit<TeamMember, "id">) => {
    const newMember: TeamMember = {
      ...member,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTeamMembers((prev) => [...prev, newMember]);
    return newMember;
  }, []);

  const updateTeamMember = useCallback(
    (id: string, updates: Partial<TeamMember>) => {
      setTeamMembers((prev) =>
        prev.map((member) =>
          member.id === id ? { ...member, ...updates } : member,
        ),
      );
    },
    [],
  );

  const deleteTeamMember = useCallback((id: string) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
    // Remove assignment from tasks
    setTasks((prev) =>
      prev.map((task) =>
        task.assignedMemberId === id
          ? { ...task, assignedMemberId: null }
          : task,
      ),
    );
  }, []);

  const getTeamMember = useCallback(
    (id: string | null) => {
      if (!id) return null;
      return teamMembers.find((member) => member.id === id) || null;
    },
    [teamMembers],
  );

  return {
    // State
    tasks,
    teamMembers,
    selectedDate,
    view,
    darkMode,
    loading,

    // Setters
    setSelectedDate,
    setView,
    setDarkMode,

    // Task methods
    addTask,
    updateTask,
    deleteTask,
    getTasksForDate,

    // Team member methods
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    getTeamMember,
  };
};
