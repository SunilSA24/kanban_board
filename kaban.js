// Buttons and Flags
let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textAreaCont = document.querySelector(".textArea-cont");
let allPriorityColors = document.querySelectorAll(".priority-color");

// Available Colors for Tickets
let colors = ["lightpink", "lightgreen", "lightblue", "black"];

// Toolbox Colors
let toolboxColors = document.querySelectorAll(".color");

// Lock and Unlock Classes
let lockClass = "fa-lock"; // closed lock
let unlockClass = "fa-lock-open"; // open lock

// Flags
let addTaskFlag = false;
let removeTaskFlag = false;

// Default Priority Color
let modalPriorityColor = colors[colors.length - 1];

// Tickets Array to Store Tickets
let ticketsArr = [];

// Load Tickets from Local Storage
loadTickets();

// Task 1: Toggle the visibility of the modal
// - When the "Add" button is clicked, toggle the `addTaskFlag`.
// - You can achieve this by changing the `display` property of the `modalCont`.
addBtn.addEventListener('click', function() {
    // IMPLEMENT HERE
    addTaskFlag = !addTaskFlag;
    modalCont.style.display = addTaskFlag ? 'flex' : 'none';
});

// Task 2: Handle color selection for the ticket
// - Add event listeners to each color element in `allPriorityColors`.
// - When clicked, remove the "active" class from all colors and add it to the clicked one.
// - Update the `modalPriorityColor` with the selected color.
allPriorityColors.forEach(function(colorElem) {
    // IMPLEMENT HERE
    colorElem.addEventListener('click', function() {
        allPriorityColors.forEach(function(elem) {
            elem.classList.remove('active');
        });
        colorElem.classList.add('active');
        modalPriorityColor = colorElem.classList[0];
    });
});

// Task 3: Add tickets using the "Shift" key
// - Add an event listener to `modalCont` for the "keydown" event.
// - If the key pressed is "Shift":
//   - Get the task content from `textAreaCont`.
//   - Generate a unique `ticketID` (you can use the `shortid` library or come up with an alternative).
//   - Call `createTicket()` with the selected color, ID, and task content.
//   - Hide the modal and clear the textarea content.
modalCont.addEventListener('keydown', function(e) {
    // IMPLEMENT HERE
    if (e.key === 'Shift') {
        let ticketTask = textAreaCont.value;
        let ticketId = shortid();
        createTicket(modalPriorityColor, ticketId, ticketTask, false);
        modalCont.style.display = 'none';
        textAreaCont.value = '';
        addTaskFlag = false;
    }
});

// Task 4: Create a new ticket
// - Write a function `createTicket(ticketColor, ticketID, ticketTask)`.
// - Inside the function, create a ticket container (div) with a class `ticket-cont`.
// - Add the ticket's color, ID, and task content dynamically.
// - Append the ticket to the `mainCont`.
function createTicket(ticketColor, ticketID, ticketTask, fromLocalStorage) {
    // IMPLEMENT HERE
    // console.log(ticketColor, ticketID, ticketTask);
    let ticketCount = document.createElement('div');
    ticketCount.classList.add('ticket-cont');
    ticketCount.innerHTML = `<div class="ticket-color ${ticketColor}"></div>
    <div class="ticket-id">${ticketID}</div>
    <div class="ticket-area">${ticketTask}</div>
    <div class="ticket-lock">
        <i class="fa-solid fa-lock"></i>
    </div>`;

    if (!fromLocalStorage) {
        ticketsArr.push({
            color: ticketColor,
            id: ticketID,
            task: ticketTask
        });
    }
    saveTickets();
    mainCont.appendChild(ticketCount);
    handleRemoval(ticketCount);
    handleLock(ticketCount);
    handleColor(ticketCount);
}

// Task 5: Enable or disable ticket removal mode
// - Add an event listener to the "Remove" button.
// - Toggle the `removeTaskFlag` when the button is clicked.
// - If `removeTaskFlag` is true, set the button color to "red" to indicate active mode.
// - Otherwise, set the button color to "white".
removeBtn.addEventListener('click', function() {
    // IMPLEMENT HERE
    removeTaskFlag = !removeTaskFlag;
    removeBtn.style.color = removeTaskFlag ? 'red' : 'white';
});

// Task 6: Remove tickets when clicked in remove mode
// - Write a function `handleRemoval(ticket)`.
// - Add an event listener to the ticket for the "click" event.
// - If `removeTaskFlag` is true, remove the ticket from the DOM.
function handleRemoval(ticket) {
    // IMPLEMENT HERE
    ticket.addEventListener('click', function() {
        if (!removeTaskFlag) {
            return;
        } else {
            let ticketId = ticket.querySelector('.ticket-id').innerText;
            ticketsArr = ticketsArr.filter((ticketid) => {
                return ticketid.id !== ticketId
            });
            console.log(ticketsArr);
            ticket.remove();
        }
        saveTickets();
    });
}


