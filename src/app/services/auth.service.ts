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

  constructor(private http: HttpClient) {}

  /*getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(catchError(this.handleError<User[]>('getUsers', [])));
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http
      .get<User>(url)
      .pipe(catchError(this.handleError<User>(`getUser id=${id}`)));
  }*/

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

  userRegistration(newUser: User): Observable<User> {
    return this.http
      .post<User>(this.usersUrl, newUser, this.httpOptions)
      .pipe(catchError(this.handleError<User>('adduser')));
  }

  userLogin(email: string, password: string): Observable<any> {
    /*var users = this.getUsers();
    console.log(users);
    return this.login(email, password);*/
    return this.http.get<User[]>(this.usersUrl).pipe(
      map((response) => {
        var retour: boolean = false;
        response.forEach((_user) => {
          if (_user.email == email && _user.password == password) {
            this.setCurrentUser(_user);
            retour = true;
          }
        });
        return retour;
        //this.login(id);
      }),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  /*login(id: number): Observable<any> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      map((response) => {
        if (response) {
          //le .success, pour être vrait doit être fournie par l'api, donc pour l'instant il est toujours faux
          console.log('New User service : ', response);

          var data = response;
          console.log('New User service : ', data);
          let newUser: User = new User();
          newUser = data;
          console.log('New user value ', newUser);

          //this.setCurrentUser(newUser);
          return true;
        } else {
          return false;
        }
      }),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }*/

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}
