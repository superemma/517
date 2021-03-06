var width = 480
  , height = 480;
var zoom = d3.behavior.zoom().scaleExtent([1, 10]).on("zoom", zoomed);
var drag = d3.behavior.drag().origin(function(d) {
    return d;
}).on("dragstart", dragstarted).on("drag", dragged).on("dragend", dragended);
var svgContainer = d3.select("#maindiv").append('svg').attr("width", width).attr("height", height).call(zoom).append("g").attr("transform", "translate(-80,0)");
var scaleX = d3.scale.linear().domain([0, 20]).range([0, width]);
var scaleY = d3.scale.linear().domain([0, 20]).range([height, 0]);
var LscaleX = d3.scale.linear().domain([0, 40]).range([0, 400]);
var LscaleY = d3.scale.linear().domain([0, 5]).range([70, 0]);
var formatDate = d3.time.format("%b-%d");
//pump button #8e0152 #c51b7d #de77ae #f1b6da #fde0ef #f7f7f7 #e6f5d0 #b8e186 #7fbc41 #4d9221 #276419

$('#pump1').click(function() { d3.selectAll('path[Pump = "P1"]').style("fill", "grey");});
$('#pump2').click(function() {d3.selectAll('path[Pump = "P2"]').style("fill", "red");});
$('#pump3').click(function() {d3.selectAll('path[Pump = "P3"]').style("fill", "#8e0152");});
$('#pump4').click(function() {d3.selectAll('path[Pump = "P4"]').style("fill", "#c51b7d");});
$('#pump5').click(function() {d3.selectAll('path[Pump = "P5"]').style("fill", "#de77ae");});
$('#pump6').click(function() {d3.selectAll('path[Pump = "P6"]').style("fill", "#f1b6da");});
$('#pump7').click(function() {d3.selectAll('path[Pump = "P7"]').style("fill", "#fde0ef");});
$('#pump8').click(function() {d3.selectAll('path[Pump = "P8"]').style("fill", "#fee090");});
$('#pump9').click(function() {d3.selectAll('path[Pump = "P9"]').style("fill", "#e6f5d0");});
$('#pump10').click(function() {d3.selectAll('path[Pump = "P10"]').style("fill", "#b8e186");});
$('#pump11').click(function() {d3.selectAll('path[Pump = "P11"]').style("fill", "#7fbc41");});
$('#pump12').click(function() {d3.selectAll('path[Pump = "P12"]').style("fill", "#4d9221");});
$('#pump13').click(function() {d3.selectAll('path[Pump = "P13"]').style("fill", "#276419");});


var colourScale = d3.scale.ordinal().domain(["0", "1", "2", "3", "4", "5"]).range(['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#2c7fb8', '#253494']);

var symbolTypes = {
        "diamond": d3.svg.symbol().type("diamond").size(30),
        "circle": d3.svg.symbol().type("circle").size(30)
    };
//draw map
var rdata = []
$.getJSON("streets.json", function(data) {
    $.each(data, function(index, d) {
        rdata.push(d)
    });
    svgContainer.selectAll("polyline").data(rdata).enter().append("polyline").attr("points", function(d) {
        return d.map(function(d) {
            return [scaleX(d.x), scaleY(d.y)].join(",");
        }).join(" ");
    }).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 1);
});
var toggleColor = (function() {
    var currentColor = "black";
    return function() {
        currentColor = currentColor == "black" ? "magenta" : "black";
        d3.select(this).style("fill", currentColor);
    }
}
)();
// draw pump
pumpdata = []
d3.csv("pumps.csv", function(error, data) {
    if (error)
        throw error;
    data.forEach(function(d) {
        d.x = +d.x;
        d.y = +d.y;
        pumpdata.push(d)
    });

    // Add pumps
    svgContainer.selectAll(".point").data(data).enter().append("path").attr("class", "point").attr("d", d3.svg.symbol().type("cross")).
    attr("Pump", function(d) { return d.id}).attr("transform", function(d) {
        return "translate(" + scaleX(d.x) + "," + scaleY(d.y) + ")";
    }).on("click", toggleColor);
    svgContainer.selectAll("text.pump").data(data).enter().append("text").text(function(d) {
        return d.id;
    }).attr("transform", function(d) {
        return "translate(" + scaleX(d.x + 0.2) + "," + scaleY(d.y - 0.15) + ")";
    }).attr("font-size", "11px")
    
});
//label main roads
var roadname = [{name: 'O X F O R D \u00A0 \u00A0 S T .', x: 5,y: 15.6,rotate: -10.5}, {name: 'O X F O R D \u00A0 \u00A0 S T .', x: 13.5,    y: 16.8,    rotate: -10.5}, {name: 'R E G E N T \u00A0 \u00A0 S T.', x: 5.8, y: 15.4,  rotate: 75}, {name: 'K I N G \'S \u00A0 \u00A0 S T R E E T',    x: 7.2,    y: 12.2,    rotate: 52}, {    name: 'R E G E N T \u00A0 \u00A0 S T R E E T',x: 8,y: 9.5,rotate: 60}, {name: 'B r o a d \u00A0 \u00A0 S t r e et', x: 11.2,y: 11.2,rotate: -27}, {name: 'B r e w e r S t r e e t',x: 12,y: 5.8, rotate: -42}, {name: 'D E A N \u00A0 \u00A0 S T R E T T',    x: 16.3,    y: 16,    rotate: 66}, {    name: 'PICCADILLY',    x: 14.3,    y: 3.5,    rotate: -24}, {    name: 'Little Windmill',    x: 12.9,    y: 10.6,    rotate: 55},{name:'Work',x:10.5,y:13,rotate:-23},
              {name:'House',x:11,y:12.5,rotate:-23},{name:'Brewery',x:13.6,y:12.3,rotate:65}]
