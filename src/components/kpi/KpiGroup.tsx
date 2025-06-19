import React from "react";
import type { FieldDataType, KpiItemType } from "../../types";
import Kpi from "./KpiItem";
import "./kpi.css";

export default function KpiGroup({
  data,
  hFactor = 1,
  rowHeight,
}: {
  data: FieldDataType;
  hFactor: number;
  rowHeight?: number;
}) {
  const { id, config } = data;
  const dataSource: KpiItemType[] = data.dataSource as KpiItemType[];
  const { direction } = config;
  const isVertical = direction === "vertical";
  const kpiGroupClass = isVertical
    ? "kpi-group-vertical"
    : "kpi-group-horizontal";

  const baseStyle = { maxWidth: "100%", maxHeight: "100%" };
  let divStyle = {};
  if (rowHeight) {
    divStyle = {
      ...baseStyle,
      minHeight: rowHeight * hFactor,
    };
  }
  return (
    <div
      id={id}
      className={`lightgrey-bg-a3 kpi-group ${kpiGroupClass}`}
      style={divStyle}
    >
      {dataSource.map((item: KpiItemType, index: number) => (
        <div className='kpi-group-item' key={`${index}-${item.title}`}>
          <Kpi data={item} />
        </div>
      ))}
    </div>
  );
}
