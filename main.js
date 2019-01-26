
window.onload = function(){


    d3.select("body").append("svg")
        .attr("id", "bubblechart")
    d3.select("body").append("svg")
        .attr("id", "candlestick")
    d3.select("body").append("svg")
        .attr("id", "linechart")
    d3.select("body").append("svg")
        .attr("id", "slider")
    d3.select("body").append("svg")
        .attr("id", "vis")
    d3.select("body").append("svg")
        .attr("id", "vis-container1")
    d3.select("body").append("svg")
        .attr("id", "vis-container2")



    <!--<div id="vis"></div>-->
        <!--<div id='vis-container'></div>-->
        <!--<div id='vis-container1'></div>-->
        <!--<div id='vis-container2'></div>



    $.getJSON('data.json', function(data){

        var symbol_dict = {};
        var symbol = [];
        var name = [];
        var date = [];
        var open = [];
        var high = [];
        var low = [];
        var close = [];
        var volume = [];
        var market = [];


        for (i in data){

            symbol.push(data[i].symbol)
            name.push(data[i].name)
            date.push(data[i].date)
            open.push(data[i].open)
            high.push(data[i].high)
            low.push(data[i].low)
            close.push(data[i].close)
            volume.push(data[i].volume)
            market.push(data[i].market)


        }
        var uniquename = Array.from(new Set(name));

        for (i in data){

            symbol_dict[name[i]] = {'dates':{}};
            var dateFormat = d3.timeParse("%Y-%m-%d");
        }



        // console.log(data)
        for (j in symbol_dict){


            for (k in data){
                if (j == data[k].name){

                    symbol_dict[j].dates[data[k].date] = {'symbol': symbol[k], 'name': name[k],
                        'open': open[k],'high': high[k],
                        'low': low[k],'close': close[k],
                        'volume': volume[k], 'date': dateFormat(date[k]),
                        'market': market[k]}
                }
            }
        }
        var begin = new Date (date[0])
        var end = new Date (date[date.length-1])

        drawBubbleChart(symbol_dict, date[0])
        drawSlider(begin, end, symbol_dict)
        drawCandlestickChart(symbol_dict,uniquename , uniquename[0])
        makeDropdownCandlestick(symbol_dict,uniquename , uniquename[0])
        drawLinechartChart(symbol_dict, uniquename, 'Bitcoin')





    });

}



