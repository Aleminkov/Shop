import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { hash } from 'argon2'
import { UserDto } from 'src/dto/user.dto'
import { GetUser } from 'src/get-user.service'
import { PrismaService } from 'src/prisma.service'
import { returnUserObject } from 'src/returnObject/return-user.object'

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private user: GetUser
	) {}

	async byId(userId: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				...returnUserObject,
				favorites: {
					select: {
						id: true,
						name: true,
						price: true,
						slug: true
					}
				},
				...selectObject
			}
		})
		if (!user) throw new Error('User not found')
		return user
	}

	async updateProfile(id: number, dto: UserDto) {
		const isSameUser = await this.user.getByEmail(dto.email)
		if (isSameUser && id == isSameUser.id)
			throw new BadRequestException('Email already in use')
		const user = await this.byId(id, { password: true })

		return this.prisma.user.update({
			where: { id },
			data: {
				email: dto.email,
				name: dto.name,
				password: dto.password ? await hash(dto.password) : user.password
			}
		})
	}

	async toggleFavorite(userId: number, productId: number) {
		const user = await this.byId(userId)
		if (!user) throw new NotFoundException('User not found')

		const isExists = user.favorites.some(product => product.id == productId)

		await this.prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				favorites: { [isExists ? 'disconnect' : 'connect']: { id: productId } }
			}
		})

		return { message: 'Success' }
	}
}
