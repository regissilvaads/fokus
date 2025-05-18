const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const textAreaListTask = document.querySelector('.app__form-textarea');
const ulTask = document.querySelector('.app__section-task-list');

const taskList = JSON.parse(localStorage.getItem('taskList')) || [];

function updateTask() {
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

btnAddTask.addEventListener('click', () => {
  formAddTask.classList.toggle('hidden');
});

function newTaskElement(task) {
  const li = document.createElement('li');
  li.classList.add('app__section-task-list-item');

  const svg = document.createElement('svg');
  svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
    <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
  </svg>
  `;

  const paragraph = document.createElement('p');
  paragraph.classList.add('app__section-task-list-item-description');
  paragraph.textContent = task.description;

  const button = document.createElement('button');
  button.classList.add('app_button-edit');

  button.onclick = () => {
    const newDescriptionTask = prompt('Qual é o novo nome da tarefa:');
    paragraph.textContent = newDescriptionTask;
    task.description = newDescriptionTask;
    updateTask();
  };

  const imageButton = document.createElement('img');

  imageButton.setAttribute('src', '/imagens/edit.png');
  button.append(imageButton);

  li.append(svg);
  li.append(paragraph);
  li.append(button);
  return li;
}

formAddTask.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const task = {
    description: textAreaListTask.value,
  };
  taskList.push(task);
  const taskElement = newTaskElement(task);
  ulTask.append(taskElement);
  updateTask();
  textAreaListTask.value = '';
  formAddTask.classList.add('hidden');
});
taskList.forEach((task) => {
  const taskElement = newTaskElement(task);
  ulTask.append(taskElement);
});
