class TaskGroup {
  constructor(data) {
    this.data = data;

    const template_clone = template_group.content.cloneNode(true);

    this.group_title = template_clone.querySelector(".group-title");
    this.todos_container = template_clone.querySelector(".todos-container");
    this.button_add = template_clone.querySelector(".addNewTask");

    this.group_title.innerHTML = this.data.title;

    this.button_add.addEventListener("click", this.addTask.bind(this));

    this.data.children = this.data.children.map((child) =>
      addChildTask(this, child)
    );

    container.append(template_clone);

    new Sortable(this.todos_container, {
      handle: ".list-marker",
      ghostClass: "sortable-ghost",
      group: "sortable-shared",
      animation: 150,
      invertSwap: true,
      onEnd: sortArray,
    });
    this.todos_container.todoClass = this;
  }
  getData() {
    return {
      title: this.data.title,
      children: this.data.children.map((childTask) => childTask.getData()),
    };
  }
  addTask() {
    this.data.children.push(addChildTask(this));
    saveToDB();
  }
  get nested_tasks() {
    return this.todos_container;
  }
}
