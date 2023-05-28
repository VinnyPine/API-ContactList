import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private contactRepository: ContactsRepository) {}

  async create(createContactDto: CreateContactDto, clientId: string) {
    const findContacts = await this.contactRepository.findAll(clientId);

    const finded = findContacts.find(
      (contact) => contact.email === createContactDto.email,
    );

    if (finded) {
      throw new ConflictException('Contact email already exists in your list');
    }

    return this.contactRepository.create(createContactDto, clientId);
  }

  findAll(clientId: string) {
    return this.contactRepository.findAll(clientId);
  }

  async findOne(id: string, clientId: string) {
    const contact = await this.contactRepository.findOne(id);

    if (!contact || contact.clientId !== clientId) {
      throw new NotFoundException('Client not found');
    }

    return contact;
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto,
    clientId: string,
  ) {
    if (updateContactDto?.email) {
      const findContacts = await this.contactRepository.findAll(clientId);

      const finded = findContacts.find(
        (contact) => contact.email === updateContactDto.email,
      );

      if (finded && finded.id !== id) {
        throw new ConflictException(
          'Contact email already exists in your list',
        );
      }
    }

    return this.contactRepository.update(id, updateContactDto);
  }

  async remove(id: string, clientId: string) {
    const findContact = await this.contactRepository.findOne(id);
    if (!findContact || findContact.clientId !== clientId) {
      throw new NotFoundException('Contact not found');
    }

    return this.contactRepository.delete(id);
  }
}
