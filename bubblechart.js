function drawBubbleChart (symbol_dict, datum) {

    // console.log(date[0])

    diameter = 600

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10,0])
        .html(function(d) {
            console.log(d.data)
            return "<strong>Name: </strong><span class='details'>" +    d.data[3] + "<br></span>" + "<strong>Open: </strong><span class='details'>" +    d.data[4] + "<br></span>" + "<strong>Close: </strong><span class='details'>" +    d.data[5]  + "<br></span>" + "<strong>High: </strong><span class='details'>" +    d.data[6]  + "<br></span>" + "<strong>Low: </strong><span class='details'>" +    d.data[7]  + "<br></span>"  ;
        })

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    var color = d3.scaleOrdinal()
        .domain(symbol_dict)
        .range(['#fbb4ae','#b3cde3','#ccebc5','#decbe4','#fed9a6',
        '#ffe9a8','#b9bfe3','#fddaec','#cccccc']);

    date_list = [];
    crypto_list = [];

    for (i in symbol_dict) {
        for (j in symbol_dict[i].dates) {
            date_list.push(j)
            if (j == datum) {
                crypto_list.push([symbol_dict[i].dates[j].symbol, symbol_dict[i].dates[j].market, symbol_dict[i].dates[j].date, i, symbol_dict[i].dates[j].open, symbol_dict[i].dates[j].close, symbol_dict[i].dates[j].high, symbol_dict[i].dates[j].low])
            }
        }
    }


    var data = {'children':crypto_list}

    var bubble = d3.pack(data)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select("#bubblechart")
        .attr('transform', 'translate(30,30)')
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    svg.call(tip)


    var nodes = d3.hierarchy(data)
        .sum(function(d){
            return d[1]})


    var node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d){
            return  !d.children
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
        .style("fill", function(d,i) {
            return color(i);
        })
        .on('mouseover',function(d){
            tip.show(d);

            d3.select(this)
                .style("stroke","white")
                .style("stroke-width",3);
        })
        .on('mouseout', function(d){
            tip.hide(d);

            d3.select(this)
                .style("stroke","white")
                .style("stroke-width",0.3);


        })
        .on('click', function(d){
                updateCandle(symbol_dict, d, d.data[3])
        });



    //
    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data[0].substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "white");
        // .on('mouseover',function(d){
        //     tip.show(d);
        // })
        // .on('mouseout', function(d){
        //     tip.hide(d);
        // });

    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data[1];
        })
        .attr("font-family",  "Gill Sans", "Gill Sans MT")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "white");
        // .on('mouseover',function(d){
        //     tip.show(d);
        //
        // })
        // .on('mouseout', function(d){
        //     tip.hide(d);
        //
        // });




}