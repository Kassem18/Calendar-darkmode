import React from "react";
import type { Task, TeamMember } from "../types";
import { dateHelpers, getInitials } from "../utils";

interface WeekCalendarProps {
  date: Date;
  tasks: Task[];
  teamMembers: TeamMember[];
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onAddTaskForDate: (date: Date) => void;
  darkMode?: boolean;
}

export const WeekCalendar: React.FC<WeekCalendarProps> = ({
  date,
  tasks,
  teamMembers,
  onPrevWeek,
  onNextWeek,
  onEditTask,
  onDeleteTask,
  onAddTaskForDate,
  darkMode = false,
}) => {
  const weekStart = dateHelpers.startOfWeek(date);
  const weekDays = dateHelpers.getWeekDays(weekStart);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getTasksForDateAndHour = (date: Date, hour: number) => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.startTime);
      const taskHour = taskDate.getHours();
      return dateHelpers.isSameDay(taskDate, date) && taskHour === hour;
    });
  };

  const getTeamMembers = (ids: string[]) => {
    if (!ids || !ids.length) return [];
    return teamMembers.filter((m) => ids.includes(m.id));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: darkMode ? "#1a1f3a" : "#fff",
        color: darkMode ? "#f0f0f0" : "#212529",
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
          padding: "16px",
          borderBottom: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
          backgroundColor: darkMode ? "#0f1629" : "#f8f9fa",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: darkMode ? "#f0f0f0" : "#212529",
          }}
        >
          {dateHelpers.formatDate(weekStart, "MMM dd")} -{" "}
          {dateHelpers.formatDate(weekDays[6], "MMM dd, yyyy")}
        </h2>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={onPrevWeek}
            className="btn btn-outline-secondary btn-sm"
          >
            ←
          </button>
          <button
            onClick={onNextWeek}
            className="btn btn-outline-secondary btn-sm"
          >
            →
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Time column */}
        <div
          style={{
            width: "64px",
            borderRight: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
            overflowY: "auto",
            backgroundColor: darkMode ? "#0f1629" : "#f8f9fa",
          }}
        >
          <div style={{ height: "48px" }} /> {/* Header spacing */}
          {hours.map((hour) => (
            <div
              key={hour}
              style={{
                height: "96px",
                borderBottom: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
                padding: "4px",
                fontSize: "12px",
                color: darkMode ? "#9ca3af" : "#6c757d",
                fontWeight: "600",
                textAlign: "right",
                paddingRight: "8px",
              }}
            >
              {String(hour).padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {/* Days columns */}
        <div style={{ flex: 1, overflowX: "auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, minmax(140px, 1fr))",
              backgroundColor: darkMode ? "#0f1629" : "#f8f9fa",
            }}
          >
            {/* Day headers */}
            {weekDays.map((day, index) => (
              <div
                key={index}
                style={{
                  height: "48px",
                  borderBottom: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
                  borderRight: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: darkMode ? "#f0f0f0" : "#212529",
                  }}
                >
                  {dateHelpers.formatDate(day, "EEE")}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: darkMode ? "#9ca3af" : "#6c757d",
                  }}
                >
                  {day.getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Hour slots */}
          {hours.map((hour) => (
            <div
              key={hour}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, minmax(140px, 1fr))",
              }}
            >
              {weekDays.map((day, dayIndex) => (
                <div
                  key={`${hour}-${dayIndex}`}
                  onDoubleClick={() => onAddTaskForDate(day)}
                  style={{
                    minHeight: "96px",
                    borderBottom: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
                    borderRight: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
                    padding: "4px",
                    fontSize: "12px",
                    overflow: "hidden",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = darkMode
                      ? "#242d48"
                      : "#e7f1ff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  {getTasksForDateAndHour(day, hour).map((task) => {
                    const assignedIds =
                      (task as any).assignedMemberIds ||
                      (task.assignedMemberId ? [task.assignedMemberId] : []);
                    const members = getTeamMembers(assignedIds);
                    return (
                      <div
                        key={task.id}
                        style={{
                          padding: "4px",
                          borderRadius: "4px",
                          marginBottom: "4px",
                          color: "white",
                          fontSize: "12px",
                          fontWeight: "600",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          cursor: "pointer",
                          backgroundColor: task.color,
                          opacity: task.completed ? 0.6 : 1,
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "4px",
                          }}
                        >
                          <span style={{ flex: 1 }}>{task.title}</span>
                          <div style={{ display: "flex", flexShrink: 0 }}>
                            {members.map((member, index) =>
                              member.avatar ? (
                                <img
                                  key={member.id}
                                  src={member.avatar}
                                  alt={member.name}
                                  title={member.name}
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    borderRadius: "50%",
                                    marginLeft: index > 0 ? "-6px" : 0,
                                    border: "1px solid #1a1f3a",
                                  }}
                                />
                              ) : (
                                <div
                                  key={member.id}
                                  title={member.name}
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "8px",
                                    fontWeight: "bold",
                                    color: "white",
                                    backgroundColor: member.color,
                                    marginLeft: index > 0 ? "-6px" : 0,
                                    border: "1px solid #1a1f3a",
                                  }}
                                >
                                  {getInitials(member.name)}
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "4px",
                            marginTop: "4px",
                          }}
                        >
                          <button
                            onClick={() => onEditTask(task)}
                            className="btn btn-outline-primary btn-sm"
                            style={{
                              fontSize: "10px",
                              padding: "2px 4px",
                              flex: 1,
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            className="btn btn-outline-danger btn-sm"
                            style={{
                              fontSize: "10px",
                              padding: "2px 4px",
                              flex: 1,
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
