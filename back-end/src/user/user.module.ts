import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from 'src/prisma.service'
import { GetUser } from 'src/get-user.service'

@Module({
	controllers: [UserController, PrismaService],
	providers: [UserService, GetUser]
})
export class UserModule {}
