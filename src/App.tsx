import { MainLayout } from "./components";
import { useCalendar } from "./hooks/useCalendar";
import { useEffect } from "react";

function App() {
  const {
    tasks,
    teamMembers,
    selectedDate,
    view,
    darkMode,
    loading,
    setSelectedDate,
    setView,
    setDarkMode,
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
    htmlElement.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: darkMode ? "#1a1a1a" : "#f5f5f5",
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
          <p style={{ color: darkMode ? "#ccc" : "#666" }}>
            Loading calendar...
          </p>
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
      darkMode={darkMode}
      onAddTask={addTask}
      onUpdateTask={updateTask}
      onDeleteTask={deleteTask}
      onSelectDate={setSelectedDate}
      onChangeView={setView}
      onToggleDarkMode={() => setDarkMode(!darkMode)}
      onAddTeamMember={addTeamMember}
      onUpdateTeamMember={updateTeamMember}
      onDeleteTeamMember={deleteTeamMember}
    />
  );
}

export default App;
