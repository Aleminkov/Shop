import { Injectable, NotFoundException } from '@nestjs/common'
import { CategoryDto } from 'src/dto/category.dto'
import { PrismaService } from 'src/prisma.service'
import { categoryReturnObject } from 'src/returnObject/return-category'
import { generateSlug } from 'src/utils/slug-generate'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number) {
		const category = await this.prisma.category.findUnique({
			where: { id },
			select: categoryReturnObject
		})
		if (!category) throw new NotFoundException('Category not found')

		return category
	}

	async bySlug(slug: string) {
		const category = this.prisma.category.findUnique({
			where: { slug },
			select: categoryReturnObject
		})
		if (!category) throw new NotFoundException('Category not found!')

		return category
	}

	async getAll() {
		return await this.prisma.category.findMany({ select: categoryReturnObject })
	}

	async create(dto: CategoryDto) {
		const newProduct = await this.prisma.category.create({
			data: {
				name: dto.name,
				slug: generateSlug(dto.name)
			}
		})
		return { message: 'Product created successful', newProduct }
	}

	async update(id: number, dto: CategoryDto) {
		const product = await this.prisma.category.update({
			where: { id },
			data: { name: dto.name, slug: generateSlug(dto.name) }
		})
		return product
	}
	async delete(id: number) {
		return await this.prisma.category.delete({ where: { id } })
	}
}
