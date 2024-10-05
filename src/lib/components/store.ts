import { writable } from 'svelte/store';
import type { ProcessedXData } from '$lib/x_types';

export const postJson: any = writable(null);

export const postHTML = writable('');
