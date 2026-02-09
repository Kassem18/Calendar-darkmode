import React from "react";
import type { Task, TeamMember } from "../types";
import { dateHelpers, getInitials } from "../utils";

interface TaskListProps {
  tasks: Task[];
  teamMembers: TeamMember[];
  onEditTask: (task: Task) => void;
  onAddTask?: () => void;
  darkMode?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  teamMembers,
  onEditTask,
  onAddTask,
  darkMode = false,
}) => {
  const getTeamMember = (id: string | null) => {
    if (!id) return null;
    return teamMembers.find((m) => m.id === id) || null;
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.startTime).getTime();
    const dateB = new Date(b.startTime).getTime();
    return dateA - dateB;
  });

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: darkMode ? "#1a1f3a" : "#f8f9fa",
        borderRadius: "8px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <h3
        style={{
          color: darkMode ? "#f0f0f0" : "#212529",
          marginBottom: "16px",
        }}
      >
        All Tasks ({sortedTasks.length})
      </h3>

      {onAddTask && (
        <button
          onClick={onAddTask}
          className="btn btn-primary btn-sm w-100"
          style={{ marginBottom: "16px" }}
        >
          + Add Task
        </button>
      )}

      <div style={{ flex: 1, overflowY: "auto" }}>
        {sortedTasks.length === 0 ? (
          <p style={{ color: darkMode ? "#9ca3af" : "#6c757d" }}>
            No tasks yet
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {sortedTasks.map((task) => {
              const member = getTeamMember(task.assignedMemberId);
              return (
                <div
                  key={task.id}
                  onClick={() => onEditTask(task)}
                  style={{
                    padding: "12px",
                    borderRadius: "6px",
                    backgroundColor: darkMode ? "#0f1629" : "#fff",
                    border: `2px solid ${task.color}`,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontWeight: "600",
                          color: darkMode ? "#f0f0f0" : "#212529",
                          marginBottom: "4px",
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {task.title}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: darkMode ? "#9ca3af" : "#6c757d",
                          marginBottom: "6px",
                        }}
                      >
                        {dateHelpers.formatDate(
                          new Date(task.startTime),
                          "MMM dd, HH:mm",
                        )}{" "}
                        -{" "}
                        {new Date(task.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                      {task.description && (
                        <p
                          style={{
                            fontSize: "12px",
                            color: darkMode ? "#9ca3af" : "#6c757d",
                            marginBottom: "6px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
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
                            gap: "6px",
                            fontSize: "12px",
                            color: darkMode ? "#f0f0f0" : "#212529",
                          }}
                        >
                          {member.avatar ? (
                            <img
                              src={member.avatar}
                              alt={member.name}
                              style={{
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "9px",
                                fontWeight: "bold",
                                color: "white",
                                backgroundColor: member.color,
                              }}
                            >
                              {getInitials(member.name)}
                            </div>
                          )}
                          <span>{member.name}</span>
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        flexShrink: 0,
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditTask(task);
                        }}
                        className="btn btn-sm btn-outline-primary"
                        style={{ fontSize: "11px", padding: "2px 6px" }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
