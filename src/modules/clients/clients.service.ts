import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsRepository } from './repositories/clients.repository';

@Injectable()
export class ClientsService {
  constructor(private clientRepository: ClientsRepository) {}

  async create(createClientDto: CreateClientDto) {
    const findClient = await this.clientRepository.findByEmail(
      createClientDto.email,
    );

    if (findClient) {
      throw new ConflictException('User already exists');
    }
    return this.clientRepository.create(createClientDto);
  }

  findAll(req: any) {
    if (!req.user.admin) {
      throw new UnauthorizedException('user not authorized');
    }

    return this.clientRepository.findAll();
  }

  async findOne(id: string, req: any) {
    if (!req.user.admin && req.user.id !== id) {
      throw new UnauthorizedException('user not authorized');
    }
    const findClient = await this.clientRepository.findOne(id);
    if (!findClient) {
      throw new NotFoundException('user not found');
    }
    return this.clientRepository.findOne(id);
  }

  async findByEmail(email: string) {
    const client = await this.clientRepository.findByEmail(email);
    return client;
  }

  update(id: string, updateClientDto: UpdateClientDto, req: any) {
    if (!req.user.admin && req.user.id !== id) {
      throw new UnauthorizedException('user not authorized');
    }
    const findUser = this.clientRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('user not found');
    }
    return this.clientRepository.update(id, updateClientDto);
  }

  remove(id: string, req: any) {
    if (!req.user.admin && req.user.id !== id) {
      throw new UnauthorizedException('user not authorized');
    }
    const findUser = this.clientRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('user not found');
    }
    return this.clientRepository.delete(id);
  }
}
