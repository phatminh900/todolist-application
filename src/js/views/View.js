export default class View {
  _data;

  render(data, id = null, render = true) {
    this._data = data;
    this._id = id;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this.clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  clear() {
    this._parentEl.innerHTML = "";
  }
}
