import { writable } from 'svelte/store';

export const postJson = writable(null);
export const postConfig = writable({});
export const postHTML = writable('');
