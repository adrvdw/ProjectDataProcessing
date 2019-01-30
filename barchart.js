/* barchart.js
*
* Ad Ruigrok van der Werve
* 11323760
* Programmerproject
*
* Barchart js file
*/
window.onload = function(){


        function drawChart(symbol_dict) {
            console.log(symbol_dict)

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
            var margin = {top: 60, right: 40, bottom: 30, left: 50},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;


            var parseTime = d3.timeParse("%d-%b-%y");

            // set the ranges
            var x = d3.scaleTime().range([0, width]);
            var y0 = d3.scaleLinear().range([height, 0]);
            var y1 = d3.scaleLinear().range([height, 0]);

            var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            x.domain(d3.extent(data_bit, function (d) {
                return d.date;
            }));
            y0.domain([0, d3.max(data_bit, function (d) {
                return Math.max(d.close);
            })]);
            y1.domain([0, d3.max(data_xrp, function (d) {
                return Math.max(d.open);
            })]);

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));


            svg.append("g")
                .attr("class", "axisSteelBlue")
                .call(d3.axisLeft(y0));

            svg.append("g")
                .attr("class", "axisRed")
                .attr("transform", "translate( " + width + ", 0 )")
                .call(d3.axisRight(y1));


            console.log(bit_dates)

            svg.selectAll(".bar")
                    .data(bit_dates)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d) {
                        return x(d.date);
                    })
                    .attr("width", x.bandwidth())
                    .attr("y", function (d) {
                        return y(d.high);
                    })
                    .attr("height", function (d) {
                        return height - y(d.high);
                    });

        }




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




