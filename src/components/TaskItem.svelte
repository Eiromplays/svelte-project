<script>
  import { tasks } from "../store.js";
  export let task = {};

  let isChecked = task.completed;
  let newTaskDescription = task.description;

  function taskDone() {
    let updatedTasks = $tasks.map((currentTask) => {
      if (currentTask.id === task.id) {
        currentTask.completed = isChecked;
        return currentTask;
      }
      return currentTask;
    });

    tasks.set(updatedTasks);
  }

  function removeTask() {
    let updatedTasks = $tasks.filter((currentTask) => {
      return currentTask.id !== task.id;
    });

    tasks.set(updatedTasks);
  }

  function editTask() {
    let updatedTasks = $tasks.map((currentTask) => {
      if (currentTask.id === task.id) {
        currentTask.description = newTaskDescription;
        return currentTask;
      }
      return currentTask;
    });

    tasks.set(updatedTasks);
  }
</script>

<style>
  .completed {
    color: red;
    text-decoration: line-through;
  }
</style>

<main>
  <li class="list-group-item">
    <input
      type="checkbox"
      class="form-check-input"
      id="exampleCheck1"
      bind:checked={isChecked}
      on:change={(e) => taskDone(e)} />
    <input type="text" bind:value={newTaskDescription} class:completed={task.completed} disabled={task.completed} />
    <br />
    <input
      type="button"
      class="form-check-input"
      value="Delete"
      on:click={(e) => removeTask(e)} />
      <br />
      <input
      type="button"
      class="form-check-input"
      value="Edit"
      on:click={(e) => editTask(e)} />
  </li>
</main>