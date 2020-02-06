import React, { useState, useEffect } from "react";
import "./style.css";
import * as d3 from "d3";
import Arc from "./Arc";
import randomDataGenerator from "./randomDataGenerator";
import History from "./History";
const App = ({
  innerRadius,
  outerRadius,
  cornerRadius,
  width,
  height,
  maxSectors
}) => {
  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);

  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const [data, setData] = useState({
    currentData: randomDataGenerator(colors, 1, 0),
    oldData: null
  });
  const format = d3.format(".2f");
  const pieData = createPie(data.currentData);

  useEffect(() => {
    setData({ currentData: randomDataGenerator(colors, maxSectors, 10) });
  }, []);

  return (
    <div className="App">
      <div>
        <svg width={width} height={height}>
          <g transform={`translate(${outerRadius + width / 4} ${outerRadius})`}>
            {pieData.map((d, i) => (
              <Arc
                key={i}
                arcData={d}
                pieData={data}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                cornerRadius={cornerRadius}
                format={format}
                setData={setData}
              />
            ))}
          </g>
          <g>
            {pieData.map((d, i) => {
              return <History />;
            })}
          </g>
        </svg>
      </div>
      <button
        onClick={() =>
          setData({ currentData: randomDataGenerator(colors, maxSectors, 10) })
        }
      >
        new data
      </button>
    </div>
  );
};

export default App;
