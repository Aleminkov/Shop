import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryDto } from 'src/dto/category.dto'
import { Auth } from 'src/decorators/auth.decorator'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async getAll() {
		return this.categoryService.getAll()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(@Param('id') id: string, @Body() dto: CategoryDto) {
		return this.categoryService.update(+id, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async create(@Body() dto: CategoryDto) {
		return this.categoryService.create(dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string) {
		return this.categoryService.delete(+id)
	}

	@Get('by-slug/:slug')
	async bySlug(slug: string) {
		return this.categoryService.bySlug(slug)
	}

	@Get(':id')
	async byId(id: string) {
		return this.categoryService.byId(+id)
	}
}
