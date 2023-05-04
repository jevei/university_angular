import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

const httpOptions = {
  headers: new HttpHeaders({ 'content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser: User | null = null;
  private usersUrl = 'http://localhost:8080/api/auth';
  //private usersUrl = 'https://fathomless-bastion-22084.herokuapp.com/api/users';
  private readonly CURRENT_USER_KEY = 'jxr.users.currentUser';

  get currentUser(): User | null {
    return this._currentUser;
  }

  get isLoggedIn(): boolean {
    return (
      sessionStorage.getItem('app.token') != null &&
      sessionStorage.getItem('app.token') != ''
    );
  }

  get isAdmin(): boolean {
    return !!this._currentUser?.is_admin;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
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
    newUser.is_admin = false;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<any>(
        'https://fathomless-bastion-22084.herokuapp.com/api/users',
        newUser,
        httpOptions
      )
      .pipe(
        map((response) => {
          console.log('New User service : ', response);
          this.logIn(newUser.email, newUser.encrypted_password!);
          return true;
        }),
        catchError((err) => {
          if (err.status === 401) {
            alert('Le email choisie est déjà associé à un compte.');
          }
          return err;
        })
      );
  }
  logIn(email: string, password: string): any {
    sessionStorage.removeItem('app.token');
    this.userLogin(email, password).subscribe({
      next: (token) => {
        sessionStorage.setItem('app.token', token);

        const decodedToken = jwtDecode<JwtPayload>(token);

        // @ts-ignore
        sessionStorage.setItem('app.roles', decodedToken.scope);

        this.router.navigateByUrl('/');
      },
      error: (error) =>
        this.snackBar.open(`Login failed: ${error.status}`, 'OK'),
    });
  }

  userLogin(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: {
        Authorization: 'Basic ' + window.btoa(username + ':' + password),
      },
      responseType: 'text' as 'text',
    };
    return this.http.post('/api/auth', null, httpOptions).pipe(
      map((response) => {
        console.log(response);
        //var retour: boolean = false;
        var tokenInfo: string = '';
        tokenInfo += jwtDecode<JwtPayload>(response).sub; // decode token
        console.log(tokenInfo, tokenInfo.length);
        let newUser: User = new User();
        newUser = JSON.parse(tokenInfo);
        this.setCurrentUser(newUser);
        return response;
      }),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  } /*(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: {
        Authorization: 'Basic ' + window.btoa(email + ':' + password),
      },
      responseType: 'text' as 'text',
    };
    return this.http.post<any>(this.usersUrl, httpOptions).pipe(
      map((response) => {
        console.log(response);
        var retour: boolean = false;
        console.log(response);
        return retour;
      }),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }*/

  userSignout() {
    sessionStorage.removeItem('app.token');
    sessionStorage.removeItem('app.roles'); //: Observable<any> {
    /*return this.http.get<any>(this.usersUrl).pipe(
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
    );*/
  }
}
