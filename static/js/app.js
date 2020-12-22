// from data.js
const tableData = data;

// Get a reference to the table body
const tbody = d3.select("tbody");

// function to display all data in table
const allData = function() {

    // clear table
    document.getElementById("table-body").innerHTML = null;

    // clear the input box
    d3.select("#datetime").node().value = "";

    // display all data in a table
    tableData.forEach((item) => {
        let row = tbody.append("tr");
        Object.entries(item).forEach(([key, value]) => {
          let cell = row.append("td");
          cell.text(value);
        });
    });
};

// function to display filtered data
const filterData = function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the input element and get the raw HTML node
    let inputElement = d3.select("#datetime");
  
    // Get the value property of the input element
    let inputValue = inputElement.property("value");
    
    // filter the data by the input
    let filteredData = tableData.filter(sighting => sighting.datetime === inputValue);
    
    // clear the table before displaying filtered data
    document.getElementById("table-body").innerHTML = null;

    // display filtered data in table
    filteredData.forEach((item) => {
        let row = tbody.append("tr");
        Object.entries(item).forEach(([key, value]) => {
          let cell = row.append("td");
          cell.text(value);
        });
    });
};

// call function to display all data in table
allData();

// select the filter button
const filterButton = d3.select("#filter-btn");

// select the form
const form = d3.select("#form");

// select the clear filter button
const clearButton = d3.select("#clear-btn");

// create event handlers 

// calls function to display filtered data
filterButton.on("click", filterData);
form.on("submit",filterData);

// calls function to display all data
clearButton.on("click", allData);
