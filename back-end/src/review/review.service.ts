import { Injectable } from '@nestjs/common'
import { ReviewDto } from 'src/dto/review.dto'
import { PrismaService } from 'src/prisma.service'
import { returnReviewObject } from 'src/returnObject/return-review.object'

@Injectable()
export class ReviewService {
	constructor(private prisma: PrismaService) {}
	async getAll() {
		return this.prisma.review.findMany({
			orderBy: { created_at: 'desc' },
			select: returnReviewObject
		})
	}

	async create(userId: number, productId: number, dto: ReviewDto) {
		const review = await this.prisma.review.create({
			data: {
				...dto,
				product: { connect: { id: productId } },
				user: { connect: { id: userId } }
			}
		})
        return {message:'successful', review}
	}

	async getAvaregeValueByProductId(productId: number) {
		return this.prisma.review
			.aggregate({
				where: { product_id: productId },
				_avg: { rating: true }
			})
			.then(data => data._avg)
	}
}
