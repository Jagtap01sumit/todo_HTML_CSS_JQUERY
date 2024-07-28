$(document).ready(function () {
  function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function getTodos() {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : {};
  }

  function saveCurrentId(currentId) {
    localStorage.setItem("currentId", currentId);
  }

  function getCurrentId() {
    const currentId = localStorage.getItem("currentId");
    return currentId ? parseInt(currentId, 10) : 100;
  }

  function renderTodos() {
    const todos = getTodos();
    const todoList = $("#todo-list");
    todoList.empty();
    for (const id in todos) {
      todoList.addClass("bg-info");
      const li = $("<li></li>")
        .addClass("list-group-item")
        .text(`${id}: ${todos[id]}`)
        .attr("data-id", id);
      const deleteButton = $("<button></button>")
        .addClass(" btn btn-danger btn-sm float-end deletebtn")
        .text("Delete")
        .attr("data-id", id);

      li.append(deleteButton);
      todoList.append(li);
    }
  }
  $(document).on("click", ".deletebtn", function () {
    const id = $(this).attr("data-id");
    deleteTodo(id);
  });

  $("#add-todo").click(function () {
    const todoText = $("#todo").val().trim();

    if (todoText !== "") {
      const todos = getTodos();
      let currentId = getCurrentId() + 1;
      todos[currentId] = todoText;
      saveTodos(todos);
      saveCurrentId(currentId);
      renderTodos();
      $("#todo").val("");
    }
  });

  function deleteTodo(id) {
    const todos = getTodos();
    if (id in todos) {
      delete todos[id];
      saveTodos(todos);
      renderTodos();
    }
  }

  renderTodos();
});
