import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";

function App() {
  //const isAuthenticated = false; 
  return (
    <Routes>
      {/* Root path ("/") should redirect to the sign-in page */}
      <Route path="/" element={<Navigate to="/auth/sign-in" />} />

      {/* Auth layout handles sign-in and sign-up routes */}
      <Route path="/auth/*" element={<Auth />} />

      {/* Dashboard layout with wildcard for nested routes */}
      <Route path="/dashboard/*" element={<Dashboard />} />

      {/* Fallback route redirects to sign-in if no route matches */}
      <Route path="*" element={<Navigate to="/auth/sign-in" />} />
    </Routes>
  );
}

export default App;
