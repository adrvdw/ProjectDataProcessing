function drawSlider (startDate, endDate, symbol_dict){

    var formatDateIntoYear = d3.timeFormat("%Y");
    var formatDate = d3.timeFormat("%d %b %Y");

    var margin = {top:50, right:50, bottom:50, left:50},
        width = 960 - margin.left - margin.right,
        height = 250;

    var svg = d3.select("#vis")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top);

    var moving = false;
    var currentValue = 0;
    var targetValue = width;


    var x = d3.scaleTime()
        .domain([startDate, endDate])
        .range([0, targetValue])
        .clamp(true);

    var slider = d3.select("#slider")
        .attr("class", "slider")
        .attr("transform", "translate(" + margin.left + "," + height/5 + ")");

    slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", function() {
                currentValue = d3.event.x;
                update(x.invert(currentValue));
            })
        );

    slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 18 + ")")
        .selectAll("text")
        .data(x.ticks(10))
        .enter()
        .append("text")
        .attr("x", x)
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .text(function(d) { return formatDateIntoYear(d); });

    var handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 9);

    var label = slider.append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .text(formatDate(startDate))
        .attr("transform", "translate(0," + (-25) + ")")


    function step() {
        update(x.invert(currentValue));
        currentValue = currentValue + (targetValue/151);
        if (currentValue > targetValue) {
            moving = false;
            currentValue = 0;
        }
    }

    function update(h) {
        d3.selectAll('.node').remove()
        // update position and text of label according to slider scale
        handle.attr("cx", x(h));
        label
            .attr("x", x(h))
            .text(formatDate(h));

        var parseDate = d3.timeFormat("%Y-%m-%d")
        h = parseDate(h)
        console.log(symbol_dict)

        drawBubbleChart(symbol_dict, h)

        }

    }


