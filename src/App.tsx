import { MainLayout } from "./components";
import { useCalendar } from "./hooks/useCalendar";
import { useEffect } from "react";

function App() {
  const {
    tasks,
    teamMembers,
    selectedDate,
    view,
    loading,
    setSelectedDate,
    setView,
    addTask,
    updateTask,
    deleteTask,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
  } = useCalendar();

  // Update HTML element data-bs-theme attribute for Bootstrap dark mode
  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("data-bs-theme", "dark");
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#1a1a1a",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              animation: "spin 1s linear infinite",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              borderTop: "4px solid #0d6efd",
              margin: "0 auto 16px",
            }}
          ></div>
          <p style={{ color: "#ccc" }}>Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <MainLayout
      tasks={tasks}
      teamMembers={teamMembers}
      selectedDate={selectedDate}
      view={view}
      darkMode={true}
      onAddTask={addTask}
      onUpdateTask={updateTask}
      onDeleteTask={deleteTask}
      onSelectDate={setSelectedDate}
      onChangeView={setView}
      onAddTeamMember={addTeamMember}
      onUpdateTeamMember={updateTeamMember}
      onDeleteTeamMember={deleteTeamMember}
    />
  );
}

export default App;
