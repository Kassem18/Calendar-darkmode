import React from "react";
import type { Task, TeamMember } from "../types";
import { dateHelpers } from "../utils";

interface MonthCalendarProps {
  date: Date;
  tasks: Task[];
  teamMembers: TeamMember[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (date: Date) => void;
  onAddTaskForDate: (date: Date) => void;
  selectedDate: Date;
  darkMode?: boolean;
}

export const MonthCalendar: React.FC<MonthCalendarProps> = ({
  date,
  tasks,
  teamMembers,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
  onAddTaskForDate,
  selectedDate,
  darkMode = false,
}) => {
  const monthStart = dateHelpers.startOfMonth(date);
  const monthEnd = dateHelpers.endOfMonth(date);
  const startDate = dateHelpers.startOfWeek(monthStart);

  const days: Date[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= monthEnd) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const monthName = dateHelpers.formatDate(date, "MMM yyyy").split(" ")[0];
  const year = date.getFullYear();

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) =>
      dateHelpers.isSameDay(new Date(task.startTime), new Date(date)),
    );
  };

  const getTeamMember = (id: string | null) => {
    if (!id) return null;
    return teamMembers.find((m) => m.id === id) || null;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: darkMode ? "#1a1f3a" : "#fff",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px",
          borderBottom: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
          backgroundColor: darkMode ? "#0f1629" : "#f8f9fa",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: darkMode ? "#f0f0f0" : "#212529",
          }}
        >
          {monthName} {year}
        </h2>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={onPrevMonth}
            className="btn btn-outline-secondary btn-sm"
          >
            ←
          </button>
          <button
            onClick={onNextMonth}
            className="btn btn-outline-secondary btn-sm"
          >
            →
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          borderBottom: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
          backgroundColor: darkMode ? "#0f1629" : "#f8f9fa",
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            style={{
              padding: "12px",
              textAlign: "center",
              fontWeight: "600",
              color: darkMode ? "#f0f0f0" : "#212529",
              fontSize: "14px",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {weeks.map((week, weekIndex) => (
          <div
            key={weekIndex}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              borderBottom: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
            }}
          >
            {week.map((day, dayIndex) => {
              const isCurrentMonth = day.getMonth() === date.getMonth();
              const isSelected = dateHelpers.isSameDay(day, selectedDate);
              const dayTasks = getTasksForDate(day);

              return (
                <div
                  key={dayIndex}
                  onClick={() => onSelectDate(day)}
                  onDoubleClick={() => onAddTaskForDate(day)}
                  style={{
                    minHeight: "96px",
                    padding: "8px",
                    borderRight: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
                    cursor: "pointer",
                    backgroundColor: isSelected
                      ? darkMode
                        ? "#1e3a8a"
                        : "#e7f1ff"
                      : isCurrentMonth
                        ? darkMode
                          ? "#1a1f3a"
                          : "#fff"
                        : darkMode
                          ? "#0f1629"
                          : "#f8f9fa",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected)
                      e.currentTarget.style.backgroundColor = darkMode
                        ? "#242d48"
                        : "#f8f9fa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isSelected
                      ? darkMode
                        ? "#1e3a8a"
                        : "#e7f1ff"
                      : isCurrentMonth
                        ? darkMode
                          ? "#1a1f3a"
                          : "#fff"
                        : darkMode
                          ? "#0f1629"
                          : "#f8f9fa";
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      marginBottom: "4px",
                      color: isCurrentMonth
                        ? darkMode
                          ? "#f0f0f0"
                          : "#212529"
                        : darkMode
                          ? "#6b7280"
                          : "#6c757d",
                    }}
                  >
                    {day.getDate()}
                  </div>
                  <div style={{ maxHeight: "64px", overflow: "hidden" }}>
                    {dayTasks.slice(0, 2).map((task) => {
                      const member = getTeamMember(task.assignedMemberId);
                      return (
                        <div
                          key={task.id}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            fontSize: "12px",
                            padding: "4px",
                            borderRadius: "4px",
                            backgroundColor: task.color + "33",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "4px",
                            marginBottom: "4px",
                            color: darkMode ? "#f0f0f0" : "#212529",
                          }}
                        >
                          <span
                            style={{
                              flex: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {task.title}
                          </span>
                          {member?.avatar && (
                            <img
                              src={member.avatar}
                              alt={member.name}
                              style={{
                                width: "16px",
                                height: "16px",
                                borderRadius: "50%",
                                flexShrink: 0,
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                    {dayTasks.length > 2 && (
                      <div
                        style={{
                          fontSize: "12px",
                          color: darkMode ? "#9ca3af" : "#6c757d",
                          paddingLeft: "4px",
                        }}
                      >
                        +{dayTasks.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
