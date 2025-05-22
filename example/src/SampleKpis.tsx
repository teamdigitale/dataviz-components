import { useState } from "react";
import { RenderChart, KpiGroup, type KpiItemType } from "dataviz-components";
import { generateFakeKpis } from "./lib/utils";

function App() {
  const [data] = useState<KpiItemType[]>(() => generateFakeKpis(10));
  console.log("RenderChart", RenderChart);
  return (
    <KpiGroup
      data={data}
      config={{ direction: "horizontal" }}
      id='kpi-group1'
    />
  );
}

export default App;
