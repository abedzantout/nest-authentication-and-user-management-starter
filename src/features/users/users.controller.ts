import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../../shared/users/services/users.service';
import { UserPayload } from './models/user.payload';
import { UserUpdatePayload } from './models/user-update.payload';
import { User } from '../../shared/users/schemas/user.schema';
import { UserDeletePayload } from './models/user-delete.payload';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async addUser(@Body() createUser: UserPayload): Promise<User> {
    try {
      return await this.usersService.addOne(createUser);
    } catch (e) {
      console.log(e);
    }
  }

  @Get()
  async getUsers() {
    try {
      return await this.usersService.getAll();
    } catch (e) {

    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      return await this.usersService.getById(id);
    } catch (e) {


    }
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  async updateUser(@Body() updatedUser: UserUpdatePayload) {
    try {
      return await this.usersService.updateOne(updatedUser);
    } catch (e) {

    }
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteUser(@Param() userToDelete: UserDeletePayload) {
    try {
      await this.usersService.findByIdAndDelete(userToDelete.id);
      return { success: true };
    } catch (e) {
      console.log(e);
    }
  }
}
