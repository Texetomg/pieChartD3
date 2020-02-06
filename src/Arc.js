import React from "react";
import "./style.css";
import * as d3 from "d3";

const arcTween = (oldData, newData, arc) => {
  const copy = { ...oldData };

  return () => {
    const interpolateStartAngle = d3.interpolate(
      oldData.startAngle,
      newData.startAngle
    );
    const interpolateEndAngle = d3.interpolate(
      oldData.endAngle,
      newData.endAngle
    );

    return t => {
      copy.startAngle = interpolateStartAngle(t);
      copy.endAngle = interpolateEndAngle(t);
      return arc(copy);
    };
  };
};

class Arc extends React.Component {
  createArc = d3
    .arc()
    .innerRadius(this.props.innerRadius)
    .outerRadius(this.props.outerRadius)
    .cornerRadius(this.props.cornerRadius);

  componentDidUpdate(oldProps) {
    const { arcData } = this.props;

    if (oldProps.arcData.value !== arcData.value) {
      d3.select(this.refs.elem)
        .transition()
        .duration(1000)
        .attrTween("d", arcTween(oldProps.arcData, arcData, this.createArc));
    }
  }

  handleClick = () => {
    const { arcData, pieData, setData } = this.props;

    if (arcData.data.children) {
      setData({
        currentData: arcData.data.children,
        oldData: pieData.currentData
      });
    } else {
      setData({
        currentData: pieData.oldData
      });
    }
  };

  render() {
    const { format, arcData } = this.props;
    return (
      <g>
        <path
          d={this.createArc(arcData)}
          fill={arcData.data.color}
          ref="elem"
          onClick={this.handleClick}
        />
        <text
          transform={`translate(${this.createArc.centroid(arcData)})`}
          textAnchor="middle"
          fill="white"
          fontSize="10"
        >
          {format(arcData.value)}
        </text>
      </g>
    );
  }
}

export default Arc;
