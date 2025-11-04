import React from "react";
import { useHorizontalScrollArrows, useFadePresence } from "./utils";
import ScrollButton from "./ScrollButton";
import "./dataTable.css";

type DataTableProps = {
  data: any[];
  id?: string;
};

export default function Table({ data, id }: DataTableProps) {
  const { wrapperRef, showLeftArrow, showRightArrow, scrollBy } =
    useHorizontalScrollArrows();
  const leftFade = useFadePresence(showLeftArrow, 180);
  const rightFade = useFadePresence(showRightArrow, 180);

  return (
    <div className="mid-table-outer">
      <div className="mid-table-wrapper" ref={wrapperRef}>
        <table className="mid-table">
          <thead>
            <tr>
              {data[0].map((c: any, i: number) => {
                if (i === 0) {
                  return (
                    <th scope="col" key={`${id}-th_` + i}>
                      {c}
                    </th>
                  );
                } else {
                  return (
                    <th scope="col" key={`${id}-th_` + i}>
                      {c}
                    </th>
                  );
                }
              })}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((r: any, ii: number) => (
              <tr key={`${id}-tr_` + ii}>
                {r.map((v: any, iii: number) => {
                  if (iii === 0) {
                    return (
                      <th scope="row" key={`${id}-r-th_` + iii}>
                        {v}
                      </th>
                    );
                  } else {
                    return <td key={`${id}-r-td_` + iii}>{v}</td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {leftFade.present && (
        <ScrollButton
          side="left"
          ariaLabel="Scorri a sinistra"
          onClick={() => scrollBy("left")}
          visible={leftFade.visible}
        />
      )}
      {rightFade.present && (
        <ScrollButton
          side="right"
          ariaLabel="Scorri a destra"
          onClick={() => scrollBy("right")}
          visible={rightFade.visible}
        />
      )}
    </div>
  );
}
