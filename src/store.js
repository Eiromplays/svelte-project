import { persist, localStorage } from "@macfja/svelte-persistent-store";
import { writable, derived } from "svelte/store";

export const isAuthenticated = persist(writable(false), localStorage(), 'isAuthenticated');
export const user = writable({});
export const popupOpen = writable(false);
export const error = writable();

export let tasks = persist(writable([]), localStorage(), 'eirik-svelte-tasks')

export const user_tasks = derived([tasks, user], ([$tasks, $user]) => {
	let logged_in_user_tasks = [];

	if ($user && $user.email) {
		logged_in_user_tasks = $tasks.filter((task) => task.user === $user.email);
	}

	return logged_in_user_tasks;
});