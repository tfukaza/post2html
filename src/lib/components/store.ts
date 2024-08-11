import { writable } from 'svelte/store';
import type { ProcessedXData } from '$lib/x_types';

export const postJson: ProcessedXData | null = writable(null);
// export const postConfig = writable({
// 	imageStyle: 'grid',
// 	imageFull: false
// } as XPostConfig);
export const postHTML = writable('');
