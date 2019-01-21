
window.onload = function(){


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



        // console.log(data)
        for (j in symbol_dict){

            for (k in data){
                if (j == data[k].name){

                    symbol_dict[j].dates[data[k].date] = {'symbol': symbol[k], 'name': name[k],
                        'open': open[k],'high': high[k],
                        'low': low[k],'close': close[k],
                        'volume': volume[k], 'date': dateFormat(date[k])}
                }
            }
        }

        drawBubbleChart(symbol_dict, date[0])
        drawCandlestickChart(symbol_dict, 'Bitcoin')
        drawLinechartChart(symbol_dict)




    });

}



