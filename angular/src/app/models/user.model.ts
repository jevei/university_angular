export class User {
  user_id: number | undefined;

  email!: string;

  firstname!: string;

  lastname!: string;

  phone_number!: string;

  encrypted_password: string | undefined;

  is_admin!: boolean;
}
