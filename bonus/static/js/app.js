// from data.js
const tableData = data;

// Get a reference to the table body
const tbody = d3.select("tbody");

// function to display all data in table
const allData = function() {

    // clear table
    document.getElementById("table-body").innerHTML = null;

    // clear the input boxes
    d3.select("#datetime").node().value = "";
    d3.select("#city").node().value = "";
    d3.select("#state").node().value = "";
    d3.select("#country").node().value = "";
    d3.select("#shape").node().value = "";

    // display all data in a table
    tableData.forEach((item) => {
        let row = tbody.append("tr");
        Object.entries(item).forEach(([key, value]) => {
          let cell = row.append("td");
          cell.text(value);
        });
    });
}

/**
 * Filters an array of objects (one level-depth) with multiple criteria.
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria
 * @return {Array}
 */
const filterArray = function(array, filters) {
  const filterKeys = Object.keys(filters);
  return array.filter(item => {
    // validates all filter criteria
    return filterKeys.every(key => {
      // ignores an empty filter
      if (!filters[key].length) return true;
      return filters[key].find(filter => filter === item[key]);
    });
  });
}

// function to display filtered data
const filterData = function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the input element and get the raw HTML node
    let inputDate = d3.select("#datetime");
    let inputCity = d3.select("#city");
    let inputState = d3.select("#state");
    let inputCountry = d3.select("#country");
    let inputShape = d3.select("#shape");
  
    // gather value properties of input into one object
    let filterObject = {
      datetime: [inputDate.property("value")],
      city: [inputCity.property("value").toLowerCase()],
      state: [inputState.property("value").toLowerCase()],
      country: [inputCountry.property("value").toLowerCase()],
      shape: [inputShape.property("value").toLowerCase()]
    };

    // loop through object and delete properties without values
    for (let item in filterObject) {
      if (filterObject[item] == "") {
        delete(filterObject[item]);
      };
    };

    // filter data by calling function
    // pass data array & object with filter values
    let filteredData = filterArray(tableData, filterObject);

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
}

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

