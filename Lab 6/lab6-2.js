
function init()
{
    var w = 600;
    var h = 250;
    var barPadding= 1;
    var data = true;
    var data1 = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
    var data2 = [11, 12, 15, 20, 18, 17, 16, 18, 23, 25, 5, 10, 13, 19, 21, 25, 22, 18, 15, 13];
    var dataset = data1;
    var maxValue = 25;
    
    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .rangeRound([0,w])
                    .paddingInner(0.05);

    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset)])
                    .range([0, h]);

    

    //barchart after updating
          d3.select("#add")
            .on("click", function() {
                var newNumber = Math.floor(Math.random()* maxValue);
                dataset.push(newNumber);

                var bars = svg.selectAll("rect").data(dataset);
                xScale.domain(d3.range(dataset.length));
                yScale.domain([0, d3.max(dataset)]);

                bars.enter()
                    .append("rect")
                    .merge(bars)
                    .transition()
                    .duration(500)
                    .attr("x", function(d, i) {
                        return xScale(i);
                    })
                    .attr("y", function(d) {
                        return h - yScale(d);
                    })
                    .attr("width", xScale.bandwidth())
                    .attr("height", function(d) {
                        return yScale(d);
                    })
                    .attr("fill", function(d) { // <-- Down here!
                        return "rgb(0, 0, " + Math.round(d * 10) + ")";
                    })

                svg.selectAll("text")
                    .data(dataset)
                    .text(function(d) {
                    return d;
                    })
                    .attr("x", function(d, i) {
                    return xScale(i) + xScale.bandwidth() / 2;
                    })
                    .attr("y", function(d) {
                    return h - yScale(d) + 14;
                    })

            }); 
            //removing bar chart
            d3.select("#remove")
                .on("click", function() {
                dataset.shift();

                var bars = svg.selectAll("rect").data(dataset);
            
                
                bars.exit()
                    .transition()
                    .duration(500)
                    .attr("x", w)
                    .remove()

                bars.transition()
                    .delay(500)
                    .attr("x", function(d, i) {
                    return xScale(i);
                    })
                    .attr("y", function(d) {
                    return h - yScale(d);
                    })
                    .attr("width", xScale.bandwidth())
                    .attr("height", function(d) {
                    return yScale(d);
                    })

                    svg.selectAll("text")
                    .data(dataset)
                    .text(function(d) {
                    return d;
                    })
                    .attr("x", function(d, i) {
                    return xScale(i) + xScale.bandwidth() / 2;
                    })
                    .attr("y", function(d) {
                    return h - yScale(d) + 14;
                    })
                });

    var sortOrder = false;
    var sortBars = function() {
        svg.selectAll("rect")
        .sort(function(a, b) {
            if (sortOrder) {
                return d3.ascending(a, b);
                } else {
                return d3.descending(a, b);
                }
        })
        .attr("x", function(d, i) {
            return xScale(i);
            })
        .transition()
        .delay(function(d, i) {
            return i * 50;
            })
        .duration(1000)
        
        sortOrder=!sortOrder;
        };
    
            //sorting the bar chart
            d3.select("#sort")
            .on("click", function() {
                sortBars();
            });
    //creating Bar chart
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

        svg.selectAll("rect")
           .data(dataset)
           .enter()
           .append("rect")
           .attr("x",function(d,i) {
            return i * (w / dataset.length);
           })
           .attr("width", w / dataset.length - barPadding/2)
           .attr("y", function(d){
            return h - d *10;
           })
           .attr("height",  function(d) {
            return d * 10;
           })
           .attr("fill", function(d) {
            return "rgb(0, 0, " + Math.round(d * 10) + ")";
            })
           .on("mouseover", function(){
            var xposition = parseFloat(d3.select(this).attr("x"))+xScale.bandwidth()/2;
            var yposition = parseFloat(d3.select(this).attr("y"))+14;
                d3.select(this)
                .attr("fill","orange")
                .append("title")
                .text(function(d){
                    return "This value is " + d;
                })
                //Create the tooltip label
                svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .text(d);
            })
           .on("mouseout", function(d) {
                d3.select(this)
                .transition()
                .duration(250)
                .attr("fill", function(d) {
                    return "rgb(0, 0, " + Math.round(d * 10) + ")";
                    })
                //Remove the tooltip
                d3.select("#tooltip").remove();
            });
            
//creating bar
            svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function(d, i) {
            return xScale(i); // <-- Set x values
            })
            .attr("width", xScale.bandwidth());

        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function(d) {
                return d;
                })
            .attr("x", function(d, i) {
                return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
                })
            .attr("y", function(d) {
                return h - (d * 10) + 14; //15 is now 14
                })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "white")
            .attr("text-anchor", "middle");




    
}
window.onload = init;