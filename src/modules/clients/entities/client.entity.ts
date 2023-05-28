import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class Client {
  readonly id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  @Exclude()
  password: string;

  constructor(data: Partial<Client>) {
    this.id = randomUUID();

    Object.assign(this, {
      ...data,
    });
  }
}
