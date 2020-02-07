import * as d3 from "d3";

const colorDataGenerator = (colors, newData = []) => {
  const data = [...newData];

  for (let i = 0; i < data.length; i++ ) {
    data[i].color = colors(i)
   if (data[i].children) {
    for (let j = 0; j < data[i].children.length; j++ ) {
      data[i].children[j].color = d3.rgb(colors(i)).darker(1 / (j + 1))
    }
   } 
  }
  return data;
};

export default colorDataGenerator;
