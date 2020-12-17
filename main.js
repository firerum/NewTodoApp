const form = document.forms["todo"];
const ul = document.querySelector("ul");
const taskInfo = document.querySelector(".task-info");
const dayggler = document.getElementById("dayggler");

// Add new tasks
function addTask(e) {
    e.preventDefault();

    // Get user input
    const inputTask = document.getElementById("task");
    const newTask = inputTask;

    // Create elements into the DOM
    const li = document.createElement("li");
    const container = document.createElement("label");
    const emptySpan = document.createElement("span");
    const checkbox = document.createElement("INPUT");
    const span = document.createElement("span");
    const button = document.createElement("button");

    // Add properties and content to elements
    li.className = "list";
    li.setAttribute("draggable", "true");
    span.textContent = inputTask.value;
    checkbox.setAttribute("type", "checkbox");
    checkbox.className = "tick"
    button.className = "task-del";
    button.innerHTML = "<img src='images/icon-cross.svg' alt='cancel'>";

    // Append children to parents
    container.appendChild(checkbox);
    container.appendChild(emptySpan);
    li.appendChild(container);
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
            const li = e.target.parentElement.parentElement;
            li.style.textDecoration = "line-through";
            li.style.color = "hsl(235, 19%, 35%)";
            // Remove the delete button if checked
            li.lastElementChild.style.display = "none";
        } else {
            const li = e.target.parentElement.parentElement;
            li.style.textDecoration = "none";
            li.style.color = "hsl(233, 11%, 84%)";
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
                const list = box.parentElement.parentElement;
                return list.style.display = "flex";
            } else if (!box.checked) {
                const list = box.parentElement.parentElement;
                return list.style.display = "none";
            }
        });
    } else if (e.target.className == "all") {
        checkboxes.forEach(box => {
            const li = box.parentElement.parentElement;
            return li.style.display = "flex";
        });
    } else if (e.target.className == "clear") {
        checkboxes.forEach(box => {
            if (box.checked) {
                const li = box.parentElement.parentElement;
                return ul.removeChild(li);
            }
        });
    }
}

let source;
// Data to drag 
function drag(e) {
    if (e.target.className == "list") {
        source = e.target;
        e.dataTransfer.setData("text", e.target.innerHTML);
        //e.dataTransfer.effectAllowed = "move";
    }
}

// Allow data/Element to be dropped inside of me.
function allowDrop(e) {
    if (e.target.className == "list") {
        // Allow data/element to be dropped on me
        e.preventDefault();
    }
}

// Drop function 
function dropData(e) {
    if (e.target.className == "list") {
        e.preventDefault();
        // Exchange the content of each element
        source.innerHTML = e.target.innerHTML;
        // set the data of the dragged element to the drop elment
        e.target.innerHTML = e.dataTransfer.getData("text");
        // e.dataTransfer.dropEffect = "move";
    }
}

// Change theme 
function changeTheme() {
    document.documentElement.classList.toggle("light-theme");
}


// Add event listeners to buttons
form.addEventListener("submit", addTask);
ul.addEventListener("click", HandleEvents);
ul.addEventListener("dragover", allowDrop);
ul.addEventListener("drop", dropData);
ul.addEventListener("dragstart", drag);
taskInfo.addEventListener("click", handleDisplay);
dayggler.addEventListener("click", changeTheme);
