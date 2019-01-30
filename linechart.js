function drawLinechartChart(symbol_dict, currency, bit_word) {

    blueDates = [];
    for (l in symbol_dict[bit_word].dates) {
        blueDates.push(symbol_dict[bit_word].dates[l])
    };

    redDates = [];

    for (i in symbol_dict[bit_word].dates) {
        redDates.push(symbol_dict[bit_word].dates[i])
    };

    // set the dimensions and margins of the graph
    var margin = {
            top: 60,
            right: 40,
            bottom: 30,
            left: 50
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // set date format
    var parseTime = d3.timeParse("%d-%b-%y");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y0 = d3.scaleLinear().range([height, 0]);
    var y1 = d3.scaleLinear().range([height, 0]);

    // define the blue line
    var valuelineBlue = d3.line()
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y0(d.close);
        });

    // define the red line
    var valuelineRed = d3.line()
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y1(d.close);
        });


    var svg = d3.select("#linechartchart").append("svg")
        .attr("class", "linechart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");



    // Scale the range of the data
    x.domain(d3.extent(redDates, function(d) {
        return d.date;
    }));
    y0.domain([0, d3.max(blueDates, function(d) {
        return Math.max(d.close);
    })]);
    y1.domain([0, d3.max(redDates, function(d) {
        return Math.max(d.open);
    })]);

    // add the blue path
    svg.append("path")
        .data([blueDates])
        .attr("class", "lineBlue")
        .attr("d", valuelineBlue);

    // add the red path
    svg.append("path")
        .data([redDates])
        .attr("class", "lineRed")
        .style("stroke", "red")
        .attr("d", valuelineRed);


    // add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x axis")
        .call(d3.axisBottom(x));

    // add the Y0 Axis
    svg.append("g")
        .attr("class", "axisSteelBlue")
        .call(d3.axisLeft(y0));

    // add the Y1 Axis
    svg.append("g")
        .attr("class", "axisRed")
        .attr("transform", "translate( " + width + ", 0 )")
        .call(d3.axisRight(y1));

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 50 - margin.left)
        .attr("x", -30)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Value ($)");

    bisectDate = d3.bisector(function(d) {
        return d.date;
    }).left;

    // create variable focus for the blue line
    var focusBlue = svg.append("g")
        .attr("class", "focusBlue")
        .style("display", "none");

    focusBlue.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);

    focusBlue.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", width)
        .attr("x2", width);

    focusBlue.append("circle")
        .attr("r", 5)
        .style("fill", "blue");


    focusBlue.append("text")
        .attr("x", 15)
        .attr("dy", ".31em");

    // create variable focus for the red line
    var focusRed = svg.append("g")
        .attr("class", "focusRed")
        .style("display", "none");

    focusRed.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);

    focusRed.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", width)
        .attr("x2", width);

    focusRed.append("circle")
        .attr("r", 5)
        .style("fill", "red")



    focusRed.append("text")
        .attr("x", 15)
        .attr("dy", ".31em");



    svg.append("rect")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("mouseover", function() {
            focusRed.style("display", null);
            focusBlue.style("display", null)
        })
        .on("mouseout", function() {
            focusRed.style("display", "none");
            focusRed.style("display", "none")
        })
        .on("mousemove", mousemove1);


    var dropdownChange1 = function() {
        d3.select(this).property('value');
    };

    var dropdownChange2 = function() {
        d3.select(this).property('value');
    };

    var dropDownBlue = d3.select("#vis-container1")
        .insert("select", "svg")
        .on("change", dropdownChange1);

    var dropDownRed = d3.select("#vis-container2")
        .insert("select", "svg")
        .on("change", dropdownChange2);



    dropDownBlue.selectAll("option")
        .data(currency)
        .enter().append("option")
        .attr("value", function(d) {
            return d;
        })
        .text(function(d) {
            return d;
        })
        .on("click", function(d) {
            updateBlue(symbol_dict, currency, d, redDates)
        });

    dropDownRed.selectAll("option")
        .data(currency)
        .enter().append("option")
        .attr("value", function(d) {
            return d;
        })
        .text(function(d) {
            return d;
        })
        .on("click", function(d) {
            updateRed(symbol_dict, currency, d, blueDates)
        });


    svg.on("click", function() {
        var x2 = x.invert(d3.mouse(this)[0]),

            i = bisectDate(blueDates, x2, 1),
            d6 = blueDates[i - 1],
            d7 = blueDates[i],
            d = x2 - d6.date > d7.date - x2 ? d7 : d6;
            d.date = d3.timeFormat("%Y-%m-%d")(d.date)

            drawBubbleChart(symbol_dict, d.date)
    })


    function updateBlue(symbol_dict, currency, d, redDates) {

        blueDates = [];
        var word = d;
        for (l in symbol_dict[word].dates) {
            blueDates.push(symbol_dict[word].dates[l])
        };


        redDatesMin = (d3.min(redDates, function(d) {
            return d.date;
        }));
        blueDatesMin = (d3.min(blueDates, function(d) {
            return d.date;
        }));
        redBlueMax = (d3.max(redDates, function(d) {
            return d.date;
        }));
        redBlueMin = (d3.min([redDatesMin, blueDatesMin]))

        // set x axis to earliest date
        x.domain([redBlueMin, redBlueMax]);
        y0.domain([0, d3.max(blueDates, function(d) {
            return Math.max(d.close);
        })]);
        y1.domain([0, d3.max(redDates, function(d) {
            return Math.max(d.open);
        })]);

        var svg2 = d3.select("body").transition();

        svg2.select(".axisSteelBlue")
            .duration(200)
            .call(d3.axisLeft(y0));

        svg2.select(".x.axis")
            .duration(200)
            .call(d3.axisBottom(x));

        var line = svg2.selectAll('.lineBlue');

        line.duration(200)
            .attr('d', valuelineBlue(blueDates));
    }

    function updateRed(symbol_dict, currency, d, blueDates) {

        redDates = [];
        var word = d;
        for (l in symbol_dict[word].dates) {
            redDates.push(symbol_dict[word].dates[l])
        };

        redDatesMin = (d3.min(redDates, function(d) {
            return d.date;
        }));
        blueDatesMin = (d3.min(blueDates, function(d) {
            return d.date;
        }));
        redBlueMax = (d3.max(redDates, function(d) {
            return d.date;
        }));

        redBlueMin = (d3.min([redDatesMin, blueDatesMin]));

        // set x axis to earliest date
        x.domain([redBlueMin, redBlueMax]);
        y0.domain([0, d3.max(blueDates, function(d) {
            return Math.max(d.close);
        })]);
        y1.domain([0, d3.max(redDates, function(d) {
            return Math.max(d.open);
        })]);

        var svg2 = d3.select("body").transition();

        svg2.select(".axisRed")
            .duration(200)
            .call(d3.axisRight(y1));

        svg2.select(".x.axis")
            .duration(200)
            .call(d3.axisBottom(x));

        var line = svg2.selectAll('.lineRed');

        line.duration(200)
            .attr('d', valuelineRed(redDates));
    };

    function mousemove1() {

        var x0 = x.invert(d3.mouse(this)[0]),

            i = bisectDate(blueDates, x0, 1),
            d0 = blueDates[i - 1],
            d1 = blueDates[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;

        focusBlue.attr("transform", "translate(" + x(d.date) + "," + y0(d.high) + ")");
        focusBlue.select("text").text(function() {
            return d.high;
        });
        focusBlue.select(".x-hover-line").attr("y2", height - y0(d.high));
        focusBlue.select(".y-hover-line").attr("x2", width + width);

        var x1 = x.invert(d3.mouse(this)[0]),

            j = bisectDate(redDates, x1, 1),
            d4 = redDates[j - 1],
            d2 = redDates[j],
            d5 = x1 - d4.date > d2.date - x1 ? d2 : d4;

        focusRed.attr("transform", "translate(" + x(d5.date) + "," + y1(d5.high) + ")");
        focusRed.select("text").text(function() {
            return d5.high;
        });
        focusRed.select(".x-hover-line").attr("y2", height - y1(d5.high));
        focusRed.select(".y-hover-line").attr("x2", width + width);
    };
};

function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
};

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            };
        };
    };
};