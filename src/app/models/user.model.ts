import { JSONObject } from 'ts-json-object';

export class User extends JSONObject {
  id!: number;

  email!: string;

  is_admin!: boolean;
}
