import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser: User | null = null;

  get currentUser(): User | null {
    return this._currentUser;
  }

  get isLoggedIn(): boolean {
    return !!this._currentUser;
  }

  get isAdmin(): boolean {
    return !!this._currentUser?.is_admin;
  }

  constructor() {}
}
