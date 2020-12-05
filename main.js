const form = document.forms["todo"];
const ul = document.querySelector("ul");
const taskInfo = document.querySelector(".task-info");

// Add new tasks
function addTask(e) {
    e.preventDefault();

    // Get user input
    const inputTask = document.getElementById("task");
    const newTask = inputTask;

    // Create elements into the DOM
    const li = document.createElement("li");
    li.id = "list";
    li.setAttribute("draggable", "true");
    const checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.className = "tick"
    const span = document.createElement("span");
    const button = document.createElement("button");
    button.className = "task-del";
    button.innerHTML = "<img src='images/icon-cross.svg' alt='cancel'>";

    // Get user input and set it to the span
    span.textContent = inputTask.value;

    // Append children to li
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);

    // Append li to ul
    ul.appendChild(li);
}

// handle events according to the clicked button
function HandleEvents(e) {
    if (e.target.tagName == "IMG") {
        const li = e.target.parentElement.parentElement;
        ul.removeChild(li);
        // Put a strike-through if the checkbox is checked to indicate completed.
    } else if (e.target.className == "tick") {
        if (e.target.checked) {
            const li = e.target.parentElement;
            li.style.textDecoration = "line-through";
            // Remove the delete button if checked
            li.lastElementChild.style.display = "none";
        } else {
            const li = e.target.parentElement;
            li.style.textDecoration = "none";
            // Restore delete button if unchecked
            li.lastElementChild.style.display = "inline";
        }
    }
}

// Show display according to the button clicked
function handleDisplay(e) {
    const checkboxes = document.querySelectorAll(".tick");
    if (e.target.className == "complete") {
        checkboxes.forEach(box => {
            if (box.checked) {
                const list = box.parentElement;
                return list.style.display = "block";
            } else if (!box.checked) {
                const list = box.parentElement;
                return list.style.display = "none";
            }
        });
    } else if (e.target.className == "all") {
        checkboxes.forEach(box => {
            const li = box.parentElement;
            return li.style.display = "block";
        });
    } else if (e.target.className == "clear") {
        checkboxes.forEach(box => {
            if (box.checked) {
                const li = box.parentElement;
                return ul.removeChild(li);
            }
        });
    }
}

let source;
// Data to drag 
function drag(e) {
    if (e.target.id == "list") {
        source = e.target;
        e.dataTransfer.setData("text", e.target.innerHTML);
        //e.dataTransfer.effectAllowed = "move";
    }
}

// Allow data/Element to be dropped inside of me.
function allowDrop(e) {
    if (e.target.id == "list") {
        // Allow data/element to be dropped on me
        e.preventDefault();
    }
}

// Drop function 
function dropData(e) {
    if (e.target.id == "list") {
        e.preventDefault();
        // Exchange the content of each element
        source.innerHTML = e.target.innerHTML;
        // set the data of the dragged element to the drop elment
        e.target.innerHTML = e.dataTransfer.getData("text");
        // e.dataTransfer.dropEffect = "move";
    }
}


// Add event listeners to buttons
form.addEventListener("submit", addTask);
ul.addEventListener("click", HandleEvents);
ul.addEventListener("dragover", allowDrop);
ul.addEventListener("drop", dropData);
ul.addEventListener("dragstart", drag);
taskInfo.addEventListener("click", handleDisplay);
