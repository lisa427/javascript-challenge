// from data.js
const tableData = data;

// Get a reference to the table body
const tbody = d3.select("tbody");

// function to display all data in table
const allData = function() {

    // clear table
    document.getElementById("table-body").innerHTML = null;

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
    let inputDate = d3.select("#datetime");
    let inputCity = d3.select("#city");
    let inputState = d3.select("#state");
    let inputCountry = d3.select("#country");
    let inputShape = d3.select("#shape");
  
    // Get the value property of the input element
    //let inputDateValue = inputDate.property("value");
    //let inputCityValue = inputCity.property("value").toLowerCase();
    //let inputStateValue = inputState.property("value").toLowerCase();
    //let inputCountryValue = inputCountry.property("value").toLowerCase();
    //let inputShapeValue = inputShape.property("value").toLowerCase();

    //attempting to get filter to work even if some filters are left empty
    //maybe drop keys from this if their value is empty?
    //can't get it to work properly even when all keys have values

    let filterObject = {
      date: inputDate.property("value"),
      city: inputCity.property("value").toLowerCase(),
      state: inputState.property("value").toLowerCase(),
      country: inputCountry.property("value").toLowerCase(),
      shape: inputShape.property("value").toLowerCase()
    };

    function filterUsers(tableData, filterObject) {
      //Loop through all key-value pairs in filtersObject
      Object.keys(filterObject).forEach(function(key) {
        //Loop through users array checking each userObject
        results = tableData.filter(function(userObject) {
          //If userObject's key:value is same as filtersObject's key:value, they stay in users array
          return userObject[key] === filterObject[key]
        })
      });
      return results;
    };

        //let filteredData = filterUsers(tableData, filterObject);

    let filteredData = tableData.filter(function(item) {
      for (var key in filterObject) {
        if (item[key] === undefined || item[key] != filterObject[key])
          return false;
      }
      return true;
    });
    
     
    
    // filter the data by the input
    //let filteredData = tableData.filter(sighting => sighting.datetime === inputDateValue
      //&& sighting.city === inputCityValue);
    
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

    console.log(filteredData);
    console.log(filterObject);
    //console.log(inputDateValue);
    //console.log(inputCityValue);

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

