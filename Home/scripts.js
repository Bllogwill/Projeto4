const inputElement = document.querySelector('.new-task-input')
const addTaskButton = document.querySelector('.new-task-button')

const validateInput = () => inputElement.value.trim().length > 0

const handleAddTask = () => {
  const inputIsValid = validateInput()

  if (!inputIsValid) {
    return inputElement.classList.add('error')
  }

  const taskItemContainer = document.createElement('div')
  taskItemContainer.classList.add('task-item')

  const taskcontent = document.createElement('p')
  taskcontent.innerText = inputElement.value
}

const handleInputchange = () => {
  const inputIsvalid = validateInput()

  if (inputIsvalid) {
    return inputElement.classList.remove('error')
  }
}

addTaskButton.addEventListener('click', () => handleAddTask())

inputElement.addEventListener('change', () => handleInputchange())
