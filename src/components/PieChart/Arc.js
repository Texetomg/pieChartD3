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

  radius = Math.min(this.props.width, this.props.height)

  createArcLabel = d3
    .arc()
    .innerRadius(this.radius / 2)
    .outerRadius(this.radius / 4);

  componentDidUpdate(oldProps) {
    const { arcData } = this.props;

    if (oldProps.arcData.value !== arcData.value) {
      d3.select(this.refs.elem)
        .transition()
        .duration(1000)
        .attrTween("d", arcTween(oldProps.arcData, arcData, this.createArc));
    }
  }

  onClick = () => {
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

  onOver = () => {
    d3.select(this.refs.elem)
      .append("text")
  }

  render() {
    const { arcData } = this.props;
    const angle = arcData.endAngle - arcData.startAngle;
    console.log(this.createArc.centroid(arcData))
    return (
      <g>
        <path
          d={this.createArc(arcData)}
          fill={arcData.data.color}
          ref="elem"
          onClick={this.onClick}
          onMouseOver={this.onOver}
        />
        {angle > 0.4 ? (
          <text
            transform={`translate(${this.createArcLabel.centroid(arcData)})`}
            textAnchor="middle"
            fill="white"
            fontSize="12"
          >
            {`${d3.format(".0f")(arcData.value / 1000) }k`}
          </text>
        ) : (null)}
        
      </g>
    );
  }
}

export default Arc;
