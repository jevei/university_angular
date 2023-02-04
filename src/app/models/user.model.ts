import { JSONObject } from 'ts-json-object';

export class User extends JSONObject {
  id!: number;

  email!: string;

  firstname!: string;

  lastname!: string;

  phone_number!: string;

  is_admin!: boolean;
}
