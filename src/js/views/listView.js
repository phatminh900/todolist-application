import View from "./View.js";
class ListView extends View {
  _parentEl = document.querySelector(".list__task-custom");
  _formEl = document.querySelector(".form--list");
  _inputEl = document.querySelector(".from__input--list");
  _data;
  addHandlerRender(handler) {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const listName = this._inputEl.value;
      if (!listName) return;
      const newList = this._createList(listName);
      handler(newList);
      this._inputEl.value = null;
    });
  }

  addHandlerActiveList(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const listEl = e.target.closest(".list-task");
      if (!listEl) return;
      const { id } = listEl.dataset;
      handler(+id);
    });
  }

  _createList(listName) {
    return {
      id: Date.now(),
      name: listName,
      tasksUncompleted: [],
      tasksCompleted: [],
    };
  }

  _generateMarkup() {
    return this._generateList().join("");
  }
  _generateList() {
    return this._data.map((list) => {
      return ` <div class="list-task  ${
        list.id === this._id ? "active-list" : ""
      }" data-id='${list.id}'>
            ${
              list.id === 1
                ? `  <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 icon icon--sun"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>`
                : ` <svg xmlns="http://www.w3.org/2000/svg" class="icon icon--list" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-o</title><line x1="160" y1="144" x2="448" y2="144" style="fill:none;stroke:#339af0;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"/><line x1="160" y1="256" x2="448" y2="256" style="fill:none;stroke:#339af0;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"/><line x1="160" y1="368" x2="448" y2="368" style="fill:none;stroke:#339af0;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"/><circle cx="80" cy="144" r="16" style="fill:none;stroke:#339af0;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><circle cx="80" cy="256" r="16" style="fill:none;stroke:#339af0;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><circle cx="80" cy="368" r="16" style="fill:none;stroke:#339af0;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`
            }
           
            <h3 class="heading-tertiary">${list.name}</h3>
          </div>`;
    });
  }
}
export default new ListView();
