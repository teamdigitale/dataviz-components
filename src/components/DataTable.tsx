import React from "react";
type DataTableProps = {
  data: any[];
  id?: string;
};
export default function Table({ data, id }: DataTableProps) {
  return (
    <div className='mid-table-wrapper'>
      <table className='table table-hover mid-table'>
        <thead>
          <tr>
            {data[0].map((c: any, i: number) => {
              if (i === 0) {
                return (
                  <th scope='col' key={`${id}-th_` + i}>
                    {c}
                  </th>
                );
              } else {
                return (
                  <th scope='col' key={`${id}-th_` + i}>
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
                    <th scope='row' key={`${id}-r-th_` + iii}>
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
  );
}
