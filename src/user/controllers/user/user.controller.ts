import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import { UserDto } from 'src/user/dtos/UserDto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    // constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    @Get('/index')
    getUser() {

    }
    @Post('store')
    @UsePipes(new ValidationPipe())
    postUser(@Body() userDto: UserDto) {
        return this.userService.postUser(userDto);
    }
    @Get('find/:id')
    findUser(@Param('id', ParseIntPipe) id: number) {

    }
    @Put('update/:id')
    updateUser(@Param('id', ParseIntPipe) id: number) {

    }
    @Delete('delete/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {

    }
}
