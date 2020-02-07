import React from "react";
import * as d3 from "d3";

const History = ({ data, index }) => {
  return (
    <g>
      <circle
        fill={data.color} r={6}
        transform={`translate(0 ${index * 20})`}
      />
      <text
        transform={`translate(10 ${index * (20) + 4})`}
        fontSize="13"
      >
        {`${d3.format(".2f")(data.value)} some description`}
      </text>
    </g>
  );
};

export default History;
