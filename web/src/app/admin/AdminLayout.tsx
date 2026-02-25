/**
 * Admin layout: sidebar, header, logout, language selector.
 */

import { Link, Outlet, useNavigate } from "react-router";
import { getPath } from "@/app/routes.config";
import { useAdminLang } from "./AdminLangContext";

export function AdminLayout() {
  const navigate = useNavigate();
  const adminLang = useAdminLang();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <Link to="/admin/services" className="text-xl font-light">
            Genius Lab Admin
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {adminLang && (
            <div className="px-4 py-2 flex gap-2">
              <button
                onClick={() => adminLang.setAdminLang("it")}
                className={`px-3 py-1 rounded text-sm ${
                  adminLang.adminLang === "it" ? "bg-gray-700" : "hover:bg-gray-800"
                }`}
              >
                IT
              </button>
              <button
                onClick={() => adminLang.setAdminLang("en")}
                className={`px-3 py-1 rounded text-sm ${
                  adminLang.adminLang === "en" ? "bg-gray-700" : "hover:bg-gray-800"
                }`}
              >
                EN
              </button>
            </div>
          )}
          <Link
            to="/admin/services"
            className="block px-4 py-2 rounded hover:bg-gray-800 text-gray-200"
          >
            Servizi
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700 space-y-1">
          <Link
            to={getPath(adminLang?.adminLang ?? "it", "home")}
            className="block w-full px-4 py-2 text-left rounded hover:bg-gray-800 text-gray-300"
          >
            Back to site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left rounded hover:bg-gray-800 text-gray-300"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
