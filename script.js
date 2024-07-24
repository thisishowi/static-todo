const statusIcon = {
  waiting: '<span class="material-icons-round">radio_button_unchecked</span>',
  doing: '<span class="material-icons-round">incomplete_circle</span>',
  done: '<span class="material-icons-round">task_alt</span>',
};
const emptyTask = () => {
  return {
    title: "",
    status: "waiting",
    children: [],
  };
};
emptyGroups = [
  {
    title: "Today's Tasks",
    children: [],
  },
  {
    title: "My Tasks",
    children: [],
  },
];

const container = document.querySelector(".container");
const template_group = document.getElementById("template_group");
const template_todo = document.getElementById("template_todo");

let taskGroups = []; // TaskGroupクラスを格納

function addChildTask(parentTodo, data = emptyTask()) {
  const container = parentTodo.nested_tasks;
  const newTask = new SingleTodo(data, parentTodo);
  container.append(newTask.single_todo);
  return newTask;
}

function convertTasksToJSON() {
  return JSON.stringify(taskGroups.map((group) => group.getData()));
}
function saveToDB() {
  localStorage.setItem("todoJSON", convertTasksToJSON());
}

function sortArray(e) {
  const previousList = e.from.todoClass.data.children;
  const target = previousList.splice(e.oldIndex, 1)[0];
  const targetList = e.to.todoClass.data.children;
  targetList.splice(e.newIndex, 0, target);
  saveToDB();
}

function getAllTodos() {
  const data = localStorage.getItem("todoJSON") || JSON.stringify(emptyGroups);
  return JSON.parse(data);
}

function init() {
  taskGroups = getAllTodos().map((groupObj) => new TaskGroup(groupObj));
}
init();
