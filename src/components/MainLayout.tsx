import React, { useState } from "react";
import type { Task, TeamMember } from "../types";
import { dateHelpers } from "../utils";
import { TeamMemberSidebar } from "./TeamMemberSidebar";
import { TaskModal } from "./TaskModal";
import { TeamMemberModal } from "./TeamMemberModal";
import { TaskList } from "./TaskList";
import { MonthCalendar } from "./MonthCalendar";
import { WeekCalendar } from "./WeekCalendar";
import { DayCalendar } from "./DayCalendar";

interface MainLayoutProps {
  tasks: Task[];
  teamMembers: TeamMember[];
  selectedDate: Date;
  view: "month" | "week" | "day";
  darkMode: boolean;
  onAddTask: (task: Omit<Task, "id">) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onSelectDate: (date: Date) => void;
  onChangeView: (view: "month" | "week" | "day") => void;
  onAddTeamMember: (member: Omit<TeamMember, "id">) => void;
  onUpdateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  onDeleteTeamMember: (id: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  tasks,
  teamMembers,
  selectedDate,
  view,
  darkMode,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onSelectDate,
  onChangeView,
  onAddTeamMember,
  onUpdateTeamMember,
  onDeleteTeamMember,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [taskListOpen, setTaskListOpen] = useState(true);

  const handleSaveTask = (taskData: Omit<Task, "id"> | Task) => {
    if ("id" in taskData) {
      onUpdateTask(taskData.id, taskData);
    } else {
      onAddTask(taskData);
    }
    setEditingTask(null);
  };

  const handleSaveMember = (
    memberData: Omit<TeamMember, "id"> | TeamMember,
  ) => {
    if ("id" in memberData) {
      onUpdateTeamMember(memberData.id, memberData);
    } else {
      onAddTeamMember(memberData);
    }
    setEditingMember(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  const handleAddTaskForDate = (date: Date) => {
    onSelectDate(date);
    setEditingTask(null);
    setTaskModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    onDeleteTask(taskId);
  };

  return (
    <div>
      <div className="d-flex" style={{ height: "100vh" }}>
        {/* Sidebar - hidden on mobile, collapsible on tablet */}
        <div className="d-none d-md-block">
          <TeamMemberSidebar
            members={teamMembers}
            tasks={tasks}
            onAddMember={() => {
              setEditingMember(null);
              setMemberModalOpen(true);
            }}
            onEditMember={(member) => {
              setEditingMember(member);
              setMemberModalOpen(true);
            }}
            onDeleteMember={onDeleteTeamMember}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            darkMode={darkMode}
          />
        </div>

        {/* Main Content */}
        <div
          className="d-flex flex-column flex-grow-1"
          style={{ overflow: "hidden" }}
        >
          {/* Top Bar */}
          <nav
            className="navbar navbar-expand-lg"
            style={{
              backgroundColor: darkMode ? "#0f1629" : "#fff",
              borderBottom: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
              color: darkMode ? "#f0f0f0" : "#212529",
            }}
          >
            <div className="container-fluid">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="btn btn-sm d-md-none"
              >
                <span style={{ fontSize: "24px" }}>
                  {mobileMenuOpen ? "✕" : "☰"}
                </span>
              </button>
              <h1 className="navbar-brand d-none d-sm-block mb-0">Calendar</h1>

              <div className="ms-auto d-flex gap-2">
                {/* View selector */}
                <div className="btn-group d-none d-sm-flex" role="group">
                  {(["month", "week", "day"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => onChangeView(v)}
                      className={`btn btn-sm ${
                        view === v ? "btn-primary" : "btn-outline-secondary"
                      }`}
                    >
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="d-md-none bg-light border-bottom p-3">
              <TeamMemberSidebar
                members={teamMembers}
                tasks={tasks}
                onAddMember={() => {
                  setEditingMember(null);
                  setMemberModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                onEditMember={(member) => {
                  setEditingMember(member);
                  setMemberModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                onDeleteMember={onDeleteTeamMember}
              />
              <div className="btn-group d-flex gap-2 mt-3" role="group">
                {(["month", "week", "day"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => {
                      onChangeView(v);
                      setMobileMenuOpen(false);
                    }}
                    className={`btn btn-sm flex-grow-1 ${
                      view === v ? "btn-primary" : "btn-outline-secondary"
                    }`}
                  >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Calendar View */}
          <div
            className="d-flex flex-grow-1"
            style={{ overflow: "hidden", gap: "12px", padding: "12px" }}
          >
            <div
              className="flex-grow-1"
              style={{
                overflow: "auto",
                backgroundColor: darkMode ? "#0a0e27" : "#fff",
                borderRadius: "8px",
              }}
            >
              {view === "month" && (
                <MonthCalendar
                  date={selectedDate}
                  tasks={tasks}
                  teamMembers={teamMembers}
                  onPrevMonth={() =>
                    onSelectDate(dateHelpers.addMonths(selectedDate, -1))
                  }
                  onNextMonth={() =>
                    onSelectDate(dateHelpers.addMonths(selectedDate, 1))
                  }
                  onSelectDate={onSelectDate}
                  onAddTaskForDate={handleAddTaskForDate}
                  selectedDate={selectedDate}
                  darkMode={darkMode}
                />
              )}

              {view === "week" && (
                <WeekCalendar
                  date={selectedDate}
                  tasks={tasks}
                  teamMembers={teamMembers}
                  onPrevWeek={() =>
                    onSelectDate(dateHelpers.addDays(selectedDate, -7))
                  }
                  onNextWeek={() =>
                    onSelectDate(dateHelpers.addDays(selectedDate, 7))
                  }
                  onEditTask={handleEditTask}
                  onDeleteTask={onDeleteTask}
                  onAddTaskForDate={handleAddTaskForDate}
                  darkMode={darkMode}
                />
              )}

              {view === "day" && (
                <DayCalendar
                  date={selectedDate}
                  tasks={tasks}
                  teamMembers={teamMembers}
                  onPrevDay={() =>
                    onSelectDate(dateHelpers.addDays(selectedDate, -1))
                  }
                  onNextDay={() =>
                    onSelectDate(dateHelpers.addDays(selectedDate, 1))
                  }
                  onEditTask={handleEditTask}
                  onDeleteTask={onDeleteTask}
                  onAddTask={() => {
                    setEditingTask(null);
                    setTaskModalOpen(true);
                  }}
                  darkMode={darkMode}
                />
              )}
            </div>

            {/* Task List Panel */}
            <div
              className="d-none d-lg-flex"
              style={{
                width: "320px",
                backgroundColor: darkMode ? "#1a1f3a" : "#f8f9fa",
                borderRadius: "8px",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  borderBottom: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
                }}
              >
                <h5
                  style={{ margin: 0, color: darkMode ? "#f0f0f0" : "#212529" }}
                >
                  Tasks
                </h5>
                <button
                  onClick={() => setTaskListOpen(!taskListOpen)}
                  className="btn btn-sm"
                  style={{ padding: "2px 6px" }}
                >
                  {taskListOpen ? "−" : "+"}
                </button>
              </div>

              {taskListOpen && (
                <TaskList
                  tasks={tasks}
                  teamMembers={teamMembers}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  onAddTask={() => {
                    setEditingTask(null);
                    setTaskModalOpen(true);
                  }}
                  darkMode={darkMode}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={taskModalOpen}
        task={editingTask}
        onClose={() => {
          setTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        teamMembers={teamMembers}
        initialDate={selectedDate}
      />

      <TeamMemberModal
        isOpen={memberModalOpen}
        member={editingMember}
        onClose={() => {
          setMemberModalOpen(false);
          setEditingMember(null);
        }}
        onSave={handleSaveMember}
      />
    </div>
  );
};
