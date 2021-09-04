import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../../entities/user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { hasRoles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Request } from 'express';
import { ResponseDto } from 'src/dto/response.dto';
import { CommonService } from '../common/common.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly commonService: CommonService,
  ) {}

  @Get()
  @hasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUsers(@Req() req: Request): Promise<ResponseDto> {
    const data: Object = {
      user: req.user,
      users: await this.usersService.getUsers(),
    };
    return this.commonService.successRes(data, null);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.createUser(data);
  }
}
