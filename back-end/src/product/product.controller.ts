import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ProductService } from './product.service'
import { GetAllProductDto } from 'src/dto/get-all-product.dto'
import { Auth } from 'src/decorators/auth.decorator'
import { ProductDto } from 'src/dto/product.dto'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll(@Query() queryDto: GetAllProductDto) {
		return this.productService.getAll(queryDto)
	}

	@Get('similar/:id')
	async getSimilar(@Param('id') id: string) {
		return this.productService.getSimilar(+id)
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.productService.bySlug(slug)
	}

	@Get('by-category/:categorySlug')
	async getByCategorySlug(@Param('categorySlug') slug: string) {
		return this.productService.byCategory(slug)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async createProduct(@Body() dto: ProductDto) {
		return this.productService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async updateProduct(@Body() dto: ProductDto, @Param('id') id: string) {
		return this.productService.update(+id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async deleteProduct(@Param('id') id: string) {
		return this.productService.delete(+id)
	}
}
