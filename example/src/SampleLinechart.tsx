import {
  RenderChart,
  type FieldDataType,
  // DataTable,
  // type MatrixType,
} from "dataviz-components";

function App() {
  const sampleData: FieldDataType = {
    "id": "cm2w17md9000113laexq0h432",
    "name": "PA-Digitale2026 - Accessi Area Riservata",
    "description": "",
    "chart": "line",
    "config": {
      "h": 350,
      "stack": false,
      "colors": ["#0066CC"],
      "legend": true,
      "xLabel": "",
      "yLabel": "",
      "gridTop": "60",
      "nameGap": "40",
      "palette": ["_1_a"],
      "tooltip": true,
      "gridLeft": "10%",
      "labeLine": false,
      "direction": "vertical",
      "gridRight": "10%",
      "gridWidth": "auto",
      "gridBottom": "60",
      "gridHeight": "auto",
      "responsive": true,
      "totalLabel": "Totale",
      "legendPosition": "top",
      "tooltipTrigger": "axis",
      "valueFormatter": "",
      "tooltipFormatter": "number",
    },
    "data": [
      [
        "_",
        "2025-04-09",
        "2025-04-10",
        "2025-04-11",
        "2025-04-12",
        "2025-04-13",
        "2025-04-14",
        "2025-04-15",
        "2025-04-16",
        "2025-04-17",
        "2025-04-18",
        "2025-04-19",
        "2025-04-20",
        "2025-04-21",
        "2025-04-22",
        "2025-04-23",
        "2025-04-24",
        "2025-04-25",
        "2025-04-26",
        "2025-04-27",
        "2025-04-28",
        "2025-04-29",
        "2025-04-30",
        "2025-05-01",
        "2025-05-02",
        "2025-05-03",
        "2025-05-04",
        "2025-05-05",
        "2025-05-06",
        "2025-05-07",
        "2025-05-08",
      ],
      [
        "Visitatori unici",
        2382,
        2487,
        2158,
        269,
        151,
        2614,
        3010,
        2973,
        2607,
        1976,
        247,
        82,
        141,
        2300,
        2631,
        2125,
        175,
        198,
        145,
        2498,
        2394,
        2086,
        181,
        971,
        207,
        141,
        2346,
        3185,
        3055,
        21,
      ],
    ],
    "publish": true,
    "remoteUrl":
      "https://raw.githubusercontent.com/italia/padigitale2026-stats/refs/heads/master/dataviz.json",
    "isRemote": true,
    "dataSource": "",
  };

  return (
    <div>
      <RenderChart
        {...(sampleData as FieldDataType)}
        // getPicture={() => console.log("getPicture")}
        // getInstance={(instance) => console.log("getInstance", instance)}
      />
      {/* <DataTable data={sampleData.data as MatrixType} /> */}
    </div>
  );
}

export default App;
