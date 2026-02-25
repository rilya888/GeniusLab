import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { MacBookService } from "./pages/MacBookService";
import { IPhoneService } from "./pages/IPhoneService";
import { IPadService } from "./pages/IPadService";
import { WatchService } from "./pages/WatchService";
import { DataRecovery } from "./pages/DataRecovery";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "servizi/macbook", Component: MacBookService },
      { path: "servizi/iphone", Component: IPhoneService },
      { path: "servizi/ipad", Component: IPadService },
      { path: "servizi/watch", Component: WatchService },
      { path: "servizi/recupero-dati", Component: DataRecovery },
    ],
  },
]);
