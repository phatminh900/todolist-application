import * as model from "./model.js";
import listView from "./views/listView.js";
import taskCompletedView from "./views/taskCompletedView.js";
import taskView from "./views/tasksView.js";
// import taskUnCompleted from './views/taskUncompletedView.js'
import tasksView from "./views/tasksView.js";
import taskUncompletedView from "./views/taskUncompletedView.js";

function controllAddList(newList) {
  // Add new List
  model.addList(newList);
  console.log(model.state.lists);

  // Render New list
  listView.render(model.state.lists);
}
function controllListActive(id) {
  //add selected id
  model.addSelectedList(+id);

//   render list
  listView.render(model.state.lists, model.state.selectedId);

//   render uncompleted/completedtask task 
  taskUncompletedView.render(model.state.lists, model.state.selectedId);

  taskCompletedView.render(model.state.lists, model.state.selectedId);
  controllTask();

  tasksView.displayCountCompletedTask();
}

function controllTask() {
    //render coresponding task
  taskView.render(model.state.lists, model.state.selectedId);
}

function controllAddTask(newTask) {
    //add new task
  model.addTask(newTask);
    //render in uncompleted task
  taskUncompletedView.render(model.state.lists, model.state.selectedId);
}

function controlDeleteList(id) {
    // delete list
  model.deleteList(id);

//   render list task
  listView.render(model.state.lists);
  taskView.render(model.state.lists);
}

function controllCheckedStage(id) {
    //toggle completed task
  model.toggleCheckedStage(id);

//   render completed/uncompleted task
  taskUncompletedView.render(model.state.lists, model.state.selectedId);
  taskCompletedView.render(model.state.lists, model.state.selectedId);
//   update completed count
  tasksView.displayCountCompletedTask();
}
function controllUnCheckedStage(id) {
     //toggle completed task
  model.toggleUnCheckedStage(id);

//   render completed/uncompleted task
taskUncompletedView.render(model.state.lists, model.state.selectedId);
taskCompletedView.render(model.state.lists, model.state.selectedId);
//   update completed count
tasksView.displayCountCompletedTask();
}

function controllDeleteTask(id) {
    // delete task
  model.deleteTask(id);

//   render completed/uncompleted task
taskUncompletedView.render(model.state.lists, model.state.selectedId);
taskCompletedView.render(model.state.lists, model.state.selectedId);
//   update completed count
tasksView.displayCountCompletedTask();
}

function addNewFeature(){
  console.log('Welcome to the application');
}

function init() {
  listView.addHandlerRender(controllAddList);
  listView.addHandlerActiveList(controllListActive);

  controllListActive(model.state.selectedId);
  //render in beginning
  listView.render(model.state.lists);
  taskUncompletedView.render(model.state.lists, model.state.selectedId);
  taskCompletedView.render(model.state.lists, model.state.selectedId);

  listView.render(model.state.lists, model.state.selectedId);

  tasksView.addHandlerDeleteList(controlDeleteList);
  tasksView.displayCountCompletedTask();
  taskUncompletedView.addHandlerRender(controllAddTask);
  taskUncompletedView.addHandlerChecked(controllCheckedStage);
  taskUncompletedView.addHandlerDelete(controllDeleteTask);
  taskCompletedView.addHandlerUnChecked(controllUnCheckedStage);
  taskCompletedView.addHandlerDelete(controllDeleteTask);
  addNewFeature()
}
init();
