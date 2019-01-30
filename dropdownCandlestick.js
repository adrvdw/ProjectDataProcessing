function makeDropdownCandlestick (symbol_dict, currency){


    var dropdownChange = function () {
    };

    // create dropdown
    var dropdown = d3.select("#vis-container")
        .insert("select", "svg")
        .on("change", dropdownChange)

    dropdown.selectAll("option")
        .data(currency)
        .enter().append("option")
        .attr("value", function (d) {
            return d;
        })
        .text(function (d) {
            return d; // capitalize 1st letter
        })
        .on('click', function (d) {
            dropDownUpdate(symbol_dict,currency,d);
        });

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
                };
            };
        };
    };

};

function updateDropDownCandlestick(symbol_dict, d, date) {
    console.log(3)
};