// Task 7: Filter tickets by color
// - Loop through each color element in `toolboxColors`.
// - Add a "click" event listener to each color element.
// - On click, retrieve the selected color and filter the tickets by matching color.
//   - Loop through all tickets and check if the color band matches the selected color.
//   - Display matching tickets and hide others.
// - Add a "dblclick" event listener to reset the filter.
//   - Show all tickets again when double-clicked.
toolboxColors.forEach(function(colorElem) {
    // Single-click to filter tickets
    colorElem.addEventListener('click', function() {
        // IMPLEMENT HERE
        let allTickets = document.querySelectorAll('.ticket-cont');
        let selectedColor = colorElem.classList[0];

        allTickets.forEach(function(ticket) {
            let ticketColor = ticket.querySelector('.ticket-color').classList[1];
            if (ticketColor != selectedColor) {
                ticket.style.display = 'none';
            } else {
                ticket.style.display = 'block';
            }
        });
    });

    // Double-click to reset filter
    colorElem.addEventListener('dblclick', function() {
        // IMPLEMENT HERE
        let allTickets = document.querySelectorAll('.ticket-cont');
        allTickets.forEach((ticket) => {
            ticket.style.display = 'block';
        });
    });

});


// Task 8: Handle ticket lock/unlock functionality
// - Modify the html of tickets to include a lock icon with class `ticket-lock` (refer the html file for structure).
// - Write a function `handleLock(ticket)`.
// - Inside the function, find the lock icon and task area in the ticket.
// - Add a "click" event listener to the lock icon.
// - When clicked, toggle between `lockClass` and `unlockClass`.
//   - If locked, make the task area `contenteditable=false`.
//   - If unlocked, make the task area `contenteditable=true`.
function handleLock(ticket) {
    // IMPLEMENT HERE

    let lockIcon = ticket.querySelector('.ticket-lock');
    let lockChild = lockIcon.children[0];
    let taskArea = ticket.querySelector('.ticket-area');
    lockIcon.addEventListener('click', function() {
        if (lockChild.classList.contains(lockClass)) {
            lockChild.classList.remove(lockClass);
            lockChild.classList.add(unlockClass);
            taskArea.setAttribute('contenteditable', true);
        } else {
            lockChild.classList.remove(unlockClass);
            lockChild.classList.add(lockClass);
            taskArea.setAttribute('contenteditable', false);
        }
    });

}

// Task 9: Cycle through ticket colors
// - Write a function `handleColor(ticket)`.
// - Inside the function, find the color band in the ticket.
// - Add a "click" event listener to the color band.
// - When clicked, cycle through the `colors` array to update the ticket's color.
function handleColor(ticket) {
    // IMPLEMENT HERE

    let ticketColor = ticket.querySelector('.ticket-color');
    console.log(ticketColor.classList);


    ticketColor.addEventListener('click', function() {
        let colorIndex = ticketColor.classList[1];
        let currentIndex = colors.indexOf(colorIndex);
        currentIndex++;
        let newColor = colors[currentIndex % colors.length];
        ticketColor.setAttribute('class', `ticket-color ${newColor}`);

        let ticketId = ticket.querySelector('.ticket-id').innerText;
        let ticketColor2 = newColor;

        ticketsArr = ticketsArr.map((ticket) => {
            if (ticket.id === ticketId) {
                ticket.color = ticketColor2;
            }
            return ticket;
        });
        console.log(ticketsArr);
        saveTickets();
    });

}

// Task 10: Maintain an array of tickets
// - Modify the above functions to maintain an array of tickets.
//   Task 10.1:
//     - When a ticket is created, add it to the `ticketsArr`.
//     - When a ticket is removed, remove it from the `ticketsArr`.
//   Task 10.2:
//     - When locking/unlocking a ticket, update the `ticketsArr` with the new task content.
//     - When changing the color of a ticket, update the `ticketsArr` with the new color.

// Task 11: Save tickets to local storage
// - Write a function `saveTickets()`.
// - Inside the function, convert the `ticketsArr` to a JSON string.
// - Save the JSON string to local storage with the key "tickets".
// - Call this function whenever a ticket is added, removed, or modified.
function saveTickets() {
    // IMPLEMENT HERE
    localStorage.setItem('tickets', JSON.stringify(ticketsArr));
}

// Task 12: Load tickets from local storage
// - Write a function `loadTickets()`.
// - Inside the function, retrieve the JSON string from local storage with the key "tickets".
// - Convert the JSON string to an array and store it in `ticketsArr`.
// - Loop through the `ticketsArr` and create tickets using the stored data.
// - Call this function whenever the page is loaded.
function loadTickets() {
    ticketsArr = JSON.parse(localStorage.getItem('tickets')) || [];

    ticketsArr.forEach((ticket) => {
        createTicket(ticket.color, ticket.id, ticket.task, true);
    });
}