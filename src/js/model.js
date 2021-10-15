import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_SELECTED_ID } from "./config.js";
export const state = {
  lists: [],
  selectedId: null,
};

export function addList(list) {
  state.lists.push(list);

  saveLocal();
}
export function deleteList(id) {
  const listIndex = state.lists.findIndex((list) => list.id === id);

  state.lists.splice(listIndex, 1);

  saveLocal();
}
export function addTask(task) {
  const listEl = state.lists.find((list) => list.id === state.selectedId);

  listEl.tasksUncompleted.push(task);

  saveLocal();
}
export function addSelectedList(id) {
  state.selectedId = id;
  saveLocal();
}

export function toggleCheckedStage(id) {
  // find list contains task
  const listEl = state.lists.find((list) => list.id === state.selectedId);
  //find task contains given id
  const taskEl = listEl.tasksUncompleted.find((task) => task.id === id);
  taskEl.completed = !taskEl.completed;
  //add to completed task
  listEl.tasksCompleted.push(taskEl);
  //remove from task uncompleted
  const taskElIndex = listEl.tasksUncompleted.findIndex(
    (task) => task.id === id
  );
  listEl.tasksUncompleted.splice(taskElIndex, 1);

  saveLocal();
}

export function toggleUnCheckedStage(id) {
  // find list contains task
  const listEl = state.lists.find((list) => list.id === state.selectedId);
  //find task contains given id
  const taskEl = listEl.tasksCompleted.find((task) => task.id === id);
  taskEl.completed = !taskEl.completed;
  //add to uncompleted task
  listEl.tasksUncompleted.push(taskEl);
  //remove from task completed
  const taskElIndex = listEl.tasksCompleted.findIndex((task) => task.id === id);
  listEl.tasksCompleted.splice(taskElIndex, 1);

  saveLocal();
}

export function deleteTask(id) {
  // find list contains task
  const listEl = state.lists.find((list) => list.id === state.selectedId);
  //find task contains given id
  const allTasks = [...listEl.tasksCompleted, ...listEl.tasksUncompleted];
  //find task deleted
  const taskEl = allTasks.find((task) => task.id === id);

  const taskUncompletedIndex = listEl.tasksUncompleted.findIndex(
    (task) => task.id === taskEl.id
  );
  const taskCompletedIndex = listEl.tasksCompleted.findIndex(
    (task) => task.id === taskEl.id
  );

  if (taskUncompletedIndex !== -1)
    listEl.tasksUncompleted.splice(taskUncompletedIndex, 1);

  if (taskCompletedIndex !== -1)
    listEl.tasksCompleted.splice(taskCompletedIndex, 1);

  saveLocal();
}

function saveLocal() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.lists));

  localStorage.setItem(LOCAL_STORAGE_KEY_SELECTED_ID, state.selectedId);
}

function getLocal() {
  const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  const seclectedID = localStorage.getItem(LOCAL_STORAGE_KEY_SELECTED_ID);
  if (!seclectedID) return;
  state.selectedId = seclectedID;
  if (!data) return;
  state.lists = data;
}

function clearLocal() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  localStorage.removeItem(LOCAL_STORAGE_KEY_SELECTED_ID);
}
// clearLocal()

function init() {
  getLocal();
  // unshift my day list
  !state.lists.some((list) => list.id === 1)
    ? state.lists.unshift({
        id: 1,
        name: "My Day",
        tasksUncompleted: [],
        tasksCompleted: [],
      })
    : "";
}
init();
