import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }
    create = (email: string, password: string) => this.repo.save(this.repo.create({ email, password }))

    findOne = (id: number) => this.repo.findOne({ where: { id } })

    find = (email: string) => this.repo.find({ where: { email } })

    update = async (id: number, attrs: Partial<User>) => {
        const user = await this.findOne(id)
        if (!user) throw new NotFoundException('User not found');
        Object.assign(user, attrs)
        return this.repo.save(user)
    }
    remove = async (id: number) => {
        const user = await this.findOne(id)
        if (!user) throw new NotFoundException('User not found');
        return this.repo.remove(user)
    }



}