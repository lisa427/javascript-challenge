// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// display filtered data in table
tableData.forEach((item) => {
    var row = tbody.append("tr");
    Object.entries(item).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
});

// select the filter button
var button = d3.select("#filter-btn");

// select the form
var form = d3.select("#form");

// create event handlers 
button.on("click", showData);
form.on("submit",showData);

// function to run when form is submitted
function showData() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    
    // filter the data by the input
    var filteredData = tableData.filter(sighting => sighting.datetime === inputValue);
    
    // ENTER SOME CODE TO CLEAR THE TABLE
    //("#table_of_items tr").remove();

    // display filtered data in table
    filteredData.forEach((item) => {
        var row = tbody.append("tr");
        Object.entries(item).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
    });


};
