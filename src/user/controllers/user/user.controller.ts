import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { User } from 'src/entities/User';
import { UserDto } from 'src/user/dtos/UserDto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<User[]> {
        return this.userService.getUsers(page, limit);
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.findUserById(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(@Body() userDto: UserDto): Promise<User> {
        return this.userService.createUser(userDto);
    }

    @Put(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() userDto: UserDto): Promise<User> {
        return this.userService.updateUser(id, userDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.userService.deleteUser(id);
    }
}
