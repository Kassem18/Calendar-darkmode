import React, { useState, useEffect } from "react";
import type { Task, TeamMember } from "../types";

interface TaskModalProps {
  isOpen: boolean;
  task?: Task | null;
  onClose: () => void;
  onSave: (task: Omit<Task, "id"> | Task) => void;
  onDelete?: (taskId: string) => void;
  teamMembers: TeamMember[];
  initialDate?: Date;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  task,
  onClose,
  onSave,
  onDelete,
  teamMembers,
  initialDate = new Date(),
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: new Date(),
    endTime: new Date(),
    assignedMemberId: null as string | null,
    color: "#0d6efd",
    completed: false,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        startTime: new Date(task.startTime),
        endTime: new Date(task.endTime),
        assignedMemberId: task.assignedMemberId,
        color: task.color,
        completed: task.completed,
      });
    } else {
      const start = new Date(initialDate);
      start.setHours(9, 0, 0, 0);
      const end = new Date(start);
      end.setHours(10, 0, 0, 0);
      setFormData({
        title: "",
        description: "",
        startTime: start,
        endTime: end,
        assignedMemberId: null,
        color: "#0d6efd",
        completed: false,
      });
    }
  }, [task, isOpen, initialDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please enter a task title");
      return;
    }

    if (task && "id" in task) {
      onSave({ ...formData, id: task.id } as Task);
    } else {
      onSave(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{task ? "Edit Task" : "New Task"}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="form-control"
                  placeholder="Task title"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="form-control"
                  placeholder="Task description"
                  rows={3}
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Start Time</label>
                  <input
                    type="datetime-local"
                    value={formData.startTime.toISOString().slice(0, 16)}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startTime: new Date(e.target.value),
                      })
                    }
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">End Time</label>
                  <input
                    type="datetime-local"
                    value={formData.endTime.toISOString().slice(0, 16)}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endTime: new Date(e.target.value),
                      })
                    }
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Assign To</label>
                <select
                  value={formData.assignedMemberId || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      assignedMemberId: e.target.value || null,
                    })
                  }
                  className="form-select"
                >
                  <option value="">Unassigned</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Color</label>
                <div className="d-flex gap-2">
                  {[
                    "#0d6efd",
                    "#6f42c1",
                    "#20c997",
                    "#fd7e14",
                    "#dc3545",
                    "#0dcaf0",
                    "#198754",
                    "#ffc107",
                  ].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: color,
                        border:
                          formData.color === color
                            ? "3px solid #333"
                            : "1px solid #ccc",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  id="completed"
                  checked={formData.completed}
                  onChange={(e) =>
                    setFormData({ ...formData, completed: e.target.checked })
                  }
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="completed">
                  Mark as completed
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              {task && onDelete && "id" in task && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    const shouldDelete = window.confirm(
                      "Are you sure you want to delete this task? This action cannot be undone.",
                    );
                    if (shouldDelete) {
                      onDelete(task.id);
                      onClose();
                    }
                  }}
                >
                  Delete
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