var workHouse = [{x:10.1,y:13.5,w:45,h:37,rotate:-25}]
var brewery = [{x:13.9,y:12.5,w:27,h:15,rotate:62.5}]
var work = svgContainer.append("rect")
          .data(workHouse)
          .attr("transform", function(d) {
    return "translate(" + scaleX(d.x) + "," + scaleY(d.y) + ") rotate(" + d.rotate + ")";
})
          .attr("width", function(d) { return d.w; })
          .attr("height", function(d) { return d.h; })
          .attr("stroke", 'grey')
          .attr("fill-opacity",0.2)
          .style("fill", "grey"); 

var bre = svgContainer.append("rect")
          .data(brewery)
          .attr("transform", function(d) {
    return "translate(" + scaleX(d.x) + "," + scaleY(d.y) + ") rotate(" + d.rotate + ")";
})
          .attr("width", function(d) { return d.w; })
          .attr("height", function(d) { return d.h; })
            .attr("fill-opacity",0.2)
          .style("fill", "grey"); 

svgContainer.selectAll("text.road").data(roadname).enter().append("text").text(function(d) {
    return d.name;
}).attr("transform", function(d) {
    return "translate(" + scaleX(d.x) + "," + scaleY(d.y) + ") rotate(" + d.rotate + ")";
}).attr("fill", "grey").attr("font-size", "12px");

//Add legend
d3.select("#legends").append("path").attr("class", "dot").attr("transform", function(d) {return "translate(" + LscaleX(1) + "," + LscaleY(2) + ")";}).style("stroke-width", 0.5).style("stroke", "black").attr("d", d3.svg.symbol().type("cross")).style("fill","black");
d3.select("#legends").append("text").text("Water Pump").attr("transform", function(d) {return "translate(" + LscaleX(0.1) + "," + LscaleY(4.4) + ")";}).attr("fill", "black").attr("font-size", "12px");
d3.select("#legends").append("text").text("P1-P13").attr("transform", function(d) {return "translate(" + LscaleX(2) + "," + LscaleY(1.5) + ")";}).attr("fill", "black").attr("font-size", "11px");
d3.select("#legends").append("text").text("Deaths\u00A0 \u00A0Shape:Gender").attr("transform", function(d) {return "translate(" + LscaleX(8) + "," + LscaleY(4.4) + ")";}).attr("fill", "black").attr("font-size", "12px");
d3.select("#legends").append("text").text("Color:Age Group").attr("transform", function(d) {return "translate(" + LscaleX(22) + "," + LscaleY(4.4) + ")";}).attr("fill", "black").attr("font-size", "12px");

d3.select("#legends").append("path").attr("class", "dot").attr("transform", function(d) {return "translate(" + LscaleX(13) + "," + LscaleY(0.7) + ")";}).style("stroke-width", 0.5).style("stroke", "black").attr("d", symbolTypes.circle()).style("fill","white");
d3.select("#legends").append("text").text("Female").attr("transform", function(d) {return "translate(" + LscaleX(14) + "," + LscaleY(0.5) + ")";}).attr("fill", "black").attr("font-size", "12px");
d3.select("#legends").append("path").attr("class", "dot").attr("transform", function(d) {return "translate(" + LscaleX(13) + "," + LscaleY(2.5) + ")";}).style("stroke-width", 0.5).style("stroke", "black").attr("d", symbolTypes.diamond()).style("fill","white");

