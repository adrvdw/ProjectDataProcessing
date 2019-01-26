function drawLinechartChart(symbol_dict, currency, bit_word) {

        blueDates = [];
        for (l in symbol_dict[bit_word].dates){
            blueDates.push(symbol_dict[bit_word].dates[l])
        };

        redDates = [];

        for (i in symbol_dict[bit_word].dates){
            redDates.push(symbol_dict[bit_word].dates[i])
        };

        blueDates = blueDates;

        redDates = redDates;

        // set the dimensions and margins of the graph
        var margin = {top: 60, right: 40, bottom: 30, left: 50},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

        // parse the date / time
        var parseTime = d3.timeParse("%d-%b-%y");

        // set the ranges
        var x = d3.scaleTime().range([0, width]);
        var y0 = d3.scaleLinear().range([height, 0]);
        var y1 = d3.scaleLinear().range([height, 0]);

        // define the 1st line
        var valueline = d3.line()
                .x(function (d) {
                    return x(d.date);
                })
                .y(function (d) {
                    return y0(d.close);
                });


        // define the 2nd line
        var valueline2 = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y1(d.close);
            });


        var svg = d3.select("#linechart")
            .attr("class", "linechart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        // Scale the range of the data
        x.domain(d3.extent(blueDates, function (d) {
            return d.date;
        }));
        y0.domain([0, d3.max(blueDates, function (d) {
            return Math.max(d.close);
        })]);
        y1.domain([0, d3.max(redDates, function (d) {
            return Math.max(d.open);
        })]);

        // Add the valueline path.
        svg.append("path")
                .data([blueDates])
                .attr("class", "lineBlue")
                .attr("d", valueline);

        // Add the valueline2 path.
        svg.append("path")
                .data([redDates])
                .attr("class", "lineRed")
                .style("stroke", "red")
                .attr("d", valueline2);


        // Add the X Axis
        svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .attr("class", "x axis")
                .call(d3.axisBottom(x));


        // Add the Y0 Axis
        svg.append("g")
                .attr("class", "axisSteelBlue")
                .call(d3.axisLeft(y0));

        // Add the Y1 Axis
        svg.append("g")
                .attr("class", "axisRed")
                .attr("transform", "translate( " + width + ", 0 )")
                .call(d3.axisRight(y1));

        var parseTime1 = d3.timeParse("%Y");
        bisectDate = d3.bisector(function(d) { return d.date; }).left;



        var focus = svg.append("g")
                .attr("class", "focus")
                .style("display", "none");


        focus.append("line")
                .attr("class", "x-hover-line hover-line")
                .attr("y1", 0)
                .attr("y2", height);

        focus.append("line")
                .attr("class", "y-hover-line hover-line")
                .attr("x1", width)
                .attr("x2", width);

        focus.append("circle")
                .attr("r", 7.5)
                .style("fill", "red");

        focus.append("circle")
                .attr("r", 7.5)
                .style("fill", "blue");


        focus.append("text")
                .attr("x", 15)
                .attr("dy", ".31em");

        focus.append("text")
                .attr("x", 15)
                .attr("dy", ".31em");

        svg.append("rect")
                .attr("transform", "translate(" + 0 + "," + 0 + ")")
                .attr("class", "overlay")
                .attr("width", width)
                .attr("height", height)
                .attr("fill", "none")
                .attr("pointer-events", "all")
                .on("mouseover", function() { focus.style("display", null); })
                .on("mouseout", function() { focus.style("display", "none"); })
                .on("mousemove", mousemove1)
                .on("mousemove", mousemove2);


        var dropdownChange1 = function () {
            var newCereal1 = d3.select(this).property('value');
        };

        var dropdownChange2 = function () {
            var newCereal2 = d3.select(this).property('value');
        };

        var dropDownBlue = d3.select("#vis-container1")
                .insert("select", "svg")
                .on("change", dropdownChange1);

        var dropDownRed = d3.select("#vis-container2")
                .insert("select", "svg")
                .on("change", dropdownChange2);


        var cereals = currency

        dropDownBlue.selectAll("option")
                .data(cereals)
                .enter().append("option")
                .attr("value", function (d) {
                    return d;
                })
                .text(function (d) {
                    return d;
                })
                .on("click", function (d){
                    updateBlue(symbol_dict, currency, d)
                });

        dropDownRed.selectAll("option")
                .data(cereals)
                .enter().append("option")
                .attr("value", function (d) {
                    return d;
                })
                .text(function (d) {
                    return d;
                })
                .on("click", function (d){
                    updateRed(symbol_dict, currency, d)
                });




        function updateBlue(symbol_dict, currency, d){

                bit_dates = [];
                var word = d;
                for (l in symbol_dict[d].dates){
                    bit_dates.push(symbol_dict[d].dates[l])
                };

                x.domain(d3.extent(bit_dates, function (d) {
                    return d.date;
                }));
                y0.domain([0, d3.max(bit_dates, function (d) {
                    return Math.max(d.close);
                })]);

                var svg2 = d3.select("body").transition()

                svg2.select(".axisSteelBlue")
                        .duration(200)
                        .call(d3.axisLeft(y0));

                var line = svg2.selectAll('.lineBlue');

                line.duration(200)
                        .attr('d',valueline(bit_dates));
            }

        function updateRed(symbol_dict, currency, d){

                bit_dates = [];
                var word = d;
                for (l in symbol_dict[d].dates){
                    bit_dates.push(symbol_dict[d].dates[l])
                };

                x.domain(d3.extent(bit_dates, function (d) {
                    return d.date;
                }));
                y1.domain([0, d3.max(bit_dates, function (d) {
                    return Math.max(d.open);
                })]);

                var svg2 = d3.select("body").transition()

                svg2.select(".axisRed")
                        .duration(200)
                        .call(d3.axisRight(y1));


                var line = svg2.selectAll('.lineRed');

                line.duration(200)
                        .attr('d',valueline2(bit_dates));
        };

        function mousemove1() {

                var x0 = x.invert(d3.mouse(this)[0]),

                i = bisectDate(blueDates, x0, 1),
                    d0 = blueDates[i - 1],
                    d1 = blueDates[i],
                    d = x0 - d0.date > d1.date - x0 ? d1 : d0;
                focus.attr("transform", "translate(" + x(d.date) + "," + y0(d.high) + ")");
                focus.select("text").text(function() { return d.high; })
                focus.select(".x-hover-line").attr("y2", height - y0(d.high));
                focus.select(".y-hover-line").attr("x2", width + width);

            };

        function mousemove2() {

            var x1 = x.invert(d3.mouse(this)[0]),

                i = bisectDate(redDates, x1, 1),
                d0 = redDates[i - 1],
                d1 = redDates[i],
                d = x1 - d0.date > d1.date - x1 ? d1 : d0;
            focus.attr("transform", "translate(" + x(d.date) + "," + y1(d.high) + ")");
            focus.select("text").text(function() { return d.high; })
            focus.select(".x-hover-line").attr("y2", height - y1(d.high));
            focus.select(".y-hover-line").attr("x2", width + width);

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
                }
            }
        }
    };











