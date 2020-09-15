// @TODO: YOUR CODE HERE!
var svgWidth = 950;
var svgHeight = 550;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// import data
d3.csv("assets/data/data.csv").then(function(newsData) {
    console.log(newsData);

    //step 1: parse data
    newsData.forEach(function(data){
        data.poverty = + data.poverty;
        data.healthcare = + data.healthcare;
        console.log(data.poverty);
        console.log(data.healthcare)
    });

    //step 2: create scale functions
    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(newsData, d => d.poverty)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([4, d3.max(newsData, d => d.healthcare)])
        .range([height, 0]);
    
    // step 3: create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // step 4: append axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    // step 5: create circles
    chartGroup.selectAll("circle")
    .data(newsData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", ".5");

    //step 6: add text into bubble
    chartGroup.selectAll(".label")
    .data(newsData)
    .enter()
    .append("text")
    .text(function(d) {
        return d.abbr
    })
    .attr("x", d => xLinearScale(d.poverty-0.11)   )
    .attr("y", d => yLinearScale(d.healthcare-0.12)   )
    .attr("font-size","9px")
    .attr("font-weight","bold")
    .attr("fill","white")
   
    console.log()
 



    // chartGroup.selectAll("circle").append("text").text(d => d.abbr)
    //                                 .attr("x", d => xLinearScale(d.poverty))
    //                                 .attr("y", d => yLinearScale(d.healthcare));


    // create axes labels
    // y axes
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 50)
    .attr("x", 0 - (height / 2)-60)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .attr("font-weight","bold")
    .text("Lacks Healthcare(%)");

    // x axes
    chartGroup.append("text")
    .attr("transform", `translate(${width / 2 - 100}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .attr("font-weight","bold")
    .text("In Poverty(%)");

});