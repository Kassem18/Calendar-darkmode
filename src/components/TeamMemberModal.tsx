import React, { useState } from "react";
import type { TeamMember } from "../types";
import { getInitials } from "../utils";

interface TeamMemberModalProps {
  isOpen: boolean;
  member?: TeamMember | null;
  onClose: () => void;
  onSave: (member: Omit<TeamMember, "id"> | TeamMember) => void;
}

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  isOpen,
  member,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    avatar: null as string | null,
    color: "#0d6efd",
  });

  React.useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        role: member.role,
        avatar: member.avatar,
        color: member.color,
      });
    } else {
      setFormData({
        name: "",
        role: "",
        avatar: null,
        color: "#0d6efd",
      });
    }
  }, [member, isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter a name");
      return;
    }

    if (member && "id" in member) {
      onSave({ ...formData, id: member.id } as TeamMember);
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
            <h5 className="modal-title">
              {member ? "Edit Member" : "New Team Member"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="d-flex justify-content-center mb-4">
                <div style={{ position: "relative" }}>
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="Avatar"
                      style={{
                        width: "96px",
                        height: "96px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "96px",
                        height: "96px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "24px",
                        fontWeight: "bold",
                        backgroundColor: formData.color,
                      }}
                    >
                      {getInitials(formData.name)}
                    </div>
                  )}
                  <label
                    htmlFor="avatar-upload"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      backgroundColor: "#0d6efd",
                      borderRadius: "50%",
                      padding: "8px",
                      cursor: "pointer",
                    }}
                  >
                    📷
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="form-control"
                  placeholder="Full name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="form-control"
                  placeholder="e.g. Developer, Designer"
                />
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
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
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
