import { Prisma } from '@prisma/client'

export const productReturnObject: Prisma.ProductSelect = {
	name: true,
	description: true,
	id: true,
	price: true,
	created_at: true,
	slug: true
}
