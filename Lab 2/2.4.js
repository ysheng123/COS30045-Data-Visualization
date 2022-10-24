
function init()
{
    var w = 500;
    var h = 100;
    var y = 0;
    var x = 0;
    var barPadding = 1;
    var myData;


    d3.csv("task2.4.csv", function(d) {
      return {
        Test: parseFloat(d.Test)
      };
    }).then(function(data) {
      myData = data;
      barChart(myData);
    }).catch(function(error) {
      d3.select("#chart")
        .append("p")
        .text("Couldn't load data!" +error);
    });

    function barChart()
    {
        var svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

        svg.selectAll("rect")
            .data(myData)
            .enter()
            .append("rect")
            .attr("x", function(d, i) {
              return i * (w / myData.length);
            })
            .attr("y", function(d, i){
              return h - (d.Test * 4);
            })
            .attr("width", function(d, i) {
              return w / myData.length - barPadding;
            })
            .attr("height", function(d, i) {
              return d.Test * 4;
            })
            .style("fill", "#69b3a2");
      }
}
window.onload = init;