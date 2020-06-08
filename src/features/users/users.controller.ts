import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserPayload } from './models/user.payload';
import { UserUpdatePayload } from './models/user-update.payload';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  async addUser(@Body() createUser: UserPayload) {
    try {
      return await this.usersService.addOne(createUser);
    } catch (e) {

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
  async updateUser(@Body() updatedUser: UserUpdatePayload) {
    try {
      return await this.usersService.updateOne(updatedUser);
    } catch (e) {

    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.usersService.deleteOne(id);
    } catch (e) {

    }
  }
}
