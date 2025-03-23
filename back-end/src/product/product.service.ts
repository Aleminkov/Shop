import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { EnumProductSort, GetAllProductDto } from 'src/dto/get-all-product.dto'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import {
	productReturnFullestObject,
	productReturnObject
} from './../returnObject/return-product.object'
import { ProductDto } from 'src/dto/product.dto'
import { generateSlug } from 'src/utils/slug-generate'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private pagination: PaginationService
	) {}

	async getAll(dto: GetAllProductDto = {}) {
		const { sort, searchTerm } = dto

		const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []
	
        if (sort === EnumProductSort.HIGH_PRICE) {
			prismaSort.push({ price: 'desc' })
		} else if (sort == EnumProductSort.LOW_PRICE) {
			prismaSort.push({ price: 'asc' })
		} else if (sort === EnumProductSort.NEWEST) {
			prismaSort.push({ price: 'desc' })
		} else {
			prismaSort.push({ price: 'asc' })
		}
	
        const prismaSearchTernFilter: Prisma.ProductWhereInput = searchTerm
			? {
					OR: [
						{
							category: {
								name: { contains: searchTerm, mode: 'insensitive' }
							}
						},
						{
							name: {
								contains: searchTerm,
								mode: 'insensitive'
							}
						},
						{
							description: {
								contains: searchTerm,
								mode: 'insensitive'
							}
						}
					]
				}
			: {}
		const { perPage, skip } = this.pagination.getPagination(dto)

		const product = await this.prisma.product.findMany({
			where: prismaSearchTernFilter,
			skip,
			take: perPage,
			orderBy: prismaSort
		})
		return {
			product,
			length: await this.prisma.product.count({ where: prismaSearchTernFilter })
		}
	}

	async byId(id: number) {
		const product = await this.prisma.product.findUnique({
			where: { id },
			select: productReturnFullestObject
		})
		if (!product) throw new NotFoundException('Product not found')

		return product
	}

	async bySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: { slug },
			select: productReturnFullestObject
		})
		if (!product) throw new NotFoundException('Product not found')

		return product
	}

	async byCategory(categorySlug: string) {
		const product = await this.prisma.product.findMany({
			where: { category: { slug: categorySlug } }
		})
		if (!product) throw new NotFoundException('Product not found')

		return product
	}
	
    async create(dto: ProductDto) {
		const product = await this.prisma.product.create({
			data: {
				name: dto.name,
				price: dto.price,
				description: dto.description,
				slug: generateSlug(dto.name)
			}
		})

		return product.id
	}
	
    async update(id: number, dto: ProductDto) {
		const { name, price, description, categoryId } = dto

		return this.prisma.product.update({
			where: { id },
			data: {
				name,
				slug: generateSlug(name),
				description,
				price,
				category: { connect: { id: categoryId } }
			}
		})
	}
	
    async delete(id: number) {
		return this.prisma.product.delete({ where: { id } })
	}
	
    async getSimilar(id: number) {
		const currentProduct = await this.byId(id)

		if (!currentProduct)
			throw new NotFoundException('Current product not found!')

		const product = await this.prisma.product.findMany({
			where: {
				category: {
					name: currentProduct.category.name
				},
				NOT: {
					id: currentProduct.id
				}
			},
			orderBy: { created_at: 'desc' },
			select: productReturnObject
		})
		return product
	}
}
