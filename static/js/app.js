// from data.js
var tableData = data;

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
  
    console.log(inputValue);
  
    var filteredData = tableData.filter(sighting => sighting.datetime === inputValue);
  
    console.log(filteredData);

};
