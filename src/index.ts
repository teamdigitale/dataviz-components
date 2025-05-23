import ChartWrapper from "./components/ChartWrapper";
import RenderChart from "./components/RenderChart";
import DataTable from "./components/DataTable";
import ClusterMap from "./components/maps/ClusterMap";
import KpiGroup from "./components/kpi/KpiGroup";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

export * from "./types";
export { ChartWrapper, RenderChart, DataTable, ClusterMap, KpiGroup };



import "dataviz-components/dist/style.css";

createRoot(document.getElementById("root")!).render(
  <App>
);
