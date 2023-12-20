import { Injectable } from '@angular/core';
import { AuthService } from './AuthService.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceLocator {
  private _authService?: AuthService;

  set authService(service: AuthService) {
    this._authService = service;
  }

  get authService(): AuthService | undefined {
    return this._authService;
  }
}
