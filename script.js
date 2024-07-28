//right when webpage loads, display first two bar charts
document.addEventListener("DOMContentLoaded", function(){
    scene1('ERA');
    scene2('W');
});
//function for beginning ERA bar chart
function scene1(output){

    var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    const annotation = [{
        note: {
            title: "Hover over",
            label: "for more info!",
            wrap: 130
        },
        x:215,
        y:50,
        dy:150,
        dx:70,
        connector: {
            type: "line",
            color: "red"
        }
    }];

    d3.select("#era-graph").select("svg").remove();

    var tooltip = d3.select("#era-tooltip");
    
    var svg = d3.select("#era-graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var tooltip = d3.select("body").append("div")
    .attr("id", "era-tooltip")
    .attr("class","tooltip")
    .style("opacity",0);

    //Parse the data
    d3.csv("2005to2015BaseballTeamsUpdated.csv").then(function(data) {
    data.forEach(d => {
        d.yearID = +d.yearID;
        d[output] = +d[output];
    });


    var x = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d[output]; })])
    .range([ 0, width]);

    var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.franchID; }))
    .padding(.1);

    //x
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    //y
    svg.append("g")
    .call(d3.axisLeft(y))
    
    //populate bars in bar graph
    svg.selectAll("rect")
    .data(data.filter(d => d.yearID === 2005))
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.franchID); })
    .attr("width", function(d) { return x(d[output]); })
    .attr("height", y.bandwidth() )
    .attr("fill", "blue")
    .on("mouseover", function(event, d){
        tooltip.transition()
        .duration(250)
        .style("opacity", 0.9);
        tooltip.html("Team: " + d.name + "<br/>Location: " + d.location + "<br/>ERA: " + d[output] )
        .style("left", (event.pageX + 5) +"px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
        tooltip.transition()
        .duration(250)
        .style("opacity", 0);
    });

    const makeAnnotation = d3.annotation()
    .annotations(annotation)

    svg.append("g")
    .attr("class","annotation-group")
    .call(makeAnnotation)

    //title for graph
    svg.append("text")
    .attr("x", width / 2)
    .attr("y", -8)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration","underline")
    .text("ERA Bar Plot 2005");

    //x axis label
    svg.append("text")
    .attr("x", width / 2)
    .attr("y", 380)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text(output);

    //y axis label
    svg.append("text")
    .attr("transform","rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left/1.5)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Teams");

    }).catch(function(error) {
    console.error('Error loading or parsing data.');
    });
}

//function for beginning Wins graph
function scene2(output){

    var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    const annotation = [{
        note: {
            title: "2nd to highest",
            label: "wins for 2005!",
            wrap: 130
        },
        x:215,
        y:50,
        dy:111,
        dx:70,
        connector: {
            type: "line",
            color: "red"
        }
    }];

    d3.select("#barplot").select("svg").remove();
    var tooltip = d3.select("#barplot-tooltip");
    
    var svg = d3.select("#barplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var tooltip = d3.select("body").append("div")
    .attr("id", "barplot-tooltip")
    .attr("class","tooltip")
    .style("opacity",0);

    // Parse the Data
    d3.csv("2005to2015BaseballTeamsUpdated.csv").then(function(data) {
    data.forEach(d => {
        d.yearID = +d.yearID;
        d[output] = +d[output];
    });


    var x = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d[output]; })])
    .range([ 0, width]);

    var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.franchID; }))
    .padding(.1);

    //x
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    //y
    svg.append("g")
    .call(d3.axisLeft(y))
    
    //populate the bars for the bar graph
    svg.selectAll("rect")
    .data(data.filter(d => d.yearID === 2005))
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.franchID); })
    .attr("width", function(d) { return x(d[output]); })
    .attr("height", y.bandwidth() )
    .attr("fill", function(d){
        return output === 'W' ? "lightgreen" : "red";
    })
    .on("mouseover", function(event, d){
        tooltip.transition()
        .duration(250)
        .style("opacity", 0.9);
        tooltip.html("Team: " + d.name + "<br/>Location: " + d.location + "<br/>" + (output ==='W' ? 'Wins: ' : 'Losses: ') + d[output] )
        .style("left", (event.pageX + 5) +"px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
        tooltip.transition()
        .duration(250)
        .style("opacity", 0);
    });

    const makeAnnotation = d3.annotation()
    .annotations(annotation)

    svg.append("g")
    .attr("class","annotation-group")
    .call(makeAnnotation)

       //title for graph
       svg.append("text")
       .attr("x", (width / 2))
       .attr("y", -8)
       .attr("text-anchor", "middle")
       .style("font-size", "16px")
       .style("text-decoration","underline")
       .text(output + " Bar Plot 2005");
   
       //x axis label
       svg.append("text")
       .attr("x", (width / 2))
       .attr("y", 380)
       .attr("text-anchor", "middle")
       .style("font-size", "14px")
       .text(output);
   
       //y axis label
       svg.append("text")
       .attr("transform","rotate(-90)")
       .attr("x", -height / 2)
       .attr("y", -margin.left/1.5)
       .attr("text-anchor", "middle")
       .style("font-size", "14px")
       .text("Teams");

    }).catch(function(error) {
    console.error('Error loading or parsing data.');
    });
}
//function for ERA graph with slider
function scene3(output){

    var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    d3.select("#era-graph").select("svg").remove();
    var tooltip = d3.select("#era-tooltip");
    
    var svg = d3.select("#era-graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var tooltip = d3.select("body").append("div")
    .attr("id", "era-tooltip")
    .attr("class","tooltip")
    .style("opacity",0);

    
    d3.csv("2005to2015BaseballTeamsUpdated.csv").then(function(data) {
    data.forEach(d => {
        d.yearID = +d.yearID;
        d[output] = +d[output];
    });


    var x = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d[output]; })])
    .range([ 0, width]);

    var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.franchID; }))
    .padding(.1);

    //x
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    //y
    svg.append("g")
    .call(d3.axisLeft(y))
    

    svg.selectAll("rect")
    .data(data.filter(d => d.yearID === 2005))
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.franchID); })
    .attr("width", function(d) { return x(d[output]); })
    .attr("height", y.bandwidth() )
    .attr("fill", "blue")
    .on("mouseover", function(event, d){
        tooltip.transition()
        .duration(250)
        .style("opacity", 0.9);
        tooltip.html("Team: " + d.name + "<br/>Location: " + d.location + "<br/>ERA: " + d[output] )
        .style("left", (event.pageX + 5) +"px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
        tooltip.transition()
        .duration(250)
        .style("opacity", 0);
    });

    d3.select("#era-slider").select("svg").remove();
    
    const sliderRange = d3
    .sliderBottom()
    .min(2005)
    .max(2015)
    .step(1)
    .width(300)
    .tickFormat(d3.format("d"))
    .ticks(11)
    .default(2005)
    .fill('blue');


    sliderRange.on('onchange', val => {
        const filteredData = data.filter(d => d.yearID === val);

        var updatedBars = svg.selectAll("rect")
                             .data(filteredData, d => d.franchID);
        updatedBars.enter()
        .append("rect")
        .merge(updatedBars)
        .attr("x", x(0))
        .attr("y", function(d) { return y(d.franchID); })
        .transition().duration(1000)
        .attr("width", function(d) { return x(d[output]); })
        .attr("height", y.bandwidth())
        .attr("fill", "blue")
        updatedBars.exit().remove();

        tooltip.transition()
        .duration(250)
        .style("opacity", 0);
   
    });

    const gRange = d3.select('#era-slider')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(90,30)')

    gRange.call(sliderRange);


       //title for graph
       svg.append("text")
       .attr("x", width / 2)
       .attr("y", -8)
       .attr("text-anchor", "middle")
       .style("font-size", "16px")
       .style("text-decoration","underline")
       .text("ERA Bar Plot");
   
       //x axis label
       svg.append("text")
       .attr("x", width / 2)
       .attr("y", 380)
       .attr("text-anchor", "middle")
       .style("font-size", "14px")
       .text(output);
   
       //x axis label
       svg.append("text")
       .attr("transform","rotate(-90)")
       .attr("x", -height / 2)
       .attr("y", -margin.left/1.5)
       .attr("text-anchor", "middle")
       .style("font-size", "14px")
       .text("Teams");

    }).catch(function(error) {
    console.error('Error loading or parsing data.');
    });
}

