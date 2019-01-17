window.onload = function(){

    function drawChart(symbol_dict) {

            bit_dates = []
            for (l in symbol_dict.Bitcoin.dates){
                bit_dates.push(symbol_dict.Bitcoin.dates[l])
            };

            xrp_dates = []

            for (i in symbol_dict.XRP.dates){
                xrp_dates.push(symbol_dict.XRP.dates[i])
            };


            data_bit = bit_dates

            data_xrp = xrp_dates



        // set the dimensions and margins of the graph
             var margin = {top: 20, right: 40, bottom: 30, left: 50},
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


            var svg = d3.select("body").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");



            // Scale the range of the data
            x.domain(d3.extent(data_bit, function (d) {
                    return d.date;
                    }));
                    y0.domain([0, d3.max(data_bit, function (d) {
                        return Math.max(d.close);
                    })]);
                    y1.domain([0, d3.max(data_xrp, function (d) {
                        return Math.max(d.open);
                    })]);

            // Add the valueline path.
            svg.append("path")
                    .data([data_bit])
                    .attr("class", "line")
                    .attr("d", valueline)
                    // .on("mouseover", function() { focus.style("display", null); })
                    // .on("mouseout", function() { focus.style("display", "none"); })
                    // .on("mousemove", mousemove);


    // Add the valueline2 path.
            svg.append("path")
                    .data([data_xrp])
                    .attr("class", "line")
                    .style("stroke", "red")
                    .attr("d", valueline2)
                    // .on("mouseover", function() { focus.style("display", null); })
                    // .on("mouseout", function() { focus.style("display", "none"); })
                    // .on("mousemove", mousemove);


// Add the X Axis
            svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
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

        console.log(bit_dates)


        var parseTime1 = d3.timeParse("%Y")
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
                .attr("r", 7.5);

            focus.append("text")
                .attr("x", 15)
                .attr("dy", ".31em");

            svg.append("rect")
                .attr("fill", "white")

                .attr("transform", "translate(" + 0 + "," + 0 + ")")
                .attr("class", "overlay")
                .attr("width", width)
                .attr("height", height)
                .on("mouseover", function() { focus.style("display", null); })
                .on("mouseout", function() { focus.style("display", "none"); })
                .on("mousemove", mousemove);


            function mousemove() {
                console.log(3)

                var x0 = x.invert(d3.mouse(this)[0]),

                i = bisectDate(bit_dates, x0, 1),
                    d0 = bit_dates[i - 1],
                    d1 = bit_dates[i],
                    d = x0 - d0.date > d1.date - x0 ? d1 : d0;
                focus.attr("transform", "translate(" + x(d.date) + "," + y0(d.high) + ")");
                focus.select("text").text(function() { return d.high; });
                focus.select(".x-hover-line").attr("y2", height - y0(d.high));
                focus.select(".y-hover-line").attr("x2", width + width);
        }
        };









    $.getJSON('data.json', function(data){
        //d3.json('data.json', function(data){

        var symbol_dict = {};
        var symbol = [];
        var name = [];
        var date = [];
        var open = [];
        var high = [];
        var low = [];
        var close = [];
        var volume = [];

        for (i in data){

            symbol.push(data[i].symbol)
            name.push(data[i].name)
            date.push(data[i].date)
            open.push(data[i].open)
            high.push(data[i].high)
            low.push(data[i].low)
            close.push(data[i].close)
            volume.push(data[i].volume)

        }

        for (i in data){

            symbol_dict[name[i]] = {'dates':{}};
            var dateFormat = d3.timeParse("%Y-%m-%d");
        }
        for (j in symbol_dict){

            for (k in data){
                if (j == data[k].name){

                    symbol_dict[j].dates[data[k].date] = {'symbol': symbol[k],
                        'open': open[k],'high': high[k],
                        'low': low[k],'close': close[k],
                        'volume': volume[k], 'date': dateFormat(date[k])}
                }
            }
        }


        drawChart(symbol_dict);


    });



};