d3.select("#legends").append("text").text("Male").attr("transform", function(d) {return "translate(" + LscaleX(14) + "," + LscaleY(2.2) + ")";}).attr("fill", "black").attr("font-size", "12px");

//'#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#2c7fb8', '#253494'
d3.select("#legends").append("path").attr("class", "dot").attr("transform", function(d) {return "translate(" + LscaleX(24) + "," + LscaleY(3.4) + ")";}).attr("d", d3.svg.symbol().type("square").size(80)).style("fill","#ffffcc");
d3.select("#legends").append("path").attr("class", "dot").attr("transform", function(d) {return "translate(" + LscaleX(24) + "," + LscaleY(2.8) + ")";}).attr("d", d3.svg.symbol().type("square").size(80)).style("fill","#c7e9b4");
d3.select("#legends").append("path").attr("class", "dot").attr("transform", function(d) {return "translate(" + LscaleX(24) + "," + LscaleY(2.2) + ")";}).attr("d", d3.svg.symbol().type("square").size(80)).style("fill","#7fcdbb");
d3.select("#legends").append("path").attr("class", "dot").attr("transform", function(d) {return "translate(" + LscaleX(24) + "," + LscaleY(1.6) + ")";}).attr("d", d3.svg.symbol().type("square").size(80)).style("fill","#41b6c4");
d3.select("#legends").append("path").attr("class", "dot").attr("transform", function(d) {return "translate(" + LscaleX(24) + "," + LscaleY(0.95) + ")";}).attr("d", d3.svg.symbol().type("square").size(80)).style("fill","#2c7fb8");
d3.select("#legends").append("path").attr("class", "dot").attr("transform", function(d) {return "translate(" + LscaleX(24) + "," + LscaleY(0.3) + ")";}).attr("d", d3.svg.symbol().type("square").size(80)).style("fill","#253494");


