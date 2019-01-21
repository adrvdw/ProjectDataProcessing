function drawBubbleChart (symbol_dict, date[0]) {

    console.log(date[0])

    width = 960
    height = 960

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-20,100])
        .html(function(d) {
            // console.log(d)
            return "<strong>Currency: </strong><span class='details'>" +    d.data[4] + "<br></span>" + "<strong>Market value: </strong><span class='details'>" + d.data[1] + "<br></span>" + "<strong>current price: </strong><span class='details'>" + d.data[2] + "<br></span>" + "<strong>Ranking: </strong><span class='details'>" + d.data[3]+"<br></span>";
        })

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    var color = d3.scaleOrdinal()
        .domain(symbol_dict)
        .range(['#fbb4ae','#b3cde3','#ccebc5','#decbe4','#fed9a6',
        '#ffe9a8','#b9bfe3','#fddaec','#cccccc']);

    date = [];
    market = [];

    for (i in symbol_dict){
        for (j in symbol_dict[i].dates){
            date.push(j)
            if (j == dateFormat){
                console.log(4)
            }

        }

    }
    console.log(date)

    var data = {'children':market}

    var bubble = d3.pack()
        .size([width-150, height])
        .padding(1.5);

    var svg = d3.select("body")
        .append("svg")
        .attr('transform', 'translate(150,30)')
        .attr("width", width)
        .attr("height", height)
        .attr("class", "bubble");

    svg.call(tip)


    var nodes = d3.hierarchy(data)
        .sum(function(d){
            return d[1]})





}