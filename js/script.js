{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };



    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ]
        console.log(toggleTaskDone());
        render()
    }

    const hiddenAllDoneTasks = () => {

    };

    const markAsDoneAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const bindButtonsEvents = () => {

    }

    const renderButtons = () => {

    }

    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                 <li class="list__item js-tasks ${task.done ? "list__content--done" : ""}">
                   <button class="js-done list__button list__button--done">${task.done ? "✔" : ""}</button>
                     ${task.content}
                   <button class="js-remove list__button list__button--delete"></button>
                 </li>
               `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

    }

    const render = () => {
        renderButtons();
        renderTasks();
        bindEvents();
        bindButtonsEvents();
    }


    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
        }
        newTaskElement.value = "";
        newTaskElement.focus();
    };


    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };
    init();
}



