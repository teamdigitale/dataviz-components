import React from "react";
import BasicChart from "./charts/BasicChart";
import PieChart from "./charts/PieChart";
import GeoMapChart from "./charts/GeoMapChart";
import { getPieValues, getBasicValues, getMapValues } from "../lib/utils";
import { useEffect, useState, useRef } from "react";
import ClusterMap from "./maps/ClusterMap";
import KpiGroup from "./kpi/KpiGroup";
import dayjs from "dayjs";
import type { EChartsType } from "echarts";
import type { FieldDataType } from "../types";

type RenderProps = FieldDataType & {
  rowHeight?: number;
  hFactor?: number;
  getPicture?: (dataUrl: string) => void;
};
function RenderChart(props: RenderProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [props.config]);

  const { rowHeight, hFactor = 1 } = props;
  const wrapRef = useRef(null);
  const [echartInstance, setEchartInstance] = useState<EChartsType | null>(
    null
  );
  const [width, setWidth] = useState<number>(500);
  const isMobile = width <= 480 ? true : false;

  useEffect(() => {
    if (echartInstance && props.getPicture) {
      const dataUrl = (echartInstance! satisfies EChartsType).getDataURL();
      props.getPicture(dataUrl);
    }
  }, [echartInstance]);

  function setDimension() {
    const element: any = wrapRef.current;
    if (!element) return;
    let w: number = 500;
    try {
      w = element.clientWidth || element.getBoundingClientRect().width;
    } catch (error) {}
    if (w) setWidth(w);
  }

  useEffect(() => {
    window.addEventListener("resize", setDimension);
    setDimension();
    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [wrapRef]);

  if (loading) return null;

  const baseStyle = {
    width: "100%",
    height: "100%",
    maxHeight: "100%",
  };
  let chartWrapStyle = {
    ...baseStyle,
    minHeight: rowHeight ? rowHeight : props.config.h,
  };

  return (
    <div
      // className='w-full h-full max-height-full'
      style={baseStyle}
    >
      {!rowHeight && (
        <div className='p-4'>
          {props.name && <h4 className='text-xl font-bold'>{props.name}</h4>}
          {props.description && (
            <p dangerouslySetInnerHTML={{ __html: `${props.description}` }} />
          )}
          {props.updatedAt && (
            <small>
              Ultimo aggiornamento:{" "}
              {dayjs(props.updatedAt).format("DD/MM/YYYY HH:mm")}
            </small>
          )}
        </div>
      )}

      <div
        className={`w-full min-height-[${
          rowHeight ? rowHeight + "px" : props.config.h + "px"
        }] h-full max-height-full p-4`}
        style={chartWrapStyle}
      >
        <div ref={wrapRef}>
          {props && (
            <>
              {(props.chart === "bar" || props.chart === "line") && (
                <BasicChart
                  id={props.id}
                  data={getBasicValues(props)}
                  isMobile={isMobile}
                  setEchartInstance={setEchartInstance}
                  rowHeight={rowHeight}
                  hFactor={hFactor}
                />
              )}
              {props.chart === "pie" && (
                <PieChart
                  id={props.id}
                  data={getPieValues(props)}
                  isMobile={isMobile}
                  setEchartInstance={setEchartInstance}
                  rowHeight={rowHeight}
                  hFactor={hFactor}
                />
              )}
              {props.chart === "map" && (
                <GeoMapChart
                  id={props.id}
                  data={getMapValues(props)}
                  isMobile={isMobile}
                  setEchartInstance={setEchartInstance}
                  rowHeight={rowHeight}
                  hFactor={hFactor}
                />
              )}
              {props.chart === "cmap" && (
                <ClusterMap
                  data={props}
                  rowHeight={rowHeight}
                  hFactor={hFactor}
                />
              )}
              {props.chart === "kpi" && (
                <KpiGroup
                  data={props}
                  rowHeight={rowHeight}
                  hFactor={hFactor}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RenderChart;
