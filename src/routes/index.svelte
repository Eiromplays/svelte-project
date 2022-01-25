<script>
  import { onMount } from "svelte";
  import { isAuthenticated, user, user_tasks, tasks } from "../store.js";
  import auth from "../authService.js";
  import TaskItem from "../components/TaskItem.svelte";
  import { SvelteToast, toast } from '@zerodevx/svelte-toast';
  import Lazy from 'svelte-lazy';

  let auth0Client;
  let newTask;

  onMount(async () => {
    auth0Client = await auth.createClient();

    isAuthenticated.set(await auth0Client.isAuthenticated());
    user.set(await auth0Client.getUser());
  });

  function login() {
    auth.loginWithPopup(auth0Client);
  }

  function logout() {
    auth.logout(auth0Client);
  }

  function addItem() {
    if (!newTask){
      toast.push('<strong>Danger!</strong> <br />Task description needs to be set!', {
        theme: {
          '--toastBackground': '#F56565',
          '--toastBarBackground': '#C53030'
        }
      });
      return;
    }

    let newTaskObject = {
      id: genRandom(),
      description: newTask,
      completed: false,
      user: $user.email
    };

    let updatedTasks = [...$tasks, newTaskObject];

    tasks.set(updatedTasks);

    toast.push(`<strong>Success!</strong> <br />Task <strong>${newTask}</strong> added!`, {
      theme: {
        '--toastBackground': 'green',
        '--toastColor': 'white',
        '--toastBarBackground': 'olive'
      }
    });

    newTask = "";
  }

  function genRandom(length = 7) {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }

  function settings(){
    toast.push('<strong>404!</strong> <br />Settings not found!', {
        theme: {
          '--toastBackground': '#F56565',
          '--toastBarBackground': '#C53030'
        }
    });
  }
</script>

<style>
  #main-application {
    margin-top: 50px;
  }

  .list-group{
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .list-group{
      flex-direction: column;
    }
  }
</style>

  <!-- App Bar -->
  <!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <!-- Container wrapper -->
  <div class="container-fluid">
    <!-- Toggle button -->
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Collapsible wrapper -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!-- Navbar brand -->
      <a class="navbar-brand mt-2 mt-lg-0" href="/">
        Eirik Svelte Project
      </a>
      <!-- Left links -->
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="/">Home</a>
        </li>
      </ul>
      <!-- Left links -->
    </div>
    <!-- Collapsible wrapper -->

    <!-- Right elements -->
    <div class="d-flex align-items-center">
      {#if $isAuthenticated}
        <div class="dropdown">
          <a
            class="dropdown-toggle d-flex align-items-center hidden-arrow"
            href="/"
            id="navbarDropdownMenuAvatar"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false">
            <img
              src={$user.picture}
              class="rounded-circle"
              height="25"
              alt="User"
              loading="lazy"
            />&nbsp;
            {$user.name}
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuAvatar">
            <li>
              <a class="dropdown-item" href="/" on:click="{settings}">Settings</a>
            </li>
            <li>
              <a class="dropdown-item" href="/" on:click="{logout}">Logout</a>
            </li>
          </ul>
        </div>
      {:else}
        <button type="button" class="btn btn-link px-3 me-2" on:click="{login}">
          Login
        </button>
      {/if}
    </div>
    <!-- Right elements -->
  </div>
  <!-- Container wrapper -->
</nav>

<!-- Application -->
{#if !$isAuthenticated}
<div class="container mt-5">
  <div class="row">
    <div class="col-md-10 offset-md-1">
      <div class="jumbotron">
        <h1 class="display-4">Task Management made Easy!</h1>
        <p class="lead">Instructions</p>
        <ul>
          <li>Login to start &#128272;</li>
          <li>Create Tasks &#128221;</li>
          <li>Tick off completed tasks &#9989;</li>
        </ul>
        <a
          class="btn btn-primary btn-lg mr-auto ml-auto"
          href="/"
          role="button"
          on:click="{login}"
          >Log In</a
        >
      </div>
    </div>
  </div>
</div>
{:else}
<Lazy height={1}>
  <div class="container" id="main-application">
    <div class="row">
      <div class="col-md-6 text-center">
        {#if ($user_tasks.length > 0)}
            <h4>Your Tasks ({$user_tasks.length}):</h4>
            <h6>Completed tasks ({$user_tasks.filter(task => task.completed).length})</h6>
          {/if}
        <ul class="list-group">
          {#if ($user_tasks.length > 0)}
          {#each $user_tasks as item (item.id)}
            <Lazy height={300}><TaskItem task="{item}" /><br /></Lazy>
          {/each}
          {:else}
            <li class="list-group-item show fade disabled">No tasks available</li>
          {/if}
        </ul>
      </div>
      <div class="col-md-6">
        <input
          class="form-control"
          bind:value="{newTask}"
          placeholder="Enter New Task"
        />
        <br />
        <button type="button" class="btn btn-primary" on:click="{addItem}">
          Add Task
        </button>
      </div>
    </div>
  </div>
</Lazy>
{/if}

<SvelteToast />