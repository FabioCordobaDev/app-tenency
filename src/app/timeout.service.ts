// timeout.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeoutService {
  private timeout: any;

  setTimeout(callback: () => void, timeout: number) {
    this.timeout = setTimeout(callback, timeout);
  }

  resetTimeout() {
    // Reinicia el temporizador
    clearTimeout(this.timeout);
  }
}

