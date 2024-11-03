// src/utils/accessControl.ts
import React, { useEffect, useState } from "react";
import { getUserSession } from "../services/indexedDBService";
import { Navigate } from "react-router-dom";

interface AccessControlProps {
  requiredRole: "EMPLOYER" | "CANDIDATE";
  children: JSX.Element;
}

export const AccessControl: React.FC<AccessControlProps> = ({
  requiredRole,
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null); // null for loading state

  useEffect(() => {
    const checkAccess = async () => {
      const token = localStorage.getItem("authToken");

      // Jika token tidak ada, redirect ke login
      if (!token) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      // Ambil session dari IndexedDB
      const userSession = await getUserSession(token);

      // Jika session tidak ada, redirect ke login
      if (!userSession) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      // Periksa apakah role sesuai
      if (userSession.role === requiredRole) {
        setHasAccess(true);
      } else {
        setHasAccess(false); // Redirect if role does not match
      }

      setLoading(false);
    };

    checkAccess();
  }, [requiredRole]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  // Redirect jika tidak memiliki akses
  if (!hasAccess) {
    return <Navigate to="/login" replace />;
  }

  // Jika semua validasi berhasil, tampilkan children
  return children;
};