d3.select("#legends").append("text").text("0 : 0 -10 yrs").attr("transform", function(d) {return "translate(" + LscaleX(25) + "," + LscaleY(3.3) + ")";}).attr("fill", "black").attr("font-size", "11px");
d3.select("#legends").append("text").text("1 : 11-20 yrs").attr("transform", function(d) {return "translate(" + LscaleX(25) + "," + LscaleY(2.7) + ")";}).attr("fill", "black").attr("font-size", "11px");
d3.select("#legends").append("text").text("2 : 21-40 yrs").attr("transform", function(d) {return "translate(" + LscaleX(25) + "," + LscaleY(2.05) + ")";}).attr("fill", "black").attr("font-size", "11px");
d3.select("#legends").append("text").text("3 : 41-60 yrs").attr("transform", function(d) {return "translate(" + LscaleX(25) + "," + LscaleY(1.45) + ")";}).attr("fill", "black").attr("font-size", "11px");
d3.select("#legends").append("text").text("4 : 61-80 yrs").attr("transform", function(d) {return "translate(" + LscaleX(25) + "," + LscaleY(0.75) + ")";}).attr("fill", "black").attr("font-size", "11px");
d3.select("#legends").append("text").text("5 :   >80 yrs").attr("transform", function(d) {return "translate(" + LscaleX(25) + "," + LscaleY(0.15) + ")";}).attr("fill", "black").attr("font-size", "11px");
//draw death
var deathspump=[]
d3.csv("deaths_age_sex.csv", function(error, death) {
    if (error) throw error;
    death.forEach(function(d) {
        d.date = parseDate(d.date);
        d.num_deaths = +d.num_deaths
        d.x = +d.x
        d.y = +d.y
    });
    
    var nestByDate = d3.nest()
      .key(function(d) { return d3.time.day(d.date); });

    // Create the crossfilter
    var deathcrossfilter = crossfilter(death);

    // Group by date
    var date = deathcrossfilter.dimension(function(d) {
        return d.date;
    });
    var dates = date.group(d3.time.day);

    // Group by age
    var ageGroup = deathcrossfilter.dimension(function(d) {
        return d.age;
    });
    var ageGroups = ageGroup.group();

        // Group by Pump
    var PumpGroup = deathcrossfilter.dimension(function(d) {
        return d.ClosestPump;
    });
    var PumpGroups = PumpGroup.group();
    
    // Group by gender
    var gender = deathcrossfilter.dimension(function(d) {
        return d.gender;
    });
    var genders = gender.group();
    var list = d3.selectAll(".list")
      .data([DeathList]);
    // Chart elements
    var charts = [
         barChart()
        .dimension(date)
        .group(dates)
        .round(d3.time.day.round)
        .x(d3.time.scale()
        .domain([new Date(1854,7,18), new Date(1854,8,29)])
           .rangeRound([0, 10 * 42]))
        .filter([new Date(1854,7,18), new Date(1854,8,29)]),
        
        barChart()
        .dimension(ageGroup)
        .group(ageGroups)
        .x(d3.scale.ordinal()
           .domain(["0", "1", "2", "3", "4", "5"])
           .rangeRoundBands([0, 120], 0.5)),
        
        barChart()
        .dimension(gender)
        .group(genders)
        .x(d3.scale.ordinal()
           .domain(["male", "female"])
           .rangeRoundBands([0, 80], 0.5)),   
        
        barChart()
        .dimension(PumpGroup)
        .group(PumpGroups)
        .x(d3.scale.ordinal()
           .domain(["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11", "P12", "P13"])
           .rangeRoundBands([0, 300], 0.5)),

    ];
    
    var chart = d3.selectAll('.chart').data(charts).each(function(chart) { chart.on("brush", renderAll).on("brushend", renderAll); });

    renderAll();

    // Renders the specified chart or list.
    function render(method) {
        d3.select(this).call(method);
    }

    // Whenever the brush moves, re-rendering everything.
    function renderAll() {
        chart.each(render);
        list.each(render);
        updatedeath();
    }

    function parseDate(d) {
        return new Date(1854,d.substring(0, 1)-1,d.substring(2, 4));
    }

  window.filter = function(filters) {
    filters.forEach(function(d, i) { charts[i].filter(d); });
    renderAll();
  };

  window.reset = function(i) {
    charts[i].filter(null);
    renderAll();
  };

// update death

function updatedeath(){  
    const deathsByDate = nestByDate.entries(date.top(1000));
    var deathd = [];
    
    deathsByDate.forEach(function(d,i) {
        vals = d.values;
        vals.forEach(function(v,j){
        deathd.push(v);
      });
    });
    d3.selectAll('path[isDeath = true]').remove()
    svgContainer.selectAll("path").data(deathd).enter().append("path").attr("class", "dot").attr("transform", function(d) {
        return "translate(" + scaleX(d.x) + "," + scaleY(d.y) + ")";
    })
    .attr("isDeath", true)
    .attr("Pump", function(d) {
        return d.ClosestPump;
    })
    .style("stroke-width", 0.5)
    .style("stroke", "black")
    .attr("d", function(d, i) {
        if (d.gender === "1")   // female
            return symbolTypes.circle();
        else
            return symbolTypes.diamond();
    })// fill color
    .style("fill", function(d, i) {
        return colourScale(d.age);
    });}
                         
                         
  //update list  
 function DeathList(div) {
    var deathsByDate = nestByDate.entries(date.top(50));

    div.each(function() {
      var date = d3.select(this).selectAll(".date")
          .data(deathsByDate, function(d) { return d.key; });

      date.enter().append("div")
          .attr("class", "date")
        .append("div")
          .attr("class", "day")
        .text(function(d) { return "Total number of death on "+ formatDate(d.values[0].date)+"-1854 :"; });

      date.exit().remove();

      var deaths = date.selectAll(".death")
          .data(function(d) { return d.values; }, function(d) { return d.index; });

      var DeathEnter = deaths.enter().append("div")
          .attr("class", "death");

      DeathEnter.append("div")
          .attr("class", "no-deaths")
          .text(function(d) { return d.num_deaths; });
      deaths.exit().remove();

    });
  }  
 function barChart() {

    if (!barChart.id) barChart.id = 0;

    var margin = {top: 10, right: 10, bottom: 20, left: 10},
        x,
        y = d3.scale.linear().range([100, 0]),
        id = barChart.id++,
        axis = d3.svg.axis().orient("bottom"),
        brush = d3.svg.brush(),
        brushDirty,
        dimension,
        group,
        round;
    
    function chart(div) {
      var cwidth = x.range()[1]*12,
          cheight = y.range()[0];

      y.domain([0, group.top(1)[0].value]);

      div.each(function() {
        var div = d3.select(this),
            g = div.select("g");

        // Create the skeletal chart.
        if (g.empty()) {
          div.select(".title").append("a")
              .attr("href", "javascript:reset(" + id + ")")
              .attr("class", "reset")
              .text("reset")
              .style("display", "none");

          g = div.append("svg")
            .attr("id", function(d){return "cid"+id})
              .attr("width", cwidth + margin.left + margin.right)
              .attr("height", cheight + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          g.append("clipPath")
              .attr("id", "clip-" + id)
            .append("rect")
              .attr("width", cwidth)
              .attr("height", cheight);

          g.selectAll(".bar")
              .data(["background", "foreground"])
            .enter().append("path")
              .attr("class", function(d) { return d + " bar"; })
              .datum(group.all());

          g.selectAll(".foreground.bar")
              .attr("clip-path", "url(#clip-" + id + ")");

          g.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0," + cheight + ")")
              .call(axis);
          
         

          // Initialize the brush component with pretty resize handles.
          
          var gBrush = g.append("g").attr("class", "brush").call(brush);
          
          gBrush.selectAll("rect").attr("height", cheight);
          gBrush.selectAll(".resize").append("path").attr("d", resizePath);}
        
         

        // Only redraw the brush if set externally.
        if (brushDirty) {
          brushDirty = false;
          
          g.selectAll('.brush').call(brush);
          div.select(".title a").style("display", brush.empty() ? "none" : null);
          if (brush.empty()) {
            g.selectAll("#clip-" + id + " rect")
                .attr("x", 0)
                .attr("width", width);
          } else {
            var extent = brush.extent();
            g.selectAll("#clip-" + id + " rect")
                .attr("x", x(extent[0]))
                .attr("width", x(extent[1]) - x(extent[0]));
          }     
        }

        g.selectAll(".bar").attr("d", barPath);
      });

      function barPath(groups) {
        var path = [],
            i = -1,
            n = groups.length,
            d;
        while (++i < n) {
          d = groups[i];
          path.push("M", x(d.key), ",", cheight, "V", y(d.value), "h9V", cheight);
        }
        return path.join("");
      }

      function resizePath(d) {
        var e = +(d.type ==='e'),
            x = e ? 1 : -1,
            y = cheight / 3;
        return "M" + (.5 * x) + "," + y
            + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
            + "V" + (2 * y - 6)
            + "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
            + "Z"
            + "M" + (2.5 * x) + "," + (y + 8)
            + "V" + (2 * y - 8)
            + "M" + (4.5 * x) + "," + (y + 8)
            + "V" + (2 * y - 8);
      }
    }

    brush.on("brushstart.chart", function() {
      var div = d3.select(this.parentNode.parentNode.parentNode);
      div.select(".title a").style("display", null);
    });

    brush.on("brush.chart", function() {
      var g = d3.select(this.parentNode),
          extent = brush.extent();

      if (round) g.select(".brush")
          .call(brush.extent(extent = extent.map(round)))
        .selectAll(".resize")
          .style("display", null);
      g.select("#clip-" + id + " rect")
          .attr("x", x(extent[0]))
          .attr("width", x(extent[1]) - x(extent[0]));
      dimension.filterRange(extent);
    });

    brush.on("brushend.chart", function() {
      if (brush.empty()) {
        var div = d3.select(this.parentNode.parentNode.parentNode);
        div.select(".title a").style("display", "none");
        div.select("#clip-" + id + " rect").attr("x", null).attr("width", "100%");
        dimension.filterAll();
      }
    });

    chart.margin = function(_) {
      if (!arguments.length) return margin;
      margin = _;
      return chart;
    };

    chart.x = function(_) {
      if (!arguments.length) return x;
      x = _;
      axis.scale(x);
      brush.x(x);
      return chart;
    };

    chart.y = function(_) {
      if (!arguments.length) return y;
      y = _;
      return chart;
    };

    chart.dimension = function(_) {
      if (!arguments.length) return dimension;
      dimension = _;
      return chart;
    };

    chart.filter = function(_) {
      if (_) {
        brush.extent(_);
        dimension.filterRange(_);
      } else {
        brush.clear();
        dimension.filterAll();
      }
      brushDirty = true;
      return chart;
    };

    chart.group = function(_) {
      if (!arguments.length) return group;
      group = _;
      return chart;
    };

    chart.round = function(_) {
      if (!arguments.length) return round;
      round = _;
      return chart;
    };

    return d3.rebind(chart, brush, "on");
  }
});




//pan and zoom function
function zoomed() {
    svgContainer.attr("transform", "translate(" + zoom.translate() + ")" + "scale(" + zoom.scale() + ")");
}

function dragstarted(d) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("dragging", true);
}

function dragged(d) {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
    d3.select(this).classed("dragging", false);
}
