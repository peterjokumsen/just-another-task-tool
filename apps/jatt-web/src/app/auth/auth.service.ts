import { Injectable, inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private msalService = inject(MsalService);
  private _loggedIn = new BehaviorSubject<boolean>(false);

  loggedIn$ = this._loggedIn.asObservable();

  constructor() {
    this.checkLoginStatus();
  }

  private checkLoginStatus() {
    const accounts = this.msalService.instance.getAllAccounts();
    this._loggedIn.next(accounts.length > 0);
  }

  login(): void {
    this.msalService.loginRedirect();
  }

  logout(): void {
    this.msalService.logoutRedirect();
  }

  get isLoggedIn(): boolean {
    return this._loggedIn.value;
  }

  getUserName(): string | undefined {
    const accounts = this.msalService.instance.getAllAccounts();
    return accounts.length > 0 ? accounts[0].name : undefined;
  }
}
