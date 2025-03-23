import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'

Injectable()
export class GetUser {
	constructor(private prisma: PrismaService) {}
	async getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: { email: email }
		})
	}
	async getById(id: number) {
		return this.prisma.user.findUnique({
			where: { id: id }
		})
	}
}
