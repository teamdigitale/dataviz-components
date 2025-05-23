import { useState } from "react";
import {
  RenderChart,
  ClusterMap,
  type PointData,
  type FieldDataType,
} from "dataviz-components";
import { generateSamplePoints } from "./lib/generatePoints";

function App() {
  const [pointsData] = useState<PointData[]>(() => generateSamplePoints(100));
  console.log("RenderChart", RenderChart);

  const data: FieldDataType = {
    id: "clustermap1",
    dataSource: pointsData,
    chart: "map",
    config: {
      direction: "horizontal",
      h: 500,
      labeLine: false,
      legend: false,
      legendPosition: "",
      palette: [],
      tooltip: false,
      tooltipFormatter: "",
      valueFormatter: "",
      totalLabel: "",
      tooltipTrigger: "",
      colors: [],
    },
    data: null,
  };

  return <ClusterMap data={data} />;
}

export default App;
