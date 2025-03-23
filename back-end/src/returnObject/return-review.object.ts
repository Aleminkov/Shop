import { Prisma } from '@prisma/client'
import { returnUserObject } from './return-user.object'

export const returnReviewObject: Prisma.ReviewSelect = {
	user: {
		select: returnUserObject
	},
	created_at: true,
	text: true,
	rating: true,
	id: true
}
