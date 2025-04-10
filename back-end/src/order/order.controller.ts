import { Controller, Get } from '@nestjs/common'
import { OrderService } from './order.service'
import { Auth } from 'src/decorators/auth.decorator'
import { CurrentUser } from 'src/decorators/user.decorator'

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: number) {
		return this.orderService.getAll(userId)
	}
}
