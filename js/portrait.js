var yearPtr;
var years = [];
var data = {};
var numPanels = 7;
var centerIdx = 0;

function reloadAll(delta){
	//alert(delta);
	if(delta > 0){
		if(yearPtr + 7 >= years.length - 1){
			return;
		}
		yearPtr += delta;
	}
	else if(delta == 0){
	}
	else{
		if(yearPtr <= 0){
			return;
		}
		yearPtr += delta;
	}
	for(var i = 0; i < numPanels; i++){
		load(i, yearPtr+i);
	}
}

function load(divId, year){
	$("#panel"+divId).empty();
	var div;
	if(year == yearPtr+3){
		div = d3.select("#panel"+divId).selectAll("div").data([data[years[year]][centerIdx]])
		.enter()
		.append("a")
		.attr("href", function(d) {return d[3];})
		.append("div")
		.attr("class", year == yearPtr+3 ? "centerInnerPanel" : "innerPanel")
		.attr("style", function(d) { return "background-image:url('" + d[2] + "')";})
		.on("click", function() {reloadAll(year - yearPtr - 3);});
		div.append("a")
		.attr("class", "centerInfoText")
		.attr("href", function(d) {return d[3];})
		.append("text")
		.text(function(d) {return d[0];});
	}
	else{
		div = d3.select("#panel"+divId).selectAll("div").data(data[years[year]])
		.enter()
		.append("div")
		.attr("class", year == yearPtr+3 ? "centerInnerPanel" : "innerPanel")
		.attr("style", function(d) { return "background-image:url('" + d[2] + "')";})
		.on("click", function() {centerIdx = 0; reloadAll(year - yearPtr - 3);});
		div.append("a")
		.attr("href", function(d) {return d[3];})
		.append("text")
		.text(function(d) {return d[0];});
	}
	
	if(year != yearPtr+3){
		$("#panel"+divId).append('<div class="yearTag">'+ years[year] +"</div>");
	}
	else{
		$("#panel"+divId).append('<div class="centerYearTag">'+ years[year] +"</div>");
		$("#panel"+divId).append('<div class="centerInfoPanel">'+ years[year] +"</div>");		
	}
	if(year == yearPtr + 3 && centerIdx < data[years[year]].length-1){
		d3.select("#panel"+divId)
		.append("a")
		.attr("href", "#")
		.append("div")
		.attr("class", "downBtn")
		.on("click", function(){centerIdx++; load(3, year);})
	}	
	if(year == yearPtr + 3 && centerIdx > 0){
		d3.select("#panel"+divId)
		.append("a")
		.attr("href", "#")
		.append("div")
		.attr("class", "upBtn")
		.on("click", function(){centerIdx--; load(3, year);})
	}		
}

function loadRawData(){
	for(var i = 0; i < dates.length; i++){
		if(data[dates[i]] == undefined){
			data[dates[i]] = [];
		}
		data[dates[i]].push([artists[i], styles[i], imgUrls[i], urls[i]]);
	}
	for(var key in data){
		years.push(key);
	}
	yearPtr = years.length - 7;
}

function findClosest(tYear){
	var d = 10000000;
	var result = 0;
	for(var i = 0; i < years.length; i++){
		if(Math.abs(years[i]-tYear) < d){
			result = i;
			d = Math.abs(years[i]-tYear);
		}
	}
	return result;
}

window.onload=function(){
	
	loadRawData();
	
	for(var i = 0; i < numPanels; i++){
		var div;
		if(i == 3){
			div = $('<div id="panel'+i+'" class="centerPanel"><div>');
		}
		else{
			div = $('<div id="panel'+i+'" class="panel"><div>');
		}
		div.css("left", i <= 3 ? i * 150 : i * 150 + 350);
		div.css("top", 0);
		$("#main").append(div);
		load(i, yearPtr+i);
	}
	var yearlinks = [1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000];
	d3.select("#title").selectAll("a").data(yearlinks)
		.enter()
		.append("a")
		.attr("href", "#")
		.attr("style", "padding-left: 20px; padding-top: 2px; padding-bottom: 2px; padding-right: 20px;")
		.text(function(d) {return d;})
		.on("click", function(d) {yearPtr = findClosest(d); reloadAll(0)});
}
