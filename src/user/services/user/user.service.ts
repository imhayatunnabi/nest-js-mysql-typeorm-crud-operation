import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/User';
import { UserDto } from 'src/user/dtos/UserDto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async getUsers(page: number, limit: number): Promise<User[]> {
        const skip = (page - 1) * limit;
        return this.userRepository.find({
            skip,
            take: limit,
        });
    }

    async findUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOneById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async createUser(userDto: UserDto): Promise<User> {
        try {
            const newUser = this.userRepository.create({ ...userDto, created_at: new Date() });
            return this.userRepository.save(newUser);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create user. Please try again later.');
        }
    }

    async updateUser(id: number, userDto: UserDto): Promise<User> {
        const existingUser = await this.findUserById(id);
        const updatedUser = { ...existingUser, ...userDto };
        return this.userRepository.save(updatedUser);
    }

    async deleteUser(id: number): Promise<void> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
