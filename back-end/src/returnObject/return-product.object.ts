import { Prisma } from '@prisma/client'
import { returnReviewObject } from './return-review.object'
import { categoryReturnObject } from './return-category'

export const productReturnObject: Prisma.ProductSelect = {
	name: true,
	description: true,
	id: true,
	price: true,
	created_at: true,
	slug: true
}

export const productReturnFullestObject: Prisma.ProductSelect = {
	...productReturnObject,
	reviews: {
		select: returnReviewObject
	},
	category: { select: categoryReturnObject }
}
