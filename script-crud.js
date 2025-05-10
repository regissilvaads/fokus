const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const textAreaListTask = document.querySelector('.app__form-textarea');

btnAddTask.addEventListener('click', () => {
  formAddTask.classList.toggle('hidden');
});

const taskList = [];

formAddTask.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const task = {
    description: textAreaListTask.value,
  };
  taskList.push(task);
  localStorage.setItem('taskList', JSON.stringify(taskList));
});
