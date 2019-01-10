window.onload = function(){

		function drawChart(symbol_dict) {

				// const months = {0 : 'Jan', 1 : 'Feb', 2 : 'Mar', 3 : 'Apr', 4 : 'May', 5 : 'Jun', 6 : 'Jul', 7 : 'Aug', 8 : 'Sep', 9 : 'Oct', 10 : 'Nov', 11 : 'Dec'}
				var dateFormat = d3.timeParse("%Y-%m-%d");
				for (i in symbol_dict){
						for (j in symbol_dict[i].dates){
							date_format = dateFormat(j)
							console.log(date_format);
						}
				}

				const margin = {top: 15, right: 65, bottom: 205, left: 50},
				w = 1000 - margin.left - margin.right,
				h = 625 - margin.top - margin.bottom;

				var svg = d3.select("#container")
								.attr("width", w + margin.left + margin.right)
								.attr("height", h + margin.top + margin.bottom)
								.append("g")
								.attr("transform", "translate(" +margin.left+ "," +margin.top+ ")");

				svg.append("rect")
								.attr("id","rect")
								.attr("width", w)
								.attr("height", h)
								.style("fill", "none")
								.style("pointer-events", "all")
								.attr("clip-path", "url(#clip)")




			};




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

			}
			for (j in symbol_dict){

					for (k in data){

							if (j == data[k].name){

									symbol_dict[j].dates[data[k].date] = {'symbol': symbol[k],
									'open': open[k],'high': high[k],
									'low': low[k],'close': close[k],
									'volume': volume[k]}
							}
					}
			}
			drawChart(symbol_dict);


		});



		};
