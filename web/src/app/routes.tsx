import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Servizi } from "./pages/Servizi";
import { GenericServicePage } from "./pages/GenericServicePage";
import { Contatti } from "./pages/Contatti";
import { ChiSiamo } from "./pages/ChiSiamo";
import { Recensioni } from "./pages/Recensioni";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { CookiePolicy } from "./pages/CookiePolicy";
import { NotFound } from "./pages/NotFound";
import { AdminGuard } from "./admin/AdminGuard";
import { AdminLayout } from "./admin/AdminLayout";
import { AdminLogin } from "./admin/pages/AdminLogin";
import { ServicesList } from "./admin/pages/ServicesList";
import { ServicePageEdit } from "./admin/pages/ServicePageEdit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "",
        Component: Root,
        children: [
          { index: true, Component: Home },
          { path: "servizi", Component: Servizi },
          { path: "servizi/:slug", Component: GenericServicePage },
          { path: "contatti", Component: Contatti },
          { path: "chi-siamo", Component: ChiSiamo },
          { path: "recensioni", Component: Recensioni },
          { path: "privacy-policy", Component: PrivacyPolicy },
          { path: "cookie-policy", Component: CookiePolicy },
          { path: "*", Component: NotFound },
        ],
      },
      {
        path: "admin",
        children: [
          { path: "login", Component: AdminLogin },
          {
            path: "",
            Component: AdminGuard,
            children: [
              {
                path: "",
                Component: AdminLayout,
                children: [
                  { index: true, element: <Navigate to="services" replace /> },
                  { path: "services", Component: ServicesList },
                  { path: "services/:key", Component: ServicePageEdit },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
