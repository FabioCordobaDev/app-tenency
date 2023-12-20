import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  User
} from 'firebase/auth';

import { AppComponent } from './app.component';
import { Component, OnInit } from '@angular/core';
import { InactivityService } from './inactivity.service';

import { AuthServiceLocator } from './AuthServiceLocator.service';



const firebaseConfig = {
  apiKey: "AIzaSyCkaA4ZLyetiDQ2TkUIU4TeNESe3DlF5QQ",
  authDomain: "deep-district-406416.firebaseapp.com"
};
const tenantId = "Clinica-colsubsidio-r2iet";
const tenantId2 = "first-tenant-k0xva";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private authServiceLocator: AuthServiceLocator, // Inject the service locator
    private inactivityService: InactivityService
  ) {
    // Set the AuthService reference in the locator
    this.authServiceLocator.authService = this;
  }
  private auth = getAuth(initializeApp(firebaseConfig));
  

  onAuthStateChanged(callback: (user: User | null) => void): void {
    this.auth.tenantId = tenantId;
    onAuthStateChanged(this.auth, callback);
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    console.log("cuenta cerrada");
    return signOut(this.auth);
  }

  startTimer(token: string,refreshToken: string) {
    // Inicia el temporizador de inactividad al iniciar el componente
    this.inactivityService.startInactivityTimer(token,refreshToken);
  }

  onUserActivity() {
    // Resetea el temporizador de inactividad cuando se detecta actividad del usuario
    this.inactivityService.resetInactivityTimer();
  }
  
  getAccessToken(): Promise<string> {
    if (this.auth.currentUser) {
      return this.auth.currentUser.getIdToken(true);
    } else {
      return Promise.reject("No authenticated user");
    }
  }

  /*
  setTokenRefreshTimer(expiresIn: number): void {
    if (this.auth.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
    }
    this.tokenRefreshTimer = setTimeout(() => {
      this.refreshAccessToken();
    }, expiresIn - 60000); // Refresca el token 1 minuto antes de que expire
  }

*/



}
