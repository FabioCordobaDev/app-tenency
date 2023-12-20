import { Injectable } from '@angular/core';
import { TimeoutService } from './timeout.service';
import { AuthServiceLocator } from './AuthServiceLocator.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {


  constructor(private authServiceLocator: AuthServiceLocator, private timeoutService: TimeoutService,
    private apiService: ApiService) {}

    startInactivityTimer(token: string, refreshToken: string) {
      const inactivityTimeout = 0 * 30 * 1000;
      this.timeoutService.setTimeout(() => {
        this.authServiceLocator.authService?.signOut();
        this.apiService.pruebaProxy_ActualizarToken(refreshToken).subscribe(
          (response) => {
            // Convert the response object to a JSON string and log it
            console.log("Response:", JSON.stringify(response));
          },
          (error) => {
            // Handle any errors that occur during the HTTP request
            console.error('Error:', error);
          }
        );
        console.log("sesion cerrada");
      }, inactivityTimeout);
    }


  

  resetInactivityTimer() {
    this.timeoutService.resetTimeout();
  }
}
