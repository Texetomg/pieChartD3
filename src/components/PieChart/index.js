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
    currentData: randomDataGenerator(colors, 1),
    oldData: null
  });
  const pieData = createPie(data.currentData);

  useEffect(() => {
    setData({ currentData: randomDataGenerator(colors, maxSectors)});
  }, []);

  return (
    <div className="App">
      <div className="pieWrapper">
        <div className="pieBlock">
          <svg width={width / 2} height={height}>
            <g transform={`translate(${outerRadius} ${outerRadius})`}>
              {pieData.map((d, i) => (
                <Arc
                  key={i}
                  arcData={d}
                  pieData={data}
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                  cornerRadius={cornerRadius}
                  setData={setData}
                />
              ))}
            </g>
          </svg>
        </div>
        <div className="historyBlock" style={{ height: height }}>
          <div className="overflowGradient"></div>
          <div className="overflowGradientB"></div> 
            <svg width={width / 2} height={pieData.length * 24}>
              <g transform={`translate(20 35)`}>
                {pieData.map((d, i) => (
                  <History key={i} index={i} data={d.data} />
                ))}
              </g>
            </svg>
          
        </div>
      </div>
      <button
        onClick={() =>
          setData({ currentData: randomDataGenerator(colors, maxSectors) })
        }
      >
        new data
      </button>
    </div>
  );
};

export default App;
