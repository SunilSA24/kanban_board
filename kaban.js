// Buttons and Flags
let addBtn = document.querySelector('.add-btn');
let removeBtn = document.querySelector('.remove-btn');
let addTaskFlag = false;
let removeTaskFlag = false;


// Elements for Modal pop-up box and text area
let modalCont = document.querySelector('.modal-cont');
let textAreaCont = document.querySelector('.textArea-cont');

// Elements for Tickets
let mainCont = document.querySelector('.main-cont');

// Elements for Color Selection
let allPriorityColors = document.querySelectorAll('.priority-color');
let colors = ["lightpink", "lightgreen", "lightblue", "black"];
let modalPriorityColor = colors[colors.length - 1]; // Default color for tickets

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
        let ticketId = shortid.generate();
        createTicket(modalPriorityColor, ticketId, ticketTask);
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
function createTicket(ticketColor, ticketID, ticketTask) {
    // IMPLEMENT HERE
    console.log(ticketColor, ticketID, ticketTask);
    let ticketCount = document.createElement('div');
    ticketCount.classList.add('ticket-cont');
    ticketCount.innerHTML = `<div class="ticket-color ${ticketColor}"></div>
    <div class="ticket-id">#${ticketID}</div>
    <div class="ticket-task">${ticketTask}</div>
    <div class="ticket-lock">
        <i class="fa-solid fa-lock"></i>
    </div>`;
    mainCont.appendChild(ticketCount);
    handleRemoval(ticketCount);
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
            ticket.remove();
        }
    });
}


// Toggle modal visibility (Task 1).
// Add tickets to the UI (Task 2 to Task 4).
// Enable and disable remove mode (Task 5).
// Remove tickets when in remove mode (Task 6).