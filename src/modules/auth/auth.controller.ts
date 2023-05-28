import {
  Post,
  Get,
  Request,
  Body,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ClientsService } from '../clients/clients.service';

@ApiTags('login')
@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly clientService: ClientsService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() user: LoginDto) {
    return this.authService.login(user.email);
  }

  @Get('token')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async verifyToken(@Request() req) {
    return this.clientService.findOne(req.user.id, req);
  }
}
