import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser: User | null = null;
  private usersUrl = 'api/users';
  private readonly CURRENT_USER_KEY = 'jxr.users.currentUser';

  get currentUser(): User | null {
    return this._currentUser;
  }

  get isLoggedIn(): boolean {
    return !!this._currentUser;
  }

  get isAdmin(): boolean {
    return !!this._currentUser?.is_admin;
  }

  constructor(private http: HttpClient) {
    const storedCurrentUser = JSON.parse(
      sessionStorage.getItem(this.CURRENT_USER_KEY) ?? 'null'
    );

    if (storedCurrentUser) {
      // this._currentUser = new User(storedCurrentUser);

      this._currentUser = storedCurrentUser;
      console.log(this.currentUser);
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private setCurrentUser(user: User | null) {
    this._currentUser = user;
    sessionStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    console.log(this._currentUser);
  }

  userRegistration(newUser: User): Observable<any> {
    return this.http.post<User>(this.usersUrl, newUser, this.httpOptions).pipe(
      map((response) => {
        console.log('New User service : ', response);
        if (response) {
          console.log('succès:', response);
          this.setCurrentUser(newUser);
          return true;
        } else {
          return false;
        }
      }),
      catchError(this.handleError<User>('adduser'))
    );
  }

  userLogin(email: string, password: string): Observable<any> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map((response) => {
        console.log(response);
        var retour: boolean = false;
        response.forEach((_user) => {
          if (_user.email == email && _user.password == password) {
            this.setCurrentUser(_user);
            retour = true;
          }
        });
        return retour;
      }),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  userSignout(): Observable<any> {
    return this.http.get<any>(this.usersUrl).pipe(
      map((response) => {
        console.log('New User signout service : ', response);
        if (response) {
          this.setCurrentUser(null);
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        console.log('Error', error);

        return of(null);
      })
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}
