function drawSlider(startDate, endDate, symbol_dict) {

    // set date format
    var formatDateIntoYear = d3.timeFormat("%Y");
    var formatDate = d3.timeFormat("%d %b %Y");

    // set margins
    var margin = {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
        },
        width = 1060,
        height = 200;

    var moving = false;
    var currentValue = 0;
    var targetValue = width;

    var x = d3.scaleTime()
        .domain([startDate, endDate])
        .range([0, targetValue])
        .clamp(true);

    // create slider
    var slider = d3.select("#slider").append("svg")
        .attr("class", "slider")
        .attr("width", width)
        .attr("transform", "translate(" + margin.left + "," + height / 4 + ")");

    slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
        .select(function() {
            return this.parentNode.appendChild(this.cloneNode(true));
        })
        .attr("class", "track-inset")
        .select(function() {
            return this.parentNode.appendChild(this.cloneNode(true));
        })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start.interrupt", function() {
                slider.interrupt();
            })
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
        .text(function(d) {
            return formatDateIntoYear(d);
        });

    var handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 9);

    var label = slider.append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .text(formatDate(startDate))
        .attr("transform", "translate(35," + (50) + ")")

    function update(h) {
        // update position and text of label according to slider scale
        handle.attr("cx", x(h));
        label
            .attr("x", x(h))
            .text(formatDate(h));

        var parseDate = d3.timeFormat("%Y-%m-%d")
        h = parseDate(h)

        drawBubbleChart(symbol_dict, h)

    }

}