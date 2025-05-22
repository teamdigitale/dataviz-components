import React from "react";
import type { FieldDataType, KpiItemType } from "../../types";
import Kpi from "./KpiItem";
import "./kpi.css";

export default function KpiGroup({ data }: { data: FieldDataType }) {
  const { id, config } = data;
  const dataSource: KpiItemType[] = data.dataSource;
  const { direction } = config;
  const isVertical = direction === "vertical";
  const kpiGroupClass = isVertical
    ? "kpi-group-vertical"
    : "kpi-group-horizontal";
  return (
    <div id={id} className={`kpi-group ${kpiGroupClass}`}>
      {dataSource.map((item: KpiItemType, index: number) => (
        <div className='kpi-group-item' key={`${index}-${item.title}`}>
          <Kpi data={item} />
        </div>
      ))}
    </div>
  );
}
