import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	email: string

	@MinLength(8, { message: 'Password must be at least 8 character' })
    @IsString()
	password: string
}
