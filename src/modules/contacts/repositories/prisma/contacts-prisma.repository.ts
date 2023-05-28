import { Injectable } from '@nestjs/common';
import { ContactsRepository } from '../contacts.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateContactDto } from '../../dto/update-contact.dto';

@Injectable()
export class ContactsPrismaRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateContactDto, clientId: string): Promise<Contact> {
    const contact = new Contact({ ...data });

    const newContact = await this.prisma.contact.create({
      data: { ...contact, clientId },
    });

    return plainToInstance(Contact, newContact);
  }

  async findAll(clientId: string): Promise<Contact[]> {
    const contacts = await this.prisma.contact.findMany();

    const filteredContacts = contacts.filter(
      (contact) => contact.clientId === clientId,
    );

    return plainToInstance(Contact, filteredContacts);
  }

  async findOne(id: string): Promise<Contact | undefined> {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });

    return plainToInstance(Contact, contact);
  }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const contact = await this.prisma.contact.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(Contact, contact);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.contact.delete({
      where: { id },
    });
  }
}
