import type { Session } from '@auth/core/types';

export const GET = async ({ locals }: { locals: { session: Session | null } }) => {
	// Session user id is generated by auth, and cannot be faked by the client
	if (!locals.session?.user?.id) {
		return new Response(JSON.stringify({ error: 'No user id' }), { status: 401 });
	}

	return new Response(JSON.stringify({ message: 'User authenticated' }), { status: 200 });
};