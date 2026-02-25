/**
 * Protects admin routes: redirects to /admin/login if not authenticated.
 */

import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

const AUTH_CHECK_URL = "/api/admin/me";

export function AdminGuard() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }
    fetch(AUTH_CHECK_URL, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not authenticated");
      })
      .then((data) => {
        if (data?.ok) {
          setChecking(false);
        } else {
          navigate("/admin/login", { replace: true });
        }
      })
      .catch(() => {
        navigate("/admin/login", { replace: true });
      });
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return <Outlet />;
}
