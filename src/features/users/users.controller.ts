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
import { ResponseError, ResponseSuccess } from '../../core/response/response';
import { InvitationRequestService } from './services/invitation-request.service';
import { ConsentRegistryService } from '../../shared/auth/services/consent-registry.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly invitationService: InvitationRequestService,
    private readonly consentRegistryService: ConsentRegistryService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async addUser(@Body() createInvitation: InvitationPayload): Promise<any> {
    try {
      const invitationEmailSent = await this.invitationService.invite(
        createInvitation.email,
      );
      if (invitationEmailSent) {
        return new ResponseSuccess('USERS.INVITATION_EMAIL_SENT', null);
      }
      return new ResponseError('USERS.ERROR_INVITING_USER');
    } catch (e) {
      return new ResponseError(e.message);
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
  async updateUser(@Body() userToUpdate: UserUpdatePayload) {
    try {
      const updatedUser = await this.usersService.updateOne(userToUpdate);
      return new ResponseSuccess('USERS.SUCCESSFULLY_UPDATED', updatedUser);
    } catch (e) {
      return new ResponseSuccess('USERS.ERROR_UPDATING_USER', e);
    }
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteUser(@Param() userToDelete: UserDeletePayload) {
    try {
      const user = await this.usersService.findByIdAndDelete(userToDelete.id);
      await this.consentRegistryService.deleteConsent(user.email);
      return new ResponseSuccess('USERS.SUCCESSFULLY_DELETED');
    } catch (e) {
      return new ResponseSuccess('USERS.ERROR_DELETING_USER', e);
    }
  }
}
