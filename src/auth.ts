import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import type { Session } from '@auth/core/types';
import type { User } from '@auth/core/types';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma';

import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, AUTH_SECRET } from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
	const authOptions = {
		// Add adapter for user database
		adapter: PrismaAdapter(prisma),
		// 2FA providers
		providers: [
			GitHub({
				clientId: GITHUB_CLIENT_ID,
				clientSecret: GITHUB_CLIENT_SECRET
			})
		],
		secret: AUTH_SECRET,
		trustHost: true,
		callbacks: {
			// Add the user id to the session for use in the app
			session: async ({ session, user }: { session: Session; user: User }) => {
				if (session.user) {
					session.user.id = user.id;
				}
				return session;
			}
		}
	};
	return authOptions;
});
