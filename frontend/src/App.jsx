import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";

function App() {
  const isAuthenticated = false; 
  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard/home" /> : <Navigate to="/auth/sign-in" />}
      />
      <Route path="/dashboard/home" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" />} />
    </Routes>
  );
}

export default App;
