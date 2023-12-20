import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  pruebaProxy(token: string): Observable<any> {
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      //console.log("this.http.get('http://localhost:8000/api/prueba_proxy', { headers }); ",this.http.get('http://localhost:8000/api/prueba_proxy', { headers }))
      
      return this.http.get<any>('http://localhost:8000/api/prueba_proxy', { headers }).pipe(map(data => data));
  }

  pruebaProxy_ActualizarToken(refreshToken: string): Observable<any> {
      // Define the JSON data to be sent in the request body
    const requestData = {
      "grand_type": "refresh_token",
      "refresh_token": refreshToken
    };

    // Set the HTTP headers
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json', // Specify JSON content type
    //   'Authorization': `Bearer ${token}`
    // });

    // Send a POST request with the JSON data in the request body
    return this.http.post<any>('http://localhost:8000/api/refresh_token', requestData);
  }

}

