import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { scrypt as _scrypt, randomBytes } from 'crypto'
import { promisify } from 'util';

const scrypt = promisify(_scrypt)
@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }

    async signup(email: string, password: string) {
        if ((await this.userService.find(email)).length) throw new BadRequestException('email is use')
        //Generate a salt
        const salt = randomBytes(8).toString('hex')
        //hash password and salt together
        const hash = await scrypt(password, salt, 32) as Buffer
        const result = salt + '.' + hash.toString('hex')
        return await this.userService.create(email, result)
    }

    async signin(email: string, password: string) {
        const [user] = await this.userService.find(email);
        if (!user) throw new NotFoundException('User not found');
        const [salt, storedHash] = user.password.split('.')
        const hash = await scrypt(password, salt, 32) as Buffer
        if (storedHash !== hash.toString('hex')) throw new BadRequestException('bad passvord')
        return user
    }

}