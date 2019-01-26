function makeDropdownLinechartBlue (symbol_dict, currency, bit_word){

    console.log(symbol_dict)
    console.log(currency)
    console.log(bit_word)

    var dropdownChangeBlue = function () {
        var newCerealBlue = d3.select(this).property('value');
    };


    var dropdownBlue = d3.select("#vis-containerBlue")
        .insert("select", "svg")
        .on("change", dropdownChangeBlue)

    var cereals = currency

    dropdownBlue.selectAll("option")
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
            dropDownBlue(symbol_dict, currency, d)
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