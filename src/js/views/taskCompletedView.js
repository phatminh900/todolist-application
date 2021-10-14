import View from "./View.js";
import taskItemView from "./taskItemView.js";
class TaskUncompletedView extends View {
  _parentEl = document.querySelector(".tasks__list--completed");
  _completedContainer = document.querySelector(".tasks__completed-container");
  _id;
  constructor() {
    super();
    this._toggleOpenStage();
  }

  addHandlerUnChecked(handler) {
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

  _toggleOpenStage() {
    this._completedContainer.addEventListener("click", function (e) {
      const title = e.target.closest(".tasks__completed-title");
      if (!title) return;
      this.classList.toggle("close");
    });
  }
  _generateMarkup() {
    const listEl = this._data.find((list) => list.id === this._id);
    if (!listEl) return;
    !listEl.tasksCompleted.length?this._completedContainer.classList.add('hidden'):this._completedContainer.classList.remove('hidden')
    return listEl.tasksCompleted
      .map((taskCompleted) =>
        taskItemView.render(taskCompleted, taskItemView.id, false)
      )
      .reverse()
      .join("");
  }
  //     _generateTask(){
  //       const listEl=this._data.find(list=>list.id===this._id)
  //       if(!listEl) return
  //       // open stage
  //       !listEl.tasksCompleted.length?this._completedContainer.classList.add('hidden'):this._completedContainer.classList.remove('hidden')
  //       return  listEl.tasksCompleted.map(task=>{
  //           return(
  //           `
  //           <li class="tasks__item ${task.completed?'checked':''}" data-id='${task.id}'>
  //           <button class='btn btn--checked'>
  //           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 icon icon--circle-check" viewBox="0 0 20 20" fill="currentColor">
  //           <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
  //         </svg>
  //           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  //         </svg>
  //           </button>

  //       <div>
  //         <span class="tasks__name">${task.name}</span>
  //         <span class="tasks__time">Today ${String(task.time[0]).length===2?task.time[0]:'0'+task.time[0]} : ${String(task.time[1]).length===2?task.time[1]:'0'+task.time[1]}</span>
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
