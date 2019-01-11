window.onload = function(){

		function drawChart(symbol_dict) {
				var list_timestamps = [];
				var list_date_format = [];
				const months = {0 : 'Jan', 1 : 'Feb', 2 : 'Mar', 3 : 'Apr', 4 : 'May', 5 : 'Jun', 6 : 'Jul', 7 : 'Aug', 8 : 'Sep', 9 : 'Oct', 10 : 'Nov', 11 : 'Dec'}
				var dateFormat = d3.timeParse("%Y-%m-%d");
				for (i in symbol_dict){
						for (j in symbol_dict[i].dates){
							date_format = dateFormat(j)
							list_date_format.push(date_format)
							var timestamp = date_format.getTime();
							list_timestamps.push(timestamp)
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

				var xmin = Math.min.apply(null, list_timestamps);

				var xmax = Math.max.apply(null, list_date_format);
				var xScale = d3.scaleLinear().domain([-1, list_date_format.length])
								.range([0, w])
				var xDateScale = d3.scaleQuantize().domain([0, list_date_format.length]).range(list_date_format)
				let xBand = d3.scaleBand().domain(d3.range(-1, list_date_format.length)).range([0, w]).padding(0.3)
				var xAxis = d3.axisBottom()
								.scale(xScale)
								.tickFormat(function(d) {
									d = list_date_format[d]
									hours = d.getHours()
									minutes = (d.getMinutes()<10?'0':'') + d.getMinutes()
									amPM = hours < 13 ? 'am' : 'pm'
									return hours + ':' + minutes + amPM + ' ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear()
								});

				svg.append("rect")
								.attr("id","rect")
								.attr("width", w)
								.attr("height", h)
								.style("fill", "none")
								.style("pointer-events", "all")
								.attr("clip-path", "url(#clip)")

				var gX = svg.append("g")
							.attr("class", "axis x-axis") //Assign "axis" class
							.attr("transform", "translate(0," + h + ")")
							.call(xAxis)



				gX.selectAll(".tick text")
				  .call(wrap, xBand.bandwidth())

				var low_list = [];
				var high_list = [];
				var open_list = [];
				var close_list = [];


				for (i in symbol_dict){
					for (j in symbol_dict[i]){
						for (k in symbol_dict[i][j]){
							low_list.push(symbol_dict[i][j][k].low);
							high_list.push(symbol_dict[i][j][k].high)
							open_list.push(symbol_dict[i][j][k].open)
							close_list.push(symbol_dict[i][j][k].close)
						}
					}
				};


				var ymin = Math.min.apply(null, low_list);
				var ymax = Math.max.apply(null, high_list);
				var yScale = d3.scaleLinear().domain([ymin, ymax]).range([h, 0]).nice();
				var yAxis = d3.axisLeft()
							  .scale(yScale)

				var gY = svg.append("g")
							.attr("class", "axis y-axis")
							.call(yAxis);

				var chartBody = svg.append("g")
							.attr("class", "chartBody")
							.attr("clip-path", "url(#clip)");


				// console.log(symbol_dict.Bitcoin.dates);



				var candles = svg.select("#container")
					.attr("background","blue")
					 		// .data(symbol_dict.Bitcoin.dates)
					 		// .enter()
					 		.append("rect")
							.attr('x', 5)
							.attr('y', 10)
							.attr('width', 7)
							.attr('height', 13)

				console.log('hoi');
					 		// .attr('x', function(d){
							// 	return xScale(d);
							// })
					 		// .attr("class", "candle")
					 		// .attr('y', d => yScale(Math.max(open_list, close_list)))
					 		// .attr('width', xBand.bandwidth())
					 		// .attr('height', d => (open_list === close_list) ? 1 : yScale(Math.min(open_list, close_list))-yScale(Math.max(open_list, close_list)))
					 		// .attr("fill", d => (open_list === close_list) ? "silver" : (open_list > close_list) ? "red" : "green")



			};





			function wrap(text, width) {
				text.each(function() {
				  var text = d3.select(this),
					  words = text.text().split(/\s+/).reverse(),
					  word,
					  line = [],
					  lineNumber = 0,
					  lineHeight = 1.1, // ems
					  y = text.attr("y"),
					  dy = parseFloat(text.attr("dy")),
					  tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
				  while (word = words.pop()) {
					line.push(word);
					tspan.text(line.join(" "));
					if (tspan.node().getComputedTextLength() > width) {
					  line.pop();
					  tspan.text(line.join(" "));
					  line = [word];
					  tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
					}
				  }
				});
			}


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
