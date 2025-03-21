import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { PrismaService } from './../prisma.service'
import { AuthDto } from 'src/dto/auth.dto'
import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { GetUser } from 'src/getUser.service'

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private user: GetUser
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const token = await this.issueToken(user.id)

		return {
			user: this.returnUserFields(user),
			...token
		}
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid token')

		const user = await this.user.getById(result)

		const token = await this.issueToken(user.id)
		return {
			user: this.returnUserFields(user),
			...token
		}
	}

	async register(dto: AuthDto) {
		const checkUser = await this.user.getByEmail(dto.email)

		if (checkUser) throw new BadRequestException('Email already exists')

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				name: faker.name.firstName(),
				password: await hash(dto.password)
			}
		})

		const token = this.issueToken(user.id)

		return {
			user: this.returnUserFields(user),
			...token
		}
	}

	private async issueToken(userId: number) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})
		return { accessToken, refreshToken }
	}

	private returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email
		}
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.user.getByEmail(dto.email)

		if (!user) throw new NotFoundException('User not found')

		const isValidate = await verify(user.password, dto.password)

		if (!isValidate) throw new UnauthorizedException('Invalid password')

		return user
	}
}
