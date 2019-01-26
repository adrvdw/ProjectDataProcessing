	function drawCandlestickChart(symbol_dict, currency, name) {



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

		var svg = d3.select("#candlestick")
				.attr("class", "candlestick")
				.attr("width", w + margin.left + margin.right)
				.attr("height", h + margin.top + margin.bottom)
				.append("g")
				.attr("class", "candlesticksvg")
				.attr("transform", "translate(" +margin.left+ "," +margin.top+ ")");


		var xmin = Math.min.apply(null, list_timestamps);
		var xmax = Math.max.apply(null, list_timestamps);



		list = [];
		info_list = [];

		var word = name
		for (l in symbol_dict[word].dates){
				info_list.push(symbol_dict[word].dates[l])
			};

		var xScale = d3.scaleLinear().domain([-1, info_list.length])
				.range([0, w]);

		var xDateScale = d3.scaleQuantize().domain([0, list_date_format.length]).range(list_date_format);

		let xBand = d3.scaleBand().domain(d3.range(-1, list_date_format.length)).range([0, w]).padding(0.3);

		var xAxis = d3.axisBottom()

				.scale(xScale)
				.tickFormat(function(d) {
					d = info_list[d].date
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
				.attr("clip-path", "url(#clip)");

		// assign axis class
		var gX = svg.append("g")
				.attr("class", "axis x-axis")
				.attr("transform", "translate(0," + h + ")")
				.call(xAxis);

		gX.selectAll(".tick text")
				.call(wrap, xBand.bandwidth());

		var low_list = [];
		var high_list = [];

		for (j in symbol_dict[word]) {
			for (k in symbol_dict[word][j]) {
				low_list.push(symbol_dict[word][j][k].low);
				high_list.push(symbol_dict[word][j][k].high)
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



		let candles = chartBody.selectAll(".candle")
				.data(info_list)
				.enter()
				.append("rect")
				.attr('x', (d, i) => xScale(i) - xBand.bandwidth())
				.attr("class", "candle")
				.attr('y', d => yScale(Math.max(d.open, d.close)))
				.attr('width', xBand.bandwidth())
				.attr('height', d => (d.open === d.close) ? 1 : yScale(Math.min(d.open, d.close))-yScale(Math.max(d.open, d.close)))
				.attr("fill", d => (d.open === d.close) ? "silver" : (d.open > d.close) ? "red" : "green")
				.on('mouseover',function(d){
					tip.show(d);


		d3.select(this)
				.style("opacity", 1)
				.style("stroke","white")
				.style("stroke-width",3);
				})
				.on('mouseout', function(d){
					tip.hide(d);

		d3.select(this)
				.style("opacity", 0.8)
				.style("stroke","white")
				.style("stroke-width",0.3);
				})

		let stems = chartBody.selectAll("g.line")
				.data(info_list)
				.enter()
				.append("line")
				.attr("class", "stem")
				.attr("x1", (d, i) => xScale(i) - xBand.bandwidth()/2)
				.attr("x2", (d, i) => xScale(i) - xBand.bandwidth()/2)
				.attr("y1", d => yScale(d.high))
				.attr("y2", d => yScale(d.low))
				.attr("stroke", d => (d.open === d.close) ? "white" : (d.open > d.close) ? "red" : "green")
                .on('mouseover',function(d){
                        tip.show(d);


		d3.select(this)
				.style("opacity", 1)
				.style("stroke","white")
				.style("stroke-width",3);
                })
				.on('mouseout', function(d){
				tip.hide(d);

		d3.select(this)
				.style("opacity", 0.8)
				.style("stroke","white")
				.style("stroke-width",0.3);
			});

		svg.append("defs")
				.append("clipPath")
				.attr("id", "clip")
				.append("rect")
				.attr("width", w)
				.attr("height", h);


        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10,0])
            .style("text-anchor", "left")
            .html(function(d) {
                return "<strong>Open: </strong><span class='details'>" +    d.open + "<br></span>" + "<strong>Close: </strong><span class='details'>" +    d.close + "<br></span>" + "<strong>High: </strong><span class='details'>" +    d.high + "<br></span>" + "<strong>Low: </strong><span class='details'>" +    d.low + "<br></span>"  ;
            });

		svg.call(tip);




		// Set tooltips
		const extent = [[0, 0], [w, h]];

		var resizeTimer;

		var zoom = d3.zoom()
				.scaleExtent([1, 100])
				.translateExtent(extent)
				.extent(extent)
				.on("zoom", zoomed)
				.on('zoom.end', zoomend);

		svg.call(zoom);

		function update(symbol_dict, currency, d){

			info_list = []
			var word = d
			for (l in symbol_dict[d].dates){
				info_list.push(symbol_dict[d].dates[l])
			};


			var candles = svg2.selectAll('.candlestick').transition()
					.remove()


            // drawCandlestickChart(symbol_dict, currency, d)

		}




		function zoomed() {

			var t = d3.event.transform;
			let xScaleZ = t.rescaleX(xScale);

			let hideTicksWithoutLabel = function() {
				d3.selectAll('.xAxis .tick text').each(function(d){
					if(this.innerHTML === '') {
						this.parentNode.style.display = 'none'
					}
				})
			}

			gX.call(
				d3.axisBottom(xScaleZ).tickFormat((d, e, target) => {
					if (d >= 0 && d <= list_date_format.length-1) {
				d = list_date_format[d]
				hours = d.getHours()
				minutes = (d.getMinutes()<10?'0':'') + d.getMinutes()
				amPM = hours < 13 ? 'am' : 'pm'
				return hours + ':' + minutes + amPM + ' ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear()
				}
			})
		)

			candles.attr("x", (d, i) => xScaleZ(i) - (xBand.bandwidth()*t.k*10)/2)
					.attr("width", xBand.bandwidth()*t.k*10);
			stems.attr("x1", (d, i) => xScaleZ(i) - xBand.bandwidth()/2 + xBand.bandwidth()*0.5);
			stems.attr("x2", (d, i) => xScaleZ(i) - xBand.bandwidth()/2 + xBand.bandwidth()*0.5);

			hideTicksWithoutLabel();

			gX.selectAll(".tick text")
				.call(wrap, xBand.bandwidth())

		}


		function zoomend() {
			var t = d3.event.transform;
			let xScaleZ = t.rescaleX(xScale);
			clearTimeout(resizeTimer)
			resizeTimer = setTimeout(function() {

				var xmin = new Date(xDateScale(Math.floor(xScaleZ.domain()[0])))
				xmax = new Date(xDateScale(Math.floor(xScaleZ.domain()[1])))
				filtered = _.filter(info_list, d => ((d.date >= xmin) && (d.date <= xmax)))
				minP = +d3.min(filtered, d => d.low)
				maxP = +d3.max(filtered, d => d.high)
				buffer = Math.floor((maxP - minP) * 0.1)

				yScale.domain([minP - buffer, maxP + buffer])


				candles.transition()
						.duration(800)
						.attr("y", (d) => yScale(Math.max(d.open, d.close)))
						.attr("height",  d => (d.open === d.close) ? 1 : yScale(Math.min(d.open, d.close))-yScale(Math.max(d.open, d.close)));

				stems.transition().duration(800)
						.attr("y1", (d) => yScale(d.high))
						.attr("y2", (d) => yScale(d.low))

				gY.transition().duration(800).call(d3.axisLeft().scale(yScale));

			}, 500)

		}

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
		})
	};


	function dropdown() {
		document.getElementById("myDropdown").classList.toggle("show");
	};

	window.onclick = function(event) {
		if (!event.target.matches('.dropbtn')) {
			var dropdowns = document.getElementsByClassName("dropdown-content");
			var i;
			for (i = 0; i < dropdowns.length; i++) {
				var openDropdown = dropdowns[i];
				if (openDropdown.classList.contains('show')) {
					openDropdown.classList.remove('show');
				}
			}
		}
	};

	function updateCandle(symbol_dict, currency, d){

		info_list = []
		var word = d
		for (l in symbol_dict[d].dates){
			info_list.push(symbol_dict[d].dates[l])
		};


		var svg2 = d3.select("body");

		var candles = svg2.selectAll('.candlesticksvg')
			.remove()

		var stems = svg2.selectAll();


		drawCandlestickChart(symbol_dict, currency, d);

	}

	function dropDownUpdate (symbol_dict, currency, d){
		updateCandle(symbol_dict, currency, d)

	};