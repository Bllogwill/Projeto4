const inputElement = document.querySelector('.new-task-input')
const addTaskButton = document.querySelector('.new-task-button')

const tasksContainer = document.querySelector('.task-container')

const validateInput = () => inputElement.value.trim().length > 0

const handleAddTask = () => {
  const inputIsValid = validateInput()

  if (!inputIsValid) {
    return inputElement.classList.add('error')
  }

  const taskItemContainer = document.createElement('div')
  taskItemContainer.classList.add('task-item')

  const taskContent = document.createElement('p')
  taskContent.innerText = inputElement.value

  taskContent.addEventListener('click', () => handleClick(taskContent))

  const deleteItem = document.createElement('i')
  deleteItem.classList.add('far')
  deleteItem.classList.add('fa-trash-alt')

  deleteItem.addEventListener('click', () =>
    handleDeleteClick(taskItemContainer, taskContent)
  )

  taskItemContainer.appendChild(taskContent)
  taskItemContainer.appendChild(deleteItem)

  tasksContainer.appendChild(taskItemContainer)

  inputElement.value = ''

  updateLocalStorage()
}

const handleClick = taskContent => {
  const tasks = tasksContainer.childNodes

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)

    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle('completed')
    }
  }

  updateLocalStorage()
}

const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)

    if (currentTaskIsBeingClicked) {
      taskItemContainer.remove()
    }
  }

  updateLocalStorage()
}

const handleInputchange = () => {
  const inputIsvalid = validateInput()

  if (inputIsvalid) {
    return inputElement.classList.remove('error')
  }
}

const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes

  const localStorageTasks = [...tasks].map(task => {
    const content = task.firstChild
    const isCompleted = content.classList.contains('completed')

    return { description: content.innerText, isCompleted }
  })

  localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
}

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks')) ?? []

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')

    const taskContent = document.createElement('p')
    taskContent.innerText = task.description

    if (task.isCompleted) {
      taskContent.classList.add('completed')
    }

    taskContent.addEventListener('click', () => handleClick(taskContent))
    const deleteItem = document.createElement('i')
    deleteItem.classList.add('far')
    deleteItem.classList.add('fa-trash-alt')

    deleteItem.addEventListener('click', () =>
      handleDeleteClick(taskItemContainer, taskContent)
    )

    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(deleteItem)

    tasksContainer.appendChild(taskItemContainer)
  }

  const getBoxMeses = window.document.getElementById("box-meses")

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('pt-BR', { month: 'long' });
  }

  for (let i = 1; i < 13; i++) {

    const monthName = getMonthName(i)

    const newDiv = document.createElement('div')

    newDiv.classList.add('box-mes')

    newDiv.append(monthName)

    getBoxMeses.append(newDiv)

  }

}

refreshTasksUsingLocalStorage()

addTaskButton.addEventListener('click', () => handleAddTask())

inputElement.addEventListener('input', () => handleInputchange())
