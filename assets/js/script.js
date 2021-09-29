var tasksToDoEl = document.querySelector("#tasks-to-do");
var formEl = document.querySelector("#task-form");
var taskIDCounter = 0;
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function(event) {

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");
    
    if (isEdit) {
        var taskID = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskID);
    } else {
        
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
    

    createTaskEl(taskDataObj);
}
};

var completeEditTask = function(taskName, taskType, taskID) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}


var createTaskEl = function(taskDataObj) {

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    listItemEl.setAttribute("data-task-id", taskIDCounter);

    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIDCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

    taskIDCounter++;

};

var createTaskActions = function(taskID) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskID);

    actionContainerEl.appendChild(editButtonEl);

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskID);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskID);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);


    return actionContainerEl;

}


formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
    
    var targetEl = event.target;

    if (targetEl.matches(".edit-btn")) {
        var taskID = targetEl.getAttribute("data-task-id");
        editTask(taskID);
    }

    else if (targetEl.matches(".delete-btn")) {
        
        var taskID = targetEl.getAttribute("data-task-id");
        deleteTask(taskID);
    }
};

var editTask = function(taskID) {
    console.log("editing task #" + taskID);

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    

    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskID);



    


}

var deleteTask = function(taskID) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");
    taskSelected.remove();
}

pageContentEl.addEventListener("click", taskButtonHandler);

 



