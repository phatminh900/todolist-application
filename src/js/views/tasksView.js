import View from "./View.js";
class TasksView extends View {
  _parentEl = document.querySelector(".tasks__title");
  _id;
  _taskCount = document.querySelector(".tasks__count");

  addHandlerDeleteList(handler) {
    this._parentEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("tasks__delete-btn")) {
        const deleteBtn = e.target;
        const { id } = deleteBtn.previousElementSibling.dataset;
        handler(+id);
      }
    });
  }

  displayCountCompletedTask() {
    const listEl = this._data.find((list) => list.id === this._id);

    this._taskCount.innerText = listEl.tasksCompleted.length;
  }

  _generateMarkup() {
    const listEl = this._data.find((list) => list.id === this._id);

    !listEl
      ? (this._parentEl.closest(".tasks").style.display = "none")
      : (this._parentEl.closest(".tasks").style.display = "");
    if (!listEl) return;
    return `  
   <div class="tasks__details" data-id='${listEl.id}'>
   <h2 class="heading-secondary">${listEl.name}</h2>
   <p class="tasks__time ${
     listEl.id === 1 ? "" : "hidden"
   }">Tuesday, October 12</p>
   </div>
   <button class="tasks__delete-btn ${listEl.id === 1 ? "hidden" : ""} ">
   Delete List
 </button>
   `;
  }
}
export default new TasksView();
