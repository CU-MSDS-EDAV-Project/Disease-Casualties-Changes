// add your JavaScript/D3 to this file

// Load the preprocessed data from the CSV file
d3.csv("https://raw.githubusercontent.com/cu-msds-edav-project/Disease-Casualties-Changes/main/data/yearly_deaths_by_state.csv")
  .then(function(data) {
    // Populate year selector
    var years = Array.from(new Set(data.map(d => d.year)));
    var selector = d3.select("#yearSelector");
    selector.selectAll("option")
      .data(years)
      .enter()
      .append("option")
      .text(d => d)
      .attr("value", d => d);

    // Define margins and dimensions
    var margin = {top: 10, right: 20, bottom: 40, left: 60},
        width = 500 - margin.left - margin.right,
        height = 360 - margin.top - margin.bottom;

    // Append the SVG object to the body of the page
    var svg = d3.select("#scatterplot")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    // Function to create the scatter plot
    function createScatterPlot(selectedYear) {
      // Filter data for the selected year
      var filteredData = data.filter(d => d.year === selectedYear);

      // Define scales
      var xScale = d3.scaleLinear()
        .domain(d3.extent(filteredData, d => +d.total_influenza_death))
        .range([0, width]);

      var yScale = d3.scaleLinear()
        .domain(d3.extent(filteredData, d => +d.total_pneumonia_death))
        .range([height, 0]);

      // Add X axis
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

      // Add Y axis
      svg.append("g")
        .call(d3.axisLeft(yScale));

      // Add X axis label
      svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width-100)
        .attr("y", height + margin.bottom)
        .text("Number of Influenza Deaths");

      // Add Y axis label
      svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -45)
        .attr("x", -height / 2 + 125)
        .text("Number of Pneumonia Deaths");

      // Bind filtered data to circles
      var circles = svg.selectAll("circle")
        .data(filteredData, d => d.state);

      // Update the scatter plot
      circles.enter().append("circle").merge(circles)
        .attr("cx", d => xScale(+d.total_influenza_death))
        .attr("cy", d => yScale(+d.total_pneumonia_death))
        .attr("r", 5)
        .attr("fill", "steelblue");

      // Remove old data points
      circles.exit().remove();
    }

    // Initialize the scatter plot
    createScatterPlot(years[0]);

    // Update the plot when a new year is selected
    selector.on("change", function(event) {
      // Clear the existing plot
      svg.selectAll("g").remove();

      // Draw the new plot for the selected year
      createScatterPlot(this.value);
    });
  })
  .catch(function(error) {
    console.error('Error loading the CSV file:', error);
  });
