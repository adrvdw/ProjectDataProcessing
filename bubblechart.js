function drawBubbleChart(symbol_dict, datum) {

    // set the initial diameter
    diameter = 530

    // create tip with data to show, e.g. name, open, etc.
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .style("opacity", 0)
        .offset([-10, 0])
        .html(function(d) {
            return "<strong>Name: </strong><span class='details'>" + d.data[3] + "<br></span>" + "<strong>Open: </strong><span class='details'>" + d.data[4] + "<br></span>" + "<strong>Close: </strong><span class='details'>" + d.data[5] + "<br></span>" + "<strong>High: </strong><span class='details'>" + d.data[6] + "<br></span>" + "<strong>Low: </strong><span class='details'>" + d.data[7] + "<br></span>";
        });

    // set color ranges of the bubbles
    var color = d3.scaleOrdinal()
        .domain(symbol_dict)
        .range(['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6',
            '#ffe9a8', '#b9bfe3', '#fddaec', '#cccccc'
        ]);

    date_list = [];
    crypto_list = [];

    for (i in symbol_dict) {
        for (j in symbol_dict[i].dates) {
            date_list.push(j)
            if (j == datum) {
                crypto_list.push([symbol_dict[i].dates[j].symbol, symbol_dict[i].dates[j].market,
                    symbol_dict[i].dates[j].date, i, symbol_dict[i].dates[j].open, symbol_dict[i].dates[j].close,
                    symbol_dict[i].dates[j].high, symbol_dict[i].dates[j].low])
            };
        };
    };




    var data = {
        'children': crypto_list
    };

    var bubble = d3.pack(data)
        .size([diameter, diameter])
        .padding(1.5);

    // create svg
    var svg = d3.select("#bubble")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("id", "bubble");

    svg.selectAll(".node").remove()


    svg.call(tip)

    var nodes = d3.hierarchy(data)
        .sum(function(d) {
            return d[1]
        })

    // create bubbles
    var node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d) {
            return !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function(d) {
            return d.data[0] + ": " + d.data[1]
        });

    node.append("circle")
        .attr("r", function(d) {
            return d.r;
        })
        .style("fill", function(d, i) {
            return color(i);
        })
        .on('mouseover', function(d) {
            tip.show(d);

            d3.select(this)
                .style("stroke", "white")
                .style("stroke-width", 3);
        })
        .on('mouseout', function(d) {
            tip.hide(d);

            d3.select(this)
                .style("stroke", "white")
                .style("stroke-width", 0.3);


        })
        .on('click', function(d) {
            updateCandle(symbol_dict, d, d.data[3])
            dropdownChange(d.data[3])

        });

    // append text (market volume and name) to bubbles
    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data[0].substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d) {
            return d.r / 5;
        })
        .attr("fill", "white");

    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data[1];
        })
        .attr("font-family", "Gill Sans", "Gill Sans MT")
        .attr("font-size", function(d) {
            return d.r / 5;
        })
        .attr("fill", "white");
};