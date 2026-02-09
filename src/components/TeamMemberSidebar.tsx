import React, { useState } from "react";
import type { TeamMember, Task } from "../types";
import { getInitials, dateHelpers } from "../utils";

interface TeamMemberSidebarProps {
  members: TeamMember[];
  tasks: Task[];
  onAddMember: () => void;
  onEditMember: (member: TeamMember) => void;
  onDeleteMember: (id: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  darkMode?: boolean;
}

export const TeamMemberSidebar: React.FC<TeamMemberSidebarProps> = ({
  members,
  tasks,
  onAddMember,
  onEditMember,
  onDeleteMember,
  isCollapsed = false,
  onToggleCollapse,
  darkMode = false,
}) => {
  const getMemberTaskCount = (memberId: string) => {
    return tasks.filter(
      (task) => task.assignedMemberId === memberId && !task.completed,
    ).length;
  };

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#1a1f3a" : "#fff",
        borderRight: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        width: isCollapsed ? "80px" : "256px",
      }}
    >
      <div
        style={{
          padding: "16px",
          borderBottom: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
          backgroundColor: darkMode ? "#0f1629" : "#f8f9fa",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h2
            style={{
              fontWeight: "600",
              color: darkMode ? "#f0f0f0" : "#212529",
              display: isCollapsed ? "none" : "block",
            }}
          >
            Team Members
          </h2>
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="btn btn-sm btn-outline-secondary"
              style={{ padding: "4px 8px" }}
            >
              ☰
            </button>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={onAddMember}
            className="w-100 btn btn-sm btn-primary"
          >
            + Add Member
          </button>
        )}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        {members.length === 0 ? (
          <p
            style={{
              color: darkMode ? "#9ca3af" : "#6c757d",
              fontSize: "14px",
              display: isCollapsed ? "none" : "block",
            }}
          >
            No team members yet
          </p>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="card mb-2"
              style={{
                padding: "12px",
                backgroundColor: darkMode ? "#0f1629" : "#f8f9fa",
                border: `1px solid ${darkMode ? "#2d3748" : "#dee2e6"}`,
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexDirection: isCollapsed ? "column" : "row",
                  alignItems: isCollapsed ? "center" : "flex-start",
                }}
              >
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                      flexShrink: 0,
                      backgroundColor: member.color,
                    }}
                  >
                    {getInitials(member.name)}
                  </div>
                )}
                {!isCollapsed && (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontWeight: "500",
                        color: darkMode ? "#f0f0f0" : "#212529",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {member.name}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: darkMode ? "#9ca3af" : "#6c757d",
                      }}
                    >
                      {member.role}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: darkMode ? "#60a5fa" : "#0d6efd",
                        fontWeight: "600",
                      }}
                    >
                      {getMemberTaskCount(member.id)} tasks
                    </p>
                  </div>
                )}
              </div>

              {!isCollapsed && (
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <button
                    onClick={() => onEditMember(member)}
                    className="btn btn-sm btn-outline-primary flex-grow-1"
                    style={{ fontSize: "12px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteMember(member.id)}
                    className="btn btn-sm btn-outline-danger"
                    style={{ fontSize: "12px" }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
