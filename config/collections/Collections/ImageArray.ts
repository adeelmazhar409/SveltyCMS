/**
 * @file src/collections/ImageArray.ts
 * @description Collection file for ImageArray
 */

import widgets from '@components/widgets';
import type { Schema } from './types';

export const schema: Schema = {
	// Collection Name coming from filename
	// Optional & Icon, status, slug
	// See for possible Icons https://icon-sets.iconify.design/
	icon: 'bi:images',

	// Defined Fields that are used in Collection
	// Widget fields can be inspected for individual options
	fields: [
		widgets.ImageArray({
			label: 'ImageArray',
			uploader_path: 'images',
			uploader_label: 'image',

			fields: [
				widgets.Text({
					label: 'title',
					db_fieldName: 'title',
					translated: true
				}),

				widgets.Text({
					label: 'Alt Text',
					db_fieldName: 'alt',
					placeholder: 'Enter Alt Text',
					required: true
				})
			]
		})
	]
};