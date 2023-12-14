// add your JavaScript/D3 to this file


// Create 2 datasets
var data1 = [
   {ser1: 0.3, ser2: 4},
   {ser1: 2, ser2: 16},
   {ser1: 3, ser2: 8}
];

var data2 = [
   {ser1: 1, ser2: 7},
   {ser1: 4, ser2: 1},
   {ser1: 6, ser2: 8}
];

const data3 =
[{"date":"1-Apr-18","high":60},
{"date":"2-Apr-18","high":43},
{"date":"3-Apr-18","high":43},
{"date":"4-Apr-18","high":56},
{"date":"5-Apr-18","high":45},
{"date":"6-Apr-18","high":62},
{"date":"7-Apr-18","high":49}];
/*
data.forEach(function(d) {
      d.date = parseTime(d.date);
});*/

// set the dimensions and margins of the graph
const margin = {top: 20, right: 50, bottom: 30, left: 50}
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("div#plot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialise a X axis:
var x = d3.scaleLinear().range([0,width]);
var xAxis = d3.axisBottom().scale(x);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class","myXaxis")

// Initialize an Y axis
var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft().scale(y);
svg.append("g")
  .attr("class","myYaxis")

// Create a function that takes a dataset as input and update the plot:
function update(data) {

  // Create the X axis:
  x.domain([0, d3.max(data, function(d) { return d.ser1 }) ]);
  svg.selectAll(".myXaxis").transition()
    .duration(3000)
    .call(xAxis);

  // create the Y axis
  y.domain([0, d3.max(data, function(d) { return d.ser2  }) ]);
  svg.selectAll(".myYaxis")
    .transition()
    .duration(3000)
    .call(yAxis);

  // Create a update selection: bind to the new data
  var u = svg.selectAll(".lineTest")
    .data([data], function(d){ return d.ser1 });

  // Updata the line
  u
    .enter()
    .append("path")
    .attr("class","lineTest")
    .merge(u)
    .transition()
    .duration(3000)
    .attr("d", d3.line()
      .x(function(d) { return x(d.ser1); })
      .y(function(d) { return y(d.ser2); }))
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2.5)
}

// At the beginning, I run the update function on the first dataset:
update(data1)
