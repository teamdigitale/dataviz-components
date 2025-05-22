import { useState } from "react";
import { RenderChart, ClusterMap, type PointData } from "dataviz-components";
import { generateSamplePoints } from "./lib/generatePoints";

function App() {
  const [pointsData] = useState<PointData[]>(() => generateSamplePoints(100));
  console.log("RenderChart", RenderChart);
  return (
    <ClusterMap
      pointsData={pointsData}
      height={500}
      clusterDistance={90}
      initialCenter={[12.5, 42.5]} // Center on Italy
      initialZoom={2}
    />
  );
}

export default App;
