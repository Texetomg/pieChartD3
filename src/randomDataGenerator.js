import * as d3 from "d3";

const randomDataGenerator = (colors, maxSectors, firstRender = 1) => {
  const data = [];
  const numSectors = Math.ceil(Math.random() * maxSectors);
  for (let i = -1; i++ < numSectors; ) {
    const children = [];
    const numChildSectors = Math.ceil(Math.random() * maxSectors);
    const color = colors(i);

    for (let j = -1; j++ < numChildSectors; ) {
      children.push({
        value: Math.random(),
        color: d3.rgb(color).darker(1 / (j + 1))
      });
    }
    data.push({
      value: Math.random() * firstRender,
      color: color,
      children: children
    });
  }
  return data;
};

export default randomDataGenerator;
