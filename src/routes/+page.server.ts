/**
 * @file src/routes/+page.server.ts
 * @description
 * Server-side logic for the root route, handling redirection to the first collection with the correct language.
 */

import { publicEnv } from '@root/config/public';
import { redirect, error, type HttpError } from '@sveltejs/kit';

// Collection Manager
import { collectionManager } from '@src/collections/CollectionManager';

// System Logger
import { logger } from '@utils/logger.svelte';

export const load: PageServerLoad = async ({ locals, url }) => {
	logger.debug('Starting +page.server.ts load function');

	// Unauthenticated users should be redirected to the login page
	if (!locals.user) {
		logger.info('User is not authenticated, redirecting to login');
		throw redirect(302, '/login');
	}

	try {
		// Get the list of collections
		const collections = collectionManager.getCollectionData()?.collections;

		// If there are no collections, throw a 404 error
		if (!collections?.length) {
			logger.error('No collections available for redirection');
			throw error(404, 'No collections found');
		}

		// If the current route is not the root route, simply return the user data
		if (url.pathname !== '/') {
			logger.debug(`Already on route ${url.pathname}`);
			return { user: locals.user, permissions: locals.permissions };
		}

		// Get the first collection and the default language
		const firstCollection = collections[0];
		const defaultLanguage = publicEnv.DEFAULT_CONTENT_LANGUAGE || 'en';

		// Construct the redirect URL
		const redirectUrl = `/${defaultLanguage}/${firstCollection.name}`;

		logger.info(`Redirecting to ${redirectUrl}`);
		throw redirect(302, redirectUrl);
	} catch (err) {
		// If the error has a status, rethrow it
		if ((err as HttpError)?.status) throw err;

		logger.error('Unexpected error in load function', err);
		throw error(500, 'An unexpected error occurred');
	}
};
