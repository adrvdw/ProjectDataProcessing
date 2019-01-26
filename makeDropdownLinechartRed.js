function makeDropdownLinechartRed (symbol_dict, currency, bit_word){

    console.log(symbol_dict)
    console.log(currency)
    console.log(bit_word)

    var dropdownChangeRed = function () {
        var newCerealRed = d3.select(this).property('value');
    };


    var dropdownRed = d3.select("#vis-containerRed")
        .insert("select", "svg")
        .on("change", dropdownChangeRed)

    var cereals = currency

    dropdownRed.selectAll("option")
        .data(cereals)
        .enter().append("option")
        .attr("value", function (d) {
            return d;
        })
        .text(function (d) {
            return d; // capitalize 1st letter
        })
        .on("click", function (d){
            console.log(d)
            dropDownRed(symbol_dict, currency, d)
        })

    function dropdown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

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
    }

}