import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { dataToCSV, downloadPng, downloadCSV } from "../lib/downloadUtils";
import DataTable from "./DataTable";
import { FieldDataType, InfosType } from "../types";
import type { EChartsType } from "echarts";
import RenderChart from "./RenderChart";

export type ChartWrapperProps = {
  id: string;
  data: FieldDataType;
  info: InfosType;
  spritePath?: string;
  hFactor?: number;
  rowHeight?: number;
  enableDownloadImage?: boolean;
  enableDownloadData?: boolean;
  shareFunction?: (id: string) => void;
};

export default function ChartWrapper(props: ChartWrapperProps) {
  const {
    id,
    data,
    info,
    hFactor = 1,
    rowHeight,
    enableDownloadData = true,
    enableDownloadImage = true,
    spritePath = "/sprites.svg",
  } = props;

  const {
    labelDownloadData = "Download Data",
    labelDownloadImage = "Download Pic",
    labelShare = "Condividi",
    labelSource = "Sorgente Dati",
    labelUpdated = "Aggiornato al",

    labelTabInfo = "Info",
    labelTabChart = "Grafico",
    labelTabData = "Tabella dati",
    text = "",
    sourceTextInfo = "",
  } = info;

  let tabs = [labelTabChart, labelTabData, labelTabInfo];
  const { config, chart } = data;
  const [echartInstance, setEchartInstance] = useState<EChartsType | null>(
    null
  );

  const chartType = chart;
  const csvData = dataToCSV(data.data);

  const dateOptions: any = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const formatUpdatedAt = data.updatedAt
    ? new Date("" + data.updatedAt).toLocaleDateString("it-IT", dateOptions)
    : "";
  const infoClean = text.replace(new RegExp("&gt;", "g"), ">");
  const chartHeight = rowHeight
    ? rowHeight * hFactor
    : config.h
    ? config.h
    : chartType === "map"
    ? "500px"
    : chartType === "pie"
    ? "350px"
    : "300px";

  function LinkRenderer(props: any) {
    return (
      <a
        href={props.href}
        className='fw-semibold'
        target='_blank'
        aria-label={`${labelSource || "Fonte dati"}`}
        rel='noreferrer'
      >
        {props.children}
      </a>
    );
  }

  const MarkdownRenderer = ({
    children,
  }: {
    children: string | undefined | null;
  }) => {
    return (
      <ReactMarkdown
        components={{ a: LinkRenderer }}
        remarkPlugins={[remarkGfm]}
      >
        {children}
      </ReactMarkdown>
    );
  };

  const wrapRef = useRef(null);

  return (
    <div
      className='px-3 pt-3 px-md-4 pt-md-4 lightgrey-bg-a3'
      style={{
        width: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      <h3 className='mid-caption--lead fw-semibold text-black'>{data.name}</h3>
      <p
        className='mid-caption--large'
        dangerouslySetInnerHTML={{ __html: `${data.description}` }}
      />
      <ul
        className='nav nav-tabs mid-nav-tabs auto lightgrey-bg-a3'
        id='myTab'
        role='tablist'
      >
        {tabs.map((name, i) => (
          <li key={`${id}-tab_${i}`} className='nav-item' id='dataviz-tabs'>
            <a
              aria-controls={`tab${i + 1}-${id}-content`}
              aria-selected='true'
              className={`nav-link ${i === 0 ? "active" : ""} lightgrey-bg-a3`}
              data-bs-toggle='tab'
              href={`#tab${i + 1}-${id}-content`}
              id={`tab${i + 1}-${id}`}
              role='tab'
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
      <div className='tab-content mid-tabs-content' id='myTabContent'>
        <div
          aria-labelledby={`tab1-${id}`}
          className='tab-pane mid-tabs-pane my-4 fade show active'
          style={{ height: chartHeight }}
          id={`tab1-${id}-content`}
          role='tabpanel'
        >
          <div
            key={id}
            className='mid-chart'
            style={{ height: chartHeight }}
            ref={wrapRef}
          >
            <RenderChart
              id={id}
              {...data}
              hFactor={hFactor}
              rowHeight={rowHeight}
              getInstance={setEchartInstance}
            />
          </div>
        </div>
        <div
          aria-labelledby={`tab2-${id}`}
          className='tab-pane mid-tabs-pane my-4 fade'
          id={`tab2-${id}-content`}
          role='tabpanel'
        >
          <DataTable id={id} data={data.data as any[]} />
        </div>
        <div
          aria-labelledby={`tab3-${id}`}
          className='tab-pane mid-tabs-pane my-4 fade'
          id={`tab3-${id}-content`}
          role='tabpanel'
        >
          <div className='mid-tabs-pane-inner mid-caption--large'>
            {info && <MarkdownRenderer>{infoClean}</MarkdownRenderer>}
            {formatUpdatedAt && (
              <div className='mt-5 mid-caption'>
                {labelUpdated || "Dati aggiornati al"}{" "}
                <span className='fw-semibold'>{formatUpdatedAt}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='d-lg-flex justify-content-lg-between mid-caption '>
        {sourceTextInfo && (
          <div className='pt-2 d-flex'>
            <span className='fw-semibold text-uppercase me-2'>
              {labelSource || "Fonte dati"}:
            </span>
            {sourceTextInfo && (
              <MarkdownRenderer>{sourceTextInfo}</MarkdownRenderer>
            )}
          </div>
        )}
        <div className='pb-3 d-flex flex-wrap align-items-start'>
          {enableDownloadData && (
            <span className='ps-lg-2 pe-3 pe-lg-0 pt-2 pb-lg-0 fw-bold text-primary'>
              <a
                className='mid-button-link'
                title={labelDownloadData || "Download CSV"}
                aria-label={labelDownloadData || "Download CSV"}
                onClick={() => downloadCSV(csvData, "" + id)}
              >
                {labelDownloadData || "Download"} CSV
                <svg
                  className='icon icon-sm icon-primary ms-1'
                  focusable='false'
                  aria-label={`${labelDownloadData || "Download"} CSV`}
                  role='img'
                >
                  <use href={`${spritePath}#it-download`}></use>
                </svg>
              </a>
            </span>
          )}
          {enableDownloadImage && (
            <span className='ps-lg-2 pe-3 pe-lg-0 pt-2 pb-lg-0 fw-bold text-primary'>
              <a
                className='mid-button-link'
                title={labelDownloadImage || "Download PNG"}
                aria-label={labelDownloadImage || "Download PNG"}
                onClick={() => downloadPng(echartInstance, "" + id)}
              >
                {labelDownloadImage || "Download Png"}
                <svg
                  className='icon icon-sm icon-primary ms-1'
                  focusable='false'
                  aria-label={`${labelDownloadImage || "Download PNG"}`}
                  role='img'
                >
                  <use href={`${spritePath}#it-download`}></use>
                </svg>
              </a>
            </span>
          )}
          {props.shareFunction && (
            <span className='ps-lg-2 pt-2 fw-bold text-primary'>
              <a
                className='mid-button-link'
                id={"share-link" + id}
                onClick={() =>
                  props.shareFunction && props.shareFunction("share-link" + id)
                }
              >
                {labelShare || "Condividi"}
                <svg
                  className='icon icon-sm icon-primary ms-1'
                  focusable='false'
                  aria-label={labelShare || "Condividi"}
                  role='img'
                >
                  <use href={`${spritePath}#it-share`}></use>
                </svg>
              </a>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
