class SingleTodo {
  constructor(data, parentTodo) {
    this.data = data;
    this.parentTodo = parentTodo;

    this.single_todo = template_todo.content.cloneNode(true).children[0];
    this.task_head = this.single_todo.querySelector(".task-head");
    this.marker = this.single_todo.querySelector(".list-marker");
    this.task_title = this.single_todo.querySelector(".task-title");
    this.button_add = this.single_todo.querySelector(".button_add");
    this.nested_tasks = this.single_todo.querySelector(".nested-tasks");

    this.marker.innerHTML = statusIcon[this.data.status];
    this.task_head.classList.add(this.data.status);
    this.task_title.value = this.data.title;

    this.marker.addEventListener("click", changeStatus.bind(this));
    this.marker.addEventListener("touchend", changeStatus.bind(this));
    function changeStatus() {
      switch (this.data.status) {
        case "waiting":
          this.data.status = "doing";
          this.task_head.classList.replace("waiting", "doing");
          break;
        case "doing":
          this.data.status = "done";
          this.task_head.classList.replace("doing", "done");
          break;
        case "done":
          this.data.status = "waiting";
          this.task_head.classList.replace("done", "waiting");
          break;
      }
      this.marker.innerHTML = statusIcon[this.data.status];
      saveToDB();
    }
    this.task_title.addEventListener("change", () => {
      this.data.title = this.task_title.value;
      saveToDB();
    });
    this.button_add.addEventListener("click", () => {
      if (this.data.status === "done") this.deleteTask();
      else this.addTask();
    });
    this.button_add.addEventListener("long-press", (e) => {
      if (this.data.status === "done") {
        e.preventDefault();
        this.addTask();
      } else this.deleteTask();
    });

    this.data.children = this.data.children.map((child) =>
      addChildTask(this, child)
    );

    new Sortable(this.nested_tasks, {
      handle: ".list-marker",
      ghostClass: "sortable-ghost",
      group: "sortable-shared",
      animation: 150,
      invertSwap: true,
      onEnd: sortArray,
    });
    this.nested_tasks.todoClass = this;
  }
  getData() {
    return {
      title: this.data.title,
      status: this.data.status,
      children: this.data.children.map((childTask) => childTask.getData()),
    };
  }
  addTask() {
    this.data.children.push(addChildTask(this));
    saveToDB();
  }
  deleteTask() {
    const parentArray = this.parentTodo.data.children;
    const index = parentArray.indexOf(this);
    parentArray.splice(index, 1);
    this.single_todo.remove();
    saveToDB();
  }
}
