var xmlhttp = new XMLHttpRequest()
var url = "https://api.coindesk.com/v1/bpi/currentprice.json"

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
        var json = JSON.parse(this.responseText);
        parseJson(json);
    }
};

xmlhttp.open("GET", url, true)
xmlhttp.send()

function parseJson(json){
    var time =  json["time"]["updated"];
    var usdValue = "1 BTC is USD " + json["bpi"]["USD"]["rate"];
    var gdpValue = "1 BTC is GBP " + json["bpi"]["GBP"]["rate"];
    var eurValue = "1 BTC is EUR " + json["bpi"]["EUR"]["rate"];

    document.getElementById("data").innerHTML =
        time + "<br /><br />" + usdValue + "<br />" + gdpValue + "<br />" + eurValue;


}