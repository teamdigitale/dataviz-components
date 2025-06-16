import { RenderChart, type FieldDataType } from "dataviz-components";
import { generateFakeKpis } from "./lib/utils";

function App() {
  const data1: FieldDataType = {
    id: "kpi-group1",
    dataSource: generateFakeKpis(10),
    chart: "kpi",
    config: {
      direction: "horizontal",
      h: 0,
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

  const data2: FieldDataType = {
    id: "kpi-group2",
    dataSource: generateFakeKpis(10),
    chart: "kpi",
    config: {
      direction: "vertical",
      h: 0,
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
  // return <KpiGroup data={data} />;
  return (
    <div>
      <RenderChart {...data1} />
      <hr />
      <RenderChart {...data2} />
    </div>
  );
}

export default App;
