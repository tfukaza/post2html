import { redirect, type Handle } from '@sveltejs/kit';
import { handle as authenticationHandle } from './auth';
import { sequence } from '@sveltejs/kit/hooks';
import type { Session } from '@auth/core/types';
import type { RequestEvent } from '@sveltejs/kit';

declare global {
	namespace App {
		interface Locals {
			session: Session | null;
		}
	}
}

async function authorizationHandle({ event, resolve }: { event: RequestEvent; resolve: any }) {
	// Protect any routes under /authenticated
	if (event.url.pathname.startsWith('/api/protected')) {
		const session: Session | null = await event.locals.auth();
		if (!session) {
			// Redirect to the signin page
			throw redirect(303, 'http://localhost:5173/signin');
		}
		event.locals.session = session;
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
}

// First handle authentication, then authorization
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(authenticationHandle, authorizationHandle);