//function for Wins/Losses graph with slider
function scene4(output){

    var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    d3.select("#barplot").select("svg").remove();
    var tooltip = d3.select("#barplot-tooltip");
    
    var svg = d3.select("#barplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var tooltip = d3.select("body").append("div")
    .attr("id", "barplot-tooltip")
    .attr("class","tooltip")
    .style("opacity",0);

    // Parse the Data
    d3.csv("2005to2015BaseballTeamsUpdated.csv").then(function(data) {
    console.log(data.yearID);
    data.forEach(d => {
        d.yearID = +d.yearID;
        d[output] = +d[output];
    });


    var x = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d[output]; })])
    .range([ 0, width]);

    var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.franchID; }))
    .padding(.1);

    //x
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    //y
    svg.append("g")
    .call(d3.axisLeft(y))
    

    svg.selectAll("rect")
    .data(data.filter(d => d.yearID === 2005))
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.franchID); })
    .attr("width", function(d) { return x(d[output]); })
    .attr("height", y.bandwidth() )
    .attr("fill", function(d){
        return output === 'W' ? "lightgreen" : "red";
    })
    .on("mouseover", function(event, d){
        tooltip.transition()
        .duration(250)
        .style("opacity", 0.9);
        tooltip.html("Team: " + d.name + "<br/>Location: " + d.location + "<br/>" + (output ==='W' ? 'Wins: ' : 'Losses: ') + d[output] )
        .style("left", (event.pageX + 5) +"px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
        tooltip.transition()
        .duration(250)
        .style("opacity", 0);
    });

    d3.select("#slider-range").select("svg").remove();
    
    const sliderRange = d3
    .sliderBottom()
    .min(2005)
    .max(2015)
    .step(1)
    .width(300)
    .tickFormat(d3.format("d"))
    .ticks(11)
    .default(2005)
    .fill(output === 'W' ? 'green' : 'red');


    sliderRange.on('onchange', val => {
        const filteredData = data.filter(d => d.yearID === val);

        var updatedBars = svg.selectAll("rect")
                             .data(filteredData, d => d.franchID);
        updatedBars.enter()
        .append("rect")
        .merge(updatedBars)
        .attr("x", x(0))
        .attr("y", function(d) { return y(d.franchID); })
        .transition().duration(1000)
        .attr("width", function(d) { return x(d[output]); })
        .attr("height", y.bandwidth())
        .attr("fill", function(d) {
            return output === 'W' ? "lightgreen" : "red";
        })
        updatedBars.exit().remove();

        tooltip.transition()
        .duration(250)
        .style("opacity", 0);
   
    });

    const gRange = d3.select('#slider-range')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(90,30)')

    gRange.call(sliderRange);
    
    //title for graph
    svg.append("text")
    .attr("x", (width / 2))
    .attr("y", -8)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration","underline")
    .text(output + " Bar Plot");
       
    //x axis label
    svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 380)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text(output);
       
    //y axis label
    svg.append("text")
    .attr("transform","rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left/1.5)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Teams");

    }).catch(function(error) {
    console.error('Error loading or parsing data.');
    });
}