import React, { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { dataToCSV, downloadPng, downloadCSV } from "../lib/downloadUtils";
import { getBasicValues, getPieValues, getMapValues } from "../lib/utils";
import BasicChart from "./BasicChart";
import DataTable from "./DataTable";
import GeoMapChart from "./GeoMapChart";
import PieChart from "./PieChart";


export default function ChartWrapper(props: any) {
  const { data, info } = props;

  const {
    labelsDownload,
    labelsShare,
    labelsSource,
    labelsUpdated,
    istance,
    sharedUrl,
  } = info;

  const { id, config, chart } = data;
  const [echartInstance, setEchartInstance] = useState(null);

  const chartType = chart;
  const csvData = dataToCSV(data.data);

  const dateOptions: any = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const updatedAt = new Date(data.updatedAt);
  const formatUpdatedAt = updatedAt.toLocaleDateString("it-IT", dateOptions);

  const infoClean = info.replaceAll("&gt;", ">");

  const defaultHeight =
    chartType === "map" ? "500px" : chartType === "pie" ? "350px" : "300px";

  const sharableSocials = ["facebook", "twitter", "linkedin", "whatsapp"];

  function LinkRenderer(props: any) {
    return (
      <a
        href={props.href}
        className='fw-semibold'
        target='_blank'
        aria-label={`${labelsSource || "Fonte dati"}`}
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
  const [width, setWidth] = useState<number | undefined>();
  const isMobile = (width && width <= 480) || undefined;

  function setDimension() {
    const dimension: number = (wrapRef?.current as any).clientWidth || 250;
    setWidth(dimension);
  }

  useEffect(() => {
    window.addEventListener("resize", setDimension);
    setDimension();
    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, []);

  return (
    <div className='px-3 pt-3 px-md-4 pt-md-4'>
      <h3 className='mid-caption--lead fw-semibold text-black'>{data.name}</h3>
      <p className='mid-caption--large'>{data.description}</p>
      <ul
        className='nav nav-tabs mid-nav-tabs lightgrey-bg-a3'
        id='myTab'
        role='tablist'
      >
        {["Grafico", "Tabella dati", "Info"].map((name, i) => (
          <li
            key={`${id}-tab_${i}-${istance}`}
            className='nav-item lightgrey-bg-a3'
            id='dataviz-tabs'
          >
            <a
              aria-controls={`tab${i + 1}-${id}-content-${istance}`}
              aria-selected='true'
              className={`nav-link ${i === 0 ? "active" : ""}`}
              data-bs-toggle='tab'
              href={`#tab${i + 1}-${id}-content-${istance}`}
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
          aria-labelledby={`tab1-${id}-${istance}`}
          className='tab-pane mid-tabs-pane my-4 fade show active'
          style={{ height: config.h ? config.h : defaultHeight }}
          id={`tab1-${id}-content-${istance}`}
          role='tabpanel'
        >
          <div
            key={id}
            className='mid-chart'
            style={{ height: config.h ? config.h : defaultHeight }}
            ref={wrapRef}
          >
            {(chartType === "bar" || chartType === "line") && (
              <BasicChart
                id={id}
                data={getBasicValues(data)}
                setEchartInstance={setEchartInstance}
                isMobile={isMobile}
                isFullH={false}
              />
            )}
            {chartType === "pie" && (
              <PieChart
                id={id}
                data={getPieValues(data)}
                setEchartInstance={setEchartInstance}
                isMobile={isMobile}
                isFullH={false}
              />
            )}
            {chartType === "map" && (
              <GeoMapChart
                id={id}
                data={getMapValues(data)}
                setEchartInstance={setEchartInstance}
                isMobile={isMobile}
                isFullH={false}
              />
            )}
          </div>
        </div>
        <div
          aria-labelledby={`tab2-${id}-${istance}`}
          className='tab-pane mid-tabs-pane my-4 fade'
          id={`tab2-${id}-content-${istance}`}
          role='tabpanel'
        >
          <DataTable id={id} data={data.data} />
        </div>
        <div
          aria-labelledby={`tab3-${id}-${istance}`}
          className='tab-pane mid-tabs-pane my-4 fade'
          id={`tab3-${id}-content-${istance}`}
          role='tabpanel'
        >
          <div className='mid-tabs-pane-inner mid-caption--large'>
            {info && <MarkdownRenderer>{infoClean}</MarkdownRenderer>}
            <div className='mt-5 mid-caption'>
              {labelsUpdated || "Dati aggiornati al"}{" "}
              <span className='fw-semibold'>{formatUpdatedAt}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='d-lg-flex justify-content-lg-between mid-caption '>
        <div className='pt-2 d-flex'>
          <span className='fw-semibold text-uppercase me-2'>
            {labelsSource || "Fonte dati"}:
          </span>
          {data.dataSource && (
            <MarkdownRenderer>{data.dataSource}</MarkdownRenderer>
          )}
        </div>
        <div className='pb-3 d-flex flex-wrap align-items-center'>
          <span className='ps-lg-2 pe-3 pe-lg-0 pt-2 pb-lg-0 fw-bold text-primary'>
            <a
              className='mid-button-link'
              title={labelsDownload || "Download CSV"}
              aria-label={labelsDownload || "Download CSV"}
              onClick={() => downloadCSV(csvData, id)}
            >
              {labelsDownload || "Download"} CSV
              <svg
                className='icon icon-sm icon-primary ms-1'
                focusable='false'
                aria-label={`${labelsDownload || "Download"} CSV`}
                role='img'
              >
                <use href='/images/sprite.svg#it-download'></use>
              </svg>
            </a>
          </span>
          <span className='ps-lg-2 pe-3 pe-lg-0 pt-2 pb-lg-0 fw-bold text-primary'>
            <button
              className='mid-button-link'
              title={labelsDownload || "Download PNG"}
              aria-label={labelsDownload || "Download PNG"}
              onClick={() => downloadPng(echartInstance, id)}
            >
              {labelsDownload || "Download"} PNG
              <svg
                className='icon icon-sm icon-primary ms-1'
                focusable='false'
                aria-label={`${labelsDownload || "Download"} PNG`}
                role='img'
              >
                <use href='/images/sprite.svg#it-download'></use>
              </svg>
            </button>
          </span>
          <span className='ps-lg-2 pt-2 fw-bold text-primary'>
            <div className='dropdown'>
              <button
                aria-expanded='false'
                aria-haspopup='true'
                className='mid-button-link dropdown-toggle'
                data-bs-toggle='dropdown'
                id='dropdownMenuLink'
                type='button'
              >
                {labelsShare || "Condividi"}
                <svg
                  className='icon icon-sm icon-primary ms-1'
                  focusable='false'
                  aria-label={labelsShare || "Condividi"}
                  role='img'
                >
                  <use href='/images/sprite.svg#it-share'></use>
                </svg>
              </button>

              <div aria-labelledby='dropdownMenuLink' className='dropdown-menu'>
                <div className='link-list-wrapper'>
                  <ul className='link-list px-4'>
                    {sharableSocials.map((social) => {
                      return (
                        <li key={social}>
                          <button
                            className='mid-button-link text-capitalize text-primary fw-normal social-share'
                            data-width='800'
                            data-height='600'
                            data-sharer={social}
                            data-title={data.name}
                            data-url={`${sharedUrl}#chart-${id}`}
                          >
                            {social}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
