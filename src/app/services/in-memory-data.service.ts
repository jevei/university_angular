import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}
  createDb() {
    const users = [
      {
        id: 1,
        firstname: 'Dr. ',
        lastname: 'Nice',
        email: 'nice@epharma.web',
        phone_number: '1111111111',
        password: '123456',
        is_admin: true,
      },
      {
        id: 2,
        firstname: 'Bombasto',
        lastname: 'Nice',
        email: 'nice@client.web',
        phone_number: '1111111111',
        password: '123456',
        is_admin: false,
      },
    ];
    return { users };
  }
  genId(users: User[]): number {
    return users.length > 0
      ? Math.max(...users.map((user) => user.id)) + 1
      : 11;
  }
}
