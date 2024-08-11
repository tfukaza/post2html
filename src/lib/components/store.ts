import { writable } from 'svelte/store';
import type { XPostConfig } from '$lib/x_types';

export const postJson = writable(null);
export const postConfig = writable({
	imageStyle: 'grid',
	imageFull: true
} as XPostConfig);
export const postHTML = writable('');
