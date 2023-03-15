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
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex], done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    }

    const toggleHidenDoneTasks = () => {

      hideDoneTasks = !hideDoneTasks;
        
        render();

    };

    const markAsDoneAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    }

    const bindButtonsEvents = () => {
        const markAsDoneAllTasksButton = document.querySelector(".js-markAsDoneAllTasks")

        if (markAsDoneAllTasksButton) {
            markAsDoneAllTasksButton.addEventListener("click", markAsDoneAllTasks);
        }

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHidenDoneTasks);
        }

    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
        <button class="buttons__style js-toggleHideDoneTasks">
          ${hideDoneTasks ? "Pokaż" : "Ukryj"}
           ukończone
        </button>
        <button class="buttons__style js-markAsDoneAllTasks"
         ${tasks.every(({ done }) => done) ? "disabled" : ""}>
         Ukończ wszystkie
        </button>
        `

    }

    const renderTasks = () => {
        const taskToHTML = task => `

                 <li class="list__item ${task.done && hideDoneTasks  ? "list__item--hidden" : ""} js-tasks ">
                   <button class="js-done list__button list__button--done">
                   ${task.done ? "✔" : ""}
                   </button>
                    <span class="${task.done ? "list__content--done" : ""}"> 
                    ${task.content}
                    </span>
                   <button class="js-remove list__button list__button--delete"></button>
                 </li>
               `;

        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
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



