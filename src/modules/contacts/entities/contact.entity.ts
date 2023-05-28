import { randomUUID } from 'crypto';

export class Contact {
  readonly id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  readonly createdAt: Date;
  readonly clientId: string;

  constructor(data: Partial<Contact>) {
    this.id = randomUUID();

    Object.assign(this, {
      ...data,
    });
  }
}
