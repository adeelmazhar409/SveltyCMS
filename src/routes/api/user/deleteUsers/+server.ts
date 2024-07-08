import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { auth } from '@api/databases/db'; // Import the auth instance

// Import logger
import logger from '@utils/logger';

export const DELETE: RequestHandler = async (event) => {
	try {
		const { request } = event;
		const { user_ids } = await request.json();

		if (!auth) {
			logger.error('Authentication system is not initialized');
			throw error(500, 'Internal Server Error');
		}

		for (const user_id of user_ids) {
			await auth.deleteUser(user_id);
			logger.info(`User deleted successfully with user ID: ${user_id}`);
		}

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		const err = error as Error;
		logger.error(`Failed to delete users: ${err.message}`);
		return new Response(JSON.stringify({ message: 'Failed to delete users' }), { status: 500 });
	}
};