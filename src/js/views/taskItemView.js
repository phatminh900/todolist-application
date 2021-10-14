import View from "./View.js";

class TaskItemView extends View {
  _parentEl = "";
  constructor() {
    super();
  }
  _generateMarkup() {
  
    return `     
            <li class="tasks__item ${
              this._data.completed ? "checked" : ""
            }" data-id='${this._data.id}'>
            <button class='btn btn--checked'>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon--circle" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-q</title><circle cx="256" cy="256" r="192" style="fill:none;stroke:#339af0;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>
            </button>
  
        <div>
          <span class="tasks__name">${this._data.name}</span>
          <span class="tasks__time">${this._calcDay(this._data.date)} ${
      String(this._data.time[0]).length === 2
        ? this._data.time[0]
        : "0" + this._data.time[0]
    } : ${
      String(this._data.time[1]).length === 2
        ? this._data.time[1]
        : "0" + this._data.time[1]
    }</span>
        </div>
        <button class="btn btn--delete">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 icon icon--delete" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </li>
  `;
  }
  _calcDay(date) {
    const days = Math.round(Math.abs(Date.now() - date) / (1000 * 24 * 3600));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days === 2) return "2 days ago";
    if (days === 3) return "3 days ago";
    if (days === 4) return "4 days ago";
    return `${new Date(date).getDate()}/${new Date(date).getMonth()}`;
  }
}
export default new TaskItemView();
