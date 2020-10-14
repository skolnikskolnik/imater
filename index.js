$(document).ready(function () {
    var date = new Date();
    var dateOfMonth = date.getDate();
    //Stores the month as a number (subtract one since it starts at zero)
    var month = date.getMonth();
    var hourOfDay = date.getHours();
    var dayOfWeek = date.getDay();
    var year = date.getFullYear();

    //Display day of week, month, and year to the screen
    var dateDisplay = $("#currentDay");
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    dateDisplay.text(daysOfWeek[dayOfWeek] + ", " + months[month] + " " + dateOfMonth + ", " + year);

    //Have three modes, past, present, and future
    var hourClass = $(".description");

    //Check for existing local storage items
    displayUserInput();
    //Three types of states: past, present, and future

    //For past, this occurs when Math.floor(current time) is less than the timeNumber
    var currentTimeFloor = Math.floor(hourOfDay);

    for (var i = 0; i < hourClass.length; i++) {
        var hourNumber = i + 9;
        var hourClassIndividual = hourClass[i];

        if (currentTimeFloor > hourNumber) {
            hourClassIndividual.classList.add("past");
        }
        else if (currentTimeFloor == hourNumber) {
            hourClassIndividual.classList.add("present");
        }
        else {
            hourClassIndividual.classList.add("future");
        }
    }

    //Putting an event listener on the submit buttons that will save the text entered and display it permanently
    var submitBtns = $(".saveBtn");
    submitBtns.on("click", function () {
        //Add a value to each element 
        for (var i = 0; i < submitBtns.length; i++) {
            submitBtns[i].setAttribute("index", i);
            hourClass[i].setAttribute("index", i);
        }
        //Get the index of the button that was clicked
        var thisIndex = ($(this).attr("index"));

        //Now to get and store the input
        var userInput = hourClass[thisIndex].value;
        console.log(userInput);

        // create user object from submission
        var user = {
            index: thisIndex,
            input: userInput,
        };

        // validate the fields
        localStorage.setItem(thisIndex, userInput);
    });


    function displayUserInput() {
        for (var i = 0; i < hourClass.length; i++) {
            var i = parseInt(i);
            var textToDisplay = localStorage.getItem(i);

            if (textToDisplay) {
                i = parseFloat(i);
                var displayElement = hourClass[i];
                displayElement.value = textToDisplay;
            }
        }
    }
});