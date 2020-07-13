import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../../shared/users/services/users.service';
import { UserUpdatePayload } from './payloads/user-update.payload';
import { UserDeletePayload } from './payloads/user-delete.payload';
import { InvitationPayload } from './payloads/invitation.payload';
import { InvitationService } from '../../shared/invitation/services/invitation.service';
import { ResponseError, ResponseSuccess } from '../../core/response/response';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly invitationService: InvitationService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async addUser(@Body() createInvitation: InvitationPayload): Promise<any> {
    try {
      const invitationEmailSent = await this.invitationService.inviteUser(
        createInvitation.email,
      );
      if (invitationEmailSent) {
        return new ResponseSuccess('USERS.INVITATION_EMAIL_SENT', null);
      }
      return new ResponseError('USERS.ERROR_INVITING_USER');
    } catch (e) {
      return new ResponseError('USERS.ERROR_ADDING_USER', e);
    }
  }

  @Get()
  async getUsers() {
    try {
      return await this.usersService.getAll();
    } catch (e) {}
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      return await this.usersService.getById(id);
    } catch (e) {}
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  async updateUser(@Body() updatedUser: UserUpdatePayload) {
    try {
      return await this.usersService.updateOne(updatedUser);
    } catch (e) {}
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
