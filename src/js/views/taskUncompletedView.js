import View from "./View.js";
import taskItemView from "./taskItemView.js";
class TaskUncompletedView extends View {
  _parentEl = document.querySelector(".tasks__list--uncompleted");
  _formEl = document.querySelector(".form--task");
  _inputEl = document.querySelector(".form__input--task");
  _id;
  constructor() {
    super();
  }

  addHandlerRender(handler) {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskName = this._inputEl.value;
      if (!taskName) return;
      const newTask = this._createTask(taskName);
      handler(newTask);
      this._inputEl.value = null;
    });
  }

  addHandlerChecked(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btnChecked = e.target.closest(".btn--checked");
      if (!btnChecked) return;
      const { id } = btnChecked.closest(".tasks__item").dataset;
      handler(+id);
    });
  }

  addHandlerDelete(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btnDeleted = e.target.closest(".btn--delete");
      if (!btnDeleted) return;
      const { id } = btnDeleted.closest(".tasks__item").dataset;

      handler(+id);
    });
  }

  _createTask(taskName) {
    return {
      name: taskName,
      id: Date.now(),
      time: [new Date().getHours(), new Date().getMinutes()],
      date: new Date().getTime(),
      completed: false,
    };
  }

  _generateMarkup() {
    const listEl = this._data.find((list) => list.id === this._id);
    if (!listEl) return;

    return listEl.tasksUncompleted
      .map((uncompletedTask) =>
        taskItemView.render(uncompletedTask, uncompletedTask.id, false)
      )
      .reverse()
      .join("");
  }
  //     _generateTask(){
  //       const listEl=this._data.find(list=>list.id===this._id)
  //       if(!listEl) return
  //       return  listEl.tasksUncompleted.map(task=>{
  //           return(

  //           `

  //           <li class="tasks__item ${task.completed?'checked':''}" data-id='${task.id}'>
  //           <button class='btn btn--checked'>
  //           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon--circle" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-q</title><circle cx="256" cy="256" r="192" style="fill:none;stroke:#339af0;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>
  //           </button>

  //       <div>
  //         <span class="tasks__name">${task.name}</span>
  //         <span class="tasks__time">${this._calcDay(task.date)} ${String(task.time[0]).length===2?task.time[0]:'0'+task.time[0]} : ${String(task.time[1]).length===2?task.time[1]:'0'+task.time[1]}</span>
  //       </div>
  //       <button class="btn btn--delete">
  //         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 icon icon--delete" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  //         </svg>
  //       </button>
  //     </li>
  // `

  //        ) }).reverse()
  //     }
}
export default new TaskUncompletedView();
