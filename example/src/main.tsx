import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SampleBarchart from "./SampleBarchart";
import SamplePiechart from "./SamplePiechart";
import SampleLinechart from "./SampleLinechart";
import SampleGeomapchart from "./SampleGeomapchart";

createRoot(document.getElementById("root")!).render(
  <div style={{ padding: 30 }}>
    <SampleBarchart />
    <SamplePiechart />
    <SampleLinechart />
    <SampleGeomapchart />
  </div>
);
