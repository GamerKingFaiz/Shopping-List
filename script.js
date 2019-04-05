var button = document.getElementById("enter"); // Enter / submit button for inputs
var input = document.getElementById("userinput"); // Text from the input field box
var ul = document.querySelector("ul"); // Grabs the first UL
var listItems = document.querySelectorAll("li"); // Grabs all the LIs
var buttons = document.querySelectorAll("button"); // Grabs all the buttons on the page
var deleteAllButton = document.getElementById("deleteAll"); // Delete All button
var deleteDoneButton = document.getElementById("deleteDone"); // Delete All Done button
var allDoneButton = document.getElementById("allDone"); // Mark All Done button

/* Checks the length of the text input */
function inputLength() {
	return input.value.length;
}

/* For creating the delete buttons dynamically */
function createButtion(element) {
    var btn = document.createElement("BUTTON");
    btn.classList.add("fas"); // Font Awesome
    btn.classList.add("fa-trash-alt"); // Font Awesome
    element.appendChild(btn);
    // Adds listener event to each new button
    btn.addEventListener("click", function() {
        ul.removeChild(btn.parentElement);
    });
}

/* Adds the text input into the item list */
function createListElement() {
	var li = document.createElement("LI");
    li.appendChild(document.createTextNode(input.value + ' '));
    createButtion(li);
    ul.appendChild(li);
    input.value = "";
    // Adds event listener for each item
    li.addEventListener("click", function () {
        li.classList.toggle("done"); // Strike through item
    });
}

function addListAfterClick() {
	if (inputLength() > 0) {
        createListElement(); // Main function
    }
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
        createListElement(); // Main function
    }
}

/* Function to delete all list items */
function deleteAllItems() {
    let userConfirmation = confirm("Are you sure? This wil delete all items.");
    if (userConfirmation === true) {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    }    
}

/* Function that marks all items as Done */
function markAllDone() {
    let allListItems = document.querySelectorAll("li");
    for (let i=0;i<allListItems.length;i++) {
        if (allListItems[i].getAttribute("class") !== "done") {
            allListItems[i].classList.toggle("done");
        }
    }
}

/* Function that deletes items marked as Done */
function deleteAllDone() {
    let allListItems = document.querySelectorAll("li");
    let userConfirmation = confirm("Are you sure? This will delete all items marked as done.");
    if (userConfirmation === true) {
        for (let i=0;i<allListItems.length;i++) {
            if (allListItems[i].getAttribute("class") === "done") {
                    ul.removeChild(allListItems[i]);
            }
        }
    }
}

/* Event listeners to manipulate the list */
button.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
deleteAllButton.addEventListener("click", deleteAllItems);
deleteDoneButton.addEventListener("click", deleteAllDone);
allDoneButton.addEventListener("click", markAllDone);


/* Event Listener to toggle done state to list items present at form load */
for (let i=0; i < listItems.length; i++) {
    listItems[i].addEventListener("click", function () {
        listItems[i].classList.toggle("done"); //Strike through item
    });
}

/* Event Listener to add hidden property to buttons present at form load */
for (let i=1; i<buttons.length-3;i++) {// For loop starts at 1 to skip "Enter" button and goes to "buttons.length - 3" to skip the buttons at the bottom of the page
    buttons[i].addEventListener("click", function() {
        ul.removeChild(buttons[i].parentElement);
    });
}