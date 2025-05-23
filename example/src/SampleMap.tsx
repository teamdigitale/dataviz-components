// import { RenderChart } from "dataviz-components";
import RenderChart from "../../src/components/RenderChart";
import { useState } from "react";
import { type PointData, type FieldDataType } from "dataviz-components";
import { generateSamplePoints } from "./lib/generatePoints";

function App() {
  const [pointsData] = useState<PointData[]>(() => generateSamplePoints(100));
  console.log("RenderChart", RenderChart);

  const data: FieldDataType = {
    id: "clustermap1",
    dataSource: pointsData,
    chart: "cmap",
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

  //<ClusterMap data={data} />;
  return (
    <div>
      <RenderChart
        {...data}
        fullH={false}
        getPicture={() => console.log("getPicture")}
      />
    </div>
  );
}

export default App;
