import React, { useState, useEffect } from "react";
import "./style.css";
import * as d3 from "d3";
import Arc from "./Arc";
import colorDataGenerator from "../../helpers/colorDataGenerator";
import Legend from "./Legend";

const Tooltip = React.forwardRef((prop, ref) => (
  <div ref={ref} className="tooltip"/>
))

const pseudoData = [ {value: 0 },{ value: 0 }]

const colors = d3.scaleOrdinal(d3.schemeCategory10);

const App = ({
  innerRadius,
  outerRadius,
  cornerRadius,
  width,
  height,
  newData = []
}) => {
  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);

  const [data, setData] = useState({
    currentData: colorDataGenerator(colors, pseudoData),
    oldData: null
  });
  const pieData = createPie(data.currentData);

  useEffect(() => {
    setData({ currentData: colorDataGenerator(colors, newData)});
  }, [newData]);

  const tooltipRef = React.createRef()
 
  return (
    pieData.length > 0 ? (
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
                    height={height}
                    width={width}
                    tooltipRef={tooltipRef}
                  />
                ))}
              </g>
            </svg>
          </div>
          <div className="historyBlock" style={{ height: height }}>
            <svg width={width / 2} height={pieData.length * 25 + 15}>
              <g transform={`translate(20 35)`}>
                {pieData.map((d, i) => (
                  <Legend key={i} index={i} data={d.data} />
                ))}
              </g>
            </svg>  
          </div>
        </div>
        <Tooltip ref={tooltipRef}/>
      </div>
    ) : null
  );
};

export default App;
