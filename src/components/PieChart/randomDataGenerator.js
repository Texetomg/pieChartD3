import * as d3 from "d3";

const randomDataGenerator = (colors, maxSectors) => {
  const data = [];
  const numSectors = Math.ceil(Math.random() * maxSectors);
  for (let i = -1; i++ < numSectors; ) {
    const children = [];
    const numChildSectors = Math.ceil(Math.random() * maxSectors);
    const color = colors(i);

    for (let j = -1; j++ < numChildSectors; ) {
      children.push({
        value: Math.random() * 1000,
        color: d3.rgb(color).darker(1 / (j + 1))
      });
    }
    data.push({
      value: Math.random() * 1000000,
      color: color,
      children: children
    });
  }
  return data;
};

export default randomDataGenerator;
