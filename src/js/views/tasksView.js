import View from "./View.js";
class TasksView extends View {
  _parentEl = document.querySelector(".tasks__title");
  _id;
  _formEl=document.querySelector('.form--task')
  _taskCount = document.querySelector(".tasks__count");
  _inputEl=document.querySelector('.form__input--task')
  _buttonAdd=document.querySelector('.btn--task')
  _iconCircleEl=document.querySelector('.icon--circle.icon--task')
  _iconAddEl=document.querySelector('.icon--add.icon--task')
  constructor(){
    super()
    this._activeFocusStage()
    this._unActiveFocusStage()
  }

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

  _toggleActiveStage(){
    this._iconCircleEl.classList.toggle('none')
    this._iconAddEl.classList.toggle('none')
    this._formEl.classList.toggle('form--active')
  }

  _activeFocusStage(){
    this._inputEl.addEventListener('focus',this._toggleActiveStage.bind(this))

  }
  _unActiveFocusStage(){
    this._inputEl.addEventListener('blur',this._toggleActiveStage.bind(this))
  }
}
export default new TasksView();
