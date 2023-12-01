import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBFBtFuBf8T0SnlEVMBxh71jY8XFbpFVD8",
  authDomain: "vibrant-waters-406714.firebaseapp.com"
};
const tenantId = "second-tenant-es0en";
const tenantId2 = "first-tenant-k0xva";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth(initializeApp(firebaseConfig));

  onAuthStateChanged(callback: (user: User | null) => void): void {
    this.auth.tenantId = tenantId;
    onAuthStateChanged(this.auth, callback);
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }


}
