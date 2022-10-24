
function init()
{
    var w = 600;
    var h = 250;
    var barPadding= 1;
    var data = true;
    var data1 = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
    var data2 = [11, 12, 15, 20, 18, 17, 16, 18, 23, 25, 5, 10, 13, 19, 21, 25, 22, 18, 15, 13];
    var dataset = data1;

    
    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .rangeRound([0,w])
                    .paddingInner(0.05);

    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset)])
                    .range([0, h]);

    //barchart after updating
          d3.select("#update")
            .on("click", function() {
                data = !data;
                if(data) {
                dataset = data1;
                } else {
                dataset = data2;
                }
        
                svg.selectAll("rect")
                .data(dataset)
                .attr("y", function(d) {
                    return h - yScale(d);
                })
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