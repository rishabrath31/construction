import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProjectForm from "./components/ProjectForm";
import TaskForm from "./components/TaskForm";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useState } from "react";
import LandingPage from "./components/LandingPage";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route
          path="/login"
          element={
            <Login isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />
          }
        />
        <Route
          path="/register"
          element={
            <Signup isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />
          }
        />
        <Route path="/project-form" element={<ProjectForm />} />
        <Route path="/task-form" element={<TaskForm />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
