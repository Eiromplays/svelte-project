<script>
  import { tasks } from "../store.js";
  export let task = {};

  let isChecked;

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
    <span class:completed={task.completed}>{task.description}</span>
    <br />
    <input
      type="button"
      class="form-check-input"
      value="Delete"
      on:click={(e) => removeTask(e)} />
  </li>
</main>