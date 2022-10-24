function init() {
        var w = 550;
        var h = 100;
        var padding=20;

        var dataset = [[5, 20],
                      [500, 90],
                      [250, 50],
                      [100, 33],
                      [330, 95],
                      [410, 12],
                      [475, 44],
                      [25, 67],
                      [85, 21],
                      [220, 88],
                    ];
        
        var xScale = d3.scaleLinear()
                    .domain([d3.min(dataset, function (d) {
                      return d[0];
                    }),
                    d3.max(dataset, function (d) {
                      return d[0];
                    })])
                    .range([padding, w - padding]);
                
        var yScale = d3.scaleLinear()
                    .domain([d3.min(dataset, function (d) {
                      return d[1];
                    }),
                    d3.max(dataset, function (d) {
                      return d[1];
                    })])
                    .range([h- padding, padding]);
        

        var svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);
                    
        svg.selectAll("rect")
                    .data(dataset)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d, i) {
                      return xScale(d[0]);
                    })
                    .attr("cy", function(d) {
                      return yScale(d[1]);
                    })
                    .attr("r", 5)
                    .attr("fill", function(d, i) {
                      if (i == 1) {
                        return "red";
                      }
                      return "slategrey";
                    });

        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function(d) {
                return "(" + d[0] + ", " + d[1] + ")";
              })
              .attr("x", function(d, i) {
                return xScale(d[0]) + 5;
              })
              .attr("y", function(d) {
                return yScale(d[1]) + 10;
              })
              .attr("fill", "green");

        
  }
  
  window.onload = init;