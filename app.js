
// Define SVG area dimensions
var svgWidth = 1100;
var svgHeight = 600;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 90,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

//circle r defination
var r = 15

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var xLinearScale;
var yLinearScale;

var scatterchart = chartGroup.append('g');

d3.csv("data.csv").then(function(importedData) {
//console.log(importedData)
//   var abbrs = importedData.map(item => +item.abbr);
//   var poverties = importedData.map(item => +item.poverty);
//   var ages = importedData.map(item => +item.age);
//   var incomes = importedData.map(item => +item.income);
//   var healthcares = importedData.map(item => +item.healthcare);
//   var obesities = importedData.map(item => +item.obesity);
//   var smokeses = importedData.map(item => +item.smokes);
//   console.log(poverties);
//   console.log(ages);
//   console.log(incomes);
//   console.log(healthcares);
//   console.log(obesities);
//   console.log(smokeses);


var age = "age";
var poverty = "poverty";
var income = "income";
var healthcare = "healthcare";
var obesity = "obesity";
var smokes = "smokes";


//chart initiation as default
var ax = "age";
var by = "smokes";
var counter = 0 ;

draw(ax, by);

//chart drawing function
function draw(a, b) {

  //check the input values
    switch (a, b) {
    
        case a && b :         
          ax = a;
          by = b;
          console.log("1", ax, by);
          break;
        case a == null && b :         
          by = b;
          ax = age;
          console.log("2", ax, by);
        case b == null && a:          
          ax = a;
          by = smokes;
          console.log("3", ax, by);
          break;
        default:
          ax = age;
          by = smokes;
          console.log("4", ax, by);
      };

    // console.log(ax);
    // console.log(by);

//xScale
  xLinearScale = d3.scaleLinear()
    .domain(d3.extent(importedData.map(item => + eval(`item.${ax}`))))
    .range([0, chartWidth]);

//yScale
  yLinearScale = d3.scaleLinear()   
    .domain([0, d3.max(importedData.map(item => + eval(`item.${by}`)))])
    .range([chartHeight, 0]);

//axies initiation
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

//shadow effect building
    var defs = scatterchart.append("defs");  
    var filter = defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");

    filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 2)
      .attr("result", "blur");
    
    filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 2)
      .attr("dy", 3)
      .attr("result", "offsetBlur");

    var feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode")
          .attr("in", "offsetBlur");
      feMerge.append("feMergeNode")
          .attr("in", "SourceGraphic");
 
//Scatter ball chart maker
if (counter === 0) {
  scatterchart.append('g')
    .selectAll("circle")
    .data(importedData)
    .enter()
    .append("circle")
    .attr("id", "circle")
    .attr("cx", (d) => xLinearScale(+ eval(`d.${ax}`)))
    .attr("cy", (d) => yLinearScale(+ eval(`d.${by}`)))
    .attr("r", r)
    .classed("chart", true) 
    .style("fill", "#0400FF")
    .style("filter", "url(#drop-shadow)")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    


//states' abbr text on each ball
  scatterchart.append('g')
    .selectAll("text")
    .data(importedData)
    .enter()
    .append("text")
    .attr("dx", (d) => xLinearScale(+ eval(`d.${ax}`))-r/1.5)
    .attr("dy", (d) => yLinearScale(+ eval(`d.${by}`))+ r/3)
    .classed("text", true)
    .transition()
    .duration(200)
    .text((d) => d.abbr);
    
//left yAxis
  scatterchart.append("g")
    .classed("yaxis", true)
    .call(leftAxis);

//bottom xAxis
  scatterchart.append("g")
    .classed("xaxis", true)
    .attr("transform", "translate(0, " + chartHeight + ")")
    .call(bottomAxis);

//add title
  scatterchart.append("text")
    .attr("x", (chartWidth / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "30px") 
    .style('fill', 'blue')
    .style("text-decoration", "underline") 
    .classed("title", true) 
    .style('font-weight','bold')
    .text(`${ax} vs. ${by}`);

} else {
 
    //update with animation effect
  scatterchart
    .selectAll("circle")
    .data(importedData)
    .transition()
    // .ease(d3.easeLinear)
    .ease(d3.easeBounce)
    // .ease(d3.easeSin)
    .delay(function(d,i){return(i*3)})
    .duration(2000)
    .attr("cx", (d) => xLinearScale(+ eval(`d.${ax}`)))
    .attr("cy", (d) => yLinearScale(+ eval(`d.${by}`)))
    .attr("r", r);
    
//update states' abbr text on each ball
  scatterchart
    .selectAll("text")
    .data(importedData) 
    .transition()
    // .ease(d3.easeLinear)
    .ease(d3.easeBounce)
    // .ease(d3.easeSin)
    .delay(function(d,i){return(i*3)})
    .duration(2000) 
    .attr("dx", (d) => xLinearScale(+ eval(`d.${ax}`))-r/1.5)
    .attr("dy", (d) => yLinearScale(+ eval(`d.${by}`))+ r/3)
    .text((d) => d.abbr);


//update left yAxis
  scatterchart.select(".yaxis")
    .call(leftAxis);

//update bottom xAxis
  scatterchart.select(".xaxis")
    .attr("transform", "translate(0, " + chartHeight + ")")
    .call(bottomAxis);

//update title
scatterchart.select(".title")
    .data(importedData)
    .transition()
    .delay(function(d,i){return(i*3)})
    .duration(1000)
    .text(`${ax} vs. ${by}`);
    

}
};

// create a tooltip
var Tooltip = d3.select("#scatter").append("div")  
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px");

// // Three function that change the tooltip when user hover / leave a cell
var mouseover = function() {
 Tooltip
  .style("opacity", 1)
  .html("The X, Y values are : <br> " + (xLinearScale.invert(+d3.mouse(this)[0]).toFixed(2) +
      ", " +(yLinearScale.invert(+d3.mouse(this)[1]).toFixed(2))))
  .style("left", (+d3.mouse(this)[0] + 90) + "px")
  .style("top", (+d3.mouse(this)[1]) + "px");
 d3.select(this)
  .style("stroke", "red")
  .style("stroke-width", 3)
  .style("opacity", 1)
};

var mouseleave = function() {
 Tooltip
  .style("opacity", 0);
 d3.select(this)
  .style("stroke", "none")
  .style("opacity", 0.8)
};

scatterchart.selectAll("circle")
  .on("mouseover", mouseover)
  .on("mouseleave", mouseleave);


//3 xlabel make with mouse in/out effect
  chartGroup.append('g')
    .append("text")             
    .attr("transform",
     "translate(" + (chartWidth/4) + " ," + 
                  (chartHeight + margin.top) + ")")
    .style("text-anchor", "middle")
    .classed("xlabel", true)
    .text("Age(Median)")
    .on('mouseover', function () {
      d3.select(this).style('fill', 'blue')
      .style('font-weight','bold')})      
    .on('mouseout', function () { 
      d3.select(this).style('fill', 'black')
      .style('font-weight','normal')}); 

  chartGroup.append('g')
    .append("text")             
    .attr("transform",
     "translate(" + (chartWidth/2) + " ," + 
                  (chartHeight + margin.top) + ")")
    .style("text-anchor", "middle")
    .classed("xlabel", true)
    .text("Income(Household Median)")
    .on('mouseover', function () {
      d3.select(this).style('fill', 'blue')
      .style('font-weight','bold')})      
    .on('mouseout', function () { 
      d3.select(this).style('fill', 'black')
      .style('font-weight','normal')});
 
  chartGroup.append('g')
    .append("text")             
    .attr("transform",
      "translate(" + (chartWidth * 3/4) + " ," + 
                  (chartHeight + margin.top) + ")")
    .style("text-anchor", "middle")
    .classed("xlabel", true)
    .text("Poverty(%)")
    .on('mouseover', function () {
      d3.select(this).style('fill', 'blue')
      .style('font-weight','bold')})      
    .on('mouseout', function () { 
      d3.select(this).style('fill', 'black')
      .style('font-weight','normal')});
 

//3 ylabel make with mouse in/out effect
  chartGroup.append('g')
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (chartHeight * 3/4))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .classed("ylabel", true)
    .text("Smokes(%)")
    .on('mouseover', function () {
      d3.select(this).style('fill', 'blue')
      .style('font-weight','bold')})      
    .on('mouseout', function () { 
      d3.select(this).style('fill', 'black')
      .style('font-weight','normal')});
 
  chartGroup.append('g')
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (chartHeight / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .classed("ylabel", true)
    .text("Obesity(%)")
    .on('mouseover', function () {
      d3.select(this).style('fill', 'blue')
      .style('font-weight','bold')})      
    .on('mouseout', function () { 
      d3.select(this).style('fill', 'black')
      .style('font-weight','normal')});
 
  chartGroup.append('g')
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (chartHeight / 5))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .classed("ylabel", true)
    .text("Healthcare(Lack %)")
    .on('mouseover', function () {
         d3.select(this).style('fill', 'blue')
         .style('font-weight','bold')})      
    .on('mouseout', function () { 
         d3.select(this).style('fill', 'black')
         .style('font-weight','normal')});
    

//pickup the clicked xlabel
d3.selectAll(".xlabel").on("click", function() {
    var clickedItem = d3.select(this);    
    var ItemText = clickedItem.text();
    var xlabel = ItemText.toLowerCase().split("(");
        console.log(xlabel[0]);
        scatterchart.transition().duration(200);
        Tooltip.html("");
        counter += 1;
        console.log(counter);
        draw(xlabel[0], by);
        scatterchart.selectAll("circle")
          .on("mouseover", mouseover)
          .on("mouseleave", mouseleave)

      });

//pickup the clicked ylabel     
d3.selectAll(".ylabel").on("click", function() {
        // you can select the element just like any other selection
    var clickedItem = d3.select(this);
        clickedItem.style("color", "blue");     
    var ItemText = clickedItem.text();
    var ylabel = ItemText.toLowerCase().split("(");
        console.log(ylabel[0]);
        scatterchart.transition().duration(200);
        Tooltip.html("");
        counter += 1;
        console.log(counter);
        draw(ax, ylabel[0]);
        scatterchart.selectAll("circle")
          .on("mouseover", mouseover)
          .on("mouseleave", mouseleave)
      });

//Error Catcher
}).catch(function(error) {
    console.log(error);
});
  
