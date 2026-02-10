import React from "react";
import type { Task, TeamMember } from "../types";
import { dateHelpers, getInitials } from "../utils";

interface DayCalendarProps {
  date: Date;
  tasks: Task[];
  teamMembers: TeamMember[];
  onPrevDay: () => void;
  onNextDay: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: () => void;
  darkMode?: boolean;
}

export const DayCalendar: React.FC<DayCalendarProps> = ({
  date,
  tasks,
  teamMembers,
  onPrevDay,
  onNextDay,
  onEditTask,
  onDeleteTask,
  onAddTask,
  darkMode = true, // <- change from false to true
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const dayTasks = tasks.filter((task) =>
    dateHelpers.isSameDay(new Date(task.startTime), date),
  );

  const getTasksForHour = (hour: number) => {
    return dayTasks.filter(
      (task) => new Date(task.startTime).getHours() === hour,
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
        <div>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: darkMode ? "#f0f0f0" : "#212529",
            }}
          >
            {dateHelpers.formatDate(date, "EEEE, MMM dd")}
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: darkMode ? "#9ca3af" : "#666",
              marginTop: "4px",
            }}
          >
            {dayTasks.length} tasks scheduled
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={onPrevDay}
            className="btn btn-outline-secondary btn-sm"
          >
            ←
          </button>
          <button
            onClick={onNextDay}
            className="btn btn-outline-secondary btn-sm"
          >
            →
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {hours.map((hour) => {
          const hourTasks = getTasksForHour(hour);
          return (
            <div
              key={hour}
              style={{
                borderBottom: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
                transition: "background-color 0.2s",
                cursor: "pointer",
              }}
              onDoubleClick={onAddTask}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = darkMode
                  ? "#242d48"
                  : "#e7f1ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <div style={{ display: "flex" }}>
                {/* Time */}
                <div
                  style={{
                    width: "80px",
                    padding: "16px",
                    borderRight: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
                    flexShrink: 0,
                    backgroundColor: darkMode ? "#0f1629" : "#f8f9fa",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: darkMode ? "#f0f0f0" : "#212529",
                    }}
                  >
                    {String(hour).padStart(2, "0")}:00
                  </div>
                </div>

                {/* Events */}
                <div style={{ flex: 1, padding: "16px" }}>
                  {hourTasks.map((task) => {
                    const member = getTeamMember(task.assignedMemberId);

                    return (
                      <div
                        key={task.id}
                        style={{
                          padding: "12px",
                          borderRadius: "8px",
                          marginBottom: "8px",
                          backgroundColor: task.color,
                          opacity: task.completed ? 0.6 : 1,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "8px",
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <p
                              style={{
                                fontWeight: "600",
                                color: "white",
                                fontSize: "14px",
                                textDecoration: task.completed
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {task.title}
                            </p>
                            <p
                              style={{
                                fontSize: "12px",
                                color: "#f0f0f0",
                                marginTop: "4px",
                              }}
                            >
                              {new Date(task.startTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}{" "}
                              -{" "}
                              {new Date(task.endTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            {task.description && (
                              <p
                                style={{
                                  fontSize: "12px",
                                  color: "#f0f0f0",
                                  marginTop: "8px",
                                }}
                              >
                                {task.description}
                              </p>
                            )}
                            {member && (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  marginTop: "8px",
                                }}
                              >
                                {member.avatar ? (
                                  <img
                                    src={member.avatar}
                                    alt={member.name}
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      borderRadius: "50%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: "10px",
                                      fontWeight: "bold",
                                      color: "white",
                                      backgroundColor: member.color,
                                    }}
                                  >
                                    {getInitials(member.name)}
                                  </div>
                                )}
                                <span
                                  style={{ fontSize: "12px", color: "#f0f0f0" }}
                                >
                                  {member.name}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div
                            style={{
                              display: "flex",
                              gap: "4px",
                              flexShrink: 0,
                            }}
                          >
                            <button
                              onClick={() => onEditTask(task)}
                              className="btn btn-outline-light btn-sm"
                              style={{ fontSize: "12px", padding: "4px 8px" }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => onDeleteTask(task.id)}
                              className="btn btn-outline-danger btn-sm"
                              style={{ fontSize: "12px", padding: "4px 8px" }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
