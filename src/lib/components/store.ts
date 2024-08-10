import { writable } from 'svelte/store';

export const postJson = writable(null);
export const postConfig = writable({ imageStyle: 'grid' });
export const postHTML = writable('');
