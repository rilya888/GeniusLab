import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "./app/components/ui/sonner";
import { ContentProvider } from "./app/context/ContentContext";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ContentProvider>
      <App />
      <Toaster />
    </ContentProvider>
  </HelmetProvider>
);
  