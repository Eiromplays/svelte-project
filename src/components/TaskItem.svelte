<script>
  import { SvelteToast, toast } from '@zerodevx/svelte-toast';
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

        if (!newTaskDescription){
          toast.push('<strong>Danger!</strong> <br />Task description needs to be set!', {
            theme: {
              '--toastBackground': '#F56565',
              '--toastBarBackground': '#C53030'
            }
          });
          newTaskDescription = currentTask.description;
          return currentTask;
        }

        if (currentTask.description === newTaskDescription){
          toast.push('<strong>Danger!</strong> <br />Task description cannot be same as previous description!', {
            theme: {
              '--toastBackground': '#F56565',
              '--toastBarBackground': '#C53030'
            }
          });

          return currentTask;
        }

        currentTask.description = newTaskDescription;

        toast.push(`<strong>Success!</strong> <br />Task <strong>${newTaskDescription}</strong> updated!`, {
          theme: {
            '--toastBackground': 'green',
            '--toastColor': 'white',
            '--toastBarBackground': 'olive'
          }
        });
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

  .form-check-input{
    margin-top: 13.5px !important;
  }
</style>

<main>
  <li class="list-group-item">
    <input
          class="form-control"
          class:completed={task.completed} 
          disabled={task.completed}
          bind:value="{newTaskDescription}"
          placeholder="Task Description"
    />
    <input
      type="checkbox"
      class="form-check-input"
      id="task-is-completed"
      bind:checked={isChecked}
      on:change={(e) => taskDone(e)} />
    <input
      type="button"
      class="btn btn-danger m-1"
      value="Delete"
      on:click={(e) => removeTask(e)} />
    <input
      type="button"
      class="btn btn-success m-1"
      value="Edit"
      on:click={(e) => editTask(e)} />
  </li>
</main>