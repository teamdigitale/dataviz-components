// import { RenderChart } from "dataviz-components";
import RenderChart from "../../src/components/RenderChart";
import { type FieldDataType } from "dataviz-components";
import { generateFakeKpis } from "./lib/utils";

function App() {
  const data: FieldDataType = {
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

  // return <KpiGroup data={data} />;
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
