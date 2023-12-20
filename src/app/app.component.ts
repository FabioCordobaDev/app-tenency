import { Component, OnInit } from '@angular/core';
import { AuthService } from './AuthService.service';
import { ApiService } from './api.service';
import { Empty } from '@angular-devkit/core/src/virtual-fs/host';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // template: `
  //   <div id="message">{{ message }}</div>
  // `
})



export class AppComponent implements OnInit{
  title = 'app-tenancy';
  message: string = '';
  data:any = {};
  myToken: string = 'yJhbGciOiJSUzI1NiIsImtpZCI6ImJlNzgyM2VmMDFiZDRkMmI5NjI3NDE2NThkMjA4MDdlZmVlNmRlNWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZGVlcC1kaXN0cmljdC00MDY0MTYiLCJhdWQiOiJkZWVwLWRpc3RyaWN0LTQwNjQxNiIsImF1dGhfdGltZSI6MTcwMzAwNjIwNiwidXNlcl9pZCI6IlFpdlNuN3dCeGtZVTR1cTFzbUM4NFNxS0xSdzEiLCJzdWIiOiJRaXZTbjd3QnhrWVU0dXExc21DODRTcUtMUncxIiwiaWF0IjoxNzAzMDA2MjA2LCJleHAiOjE3MDMwMDk4MDYsImVtYWlsIjoiYW5kcmVzLmFyZXZhbG9AaW1leGhzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhbmRyZXMuYXJldmFsb0BpbWV4aHMuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQiLCJ0ZW5hbnQiOiJDbGluaWNhLWNvbHN1YnNpZGlvLXIyaWV0In19.gaTYioc9b4BXvCxSV5G7LYxFY_njg5vowmE_op4Aluftrhe7a7PjnL8sfCUe8B5-hma7vN77Eau0FhQ2KWeoyOfz2EWNTaXrGRv-ImmP7f82gNAVgGg_b3ptfHpStiyBImnIG4rimFik0e0BJ9Kg2kojtLB4rH2lGR980VJNDCqTUUyGVZTYXqLm-QF9pKtzhhmok6fJmVOESnvV9JIHFqBJdgSrxzeZ_gQdnJ3a_M0VOjRpc_D8y-TFVNWs1Vm09iDj5-MaSyRMgPKuGwgIT2jj32kFlSUDpOZanwqY4ILoxZk-nuDpUDtY2ewZdyl-wRXPT3cJTneP0Oe7YniJsQ';
  refreshToken: string = 'AMf-vBzbA69nAYg66Q5pV90nO5cbrMjbd8fSHlESG929T2tnsMw8UVuv_6dfwEt7_1IM6Pc9IiwvAwov6i9t0IWa45i7EFMLto3_GKALK9ywEaLfH-G4uBY9fHSANeOFAPlnvDZvu56Co6UpDDhVJLAqYct-F6Oz2X72PCcc-TKjdib6LOnmMw90PBF577zlW_iEj3lOVoKeN7wECQMbv6iBZz5K0teRcT9pzZltd-6XuXrivOV7yPPOlG4uDnhSy1VkCxOg0-OO_Mqk8wmXdEQL_C_h8YqLKw';

  constructor(private authService: AuthService, private apiService: ApiService) {}

  onPruebaProxyClick() {
    try {
      if(this.apiService.pruebaProxy(this.myToken)){
        console.log("devuevwe");
      }else{ //AQUI ESTOY HACIENDO PRUEBAS
        console.log("dno")
      }
      this.apiService.pruebaProxy(this.myToken)?.subscribe(response => {
        if (response) {
          return console.log('El token es válido');
          // Aquí puedes realizar las acciones correspondientes para un token válido
        } else {
          return console.log('El token no es válido');
          // Aquí manejas el caso de un token no válido
        }
      },
      (error) => {
        console.log('Error during validation of token');
        // Handle any errors that occur during the HTTP request
      });
        // Manejar la respuesta aquí
    } catch (error) {
       console.log('El token no es válido');
    }

  }
  

  ngOnInit(){
    this.authService.onAuthStateChanged((user) => {
      if (user) {
         // Inicia el temporizador de inactividad al iniciar el componente
         //como obtener al acces token cuando se refresca, tener el ultimo, el proxy que cree se le envie el ultimo... en angular...
        this.authService.startTimer(this.myToken,this.refreshToken);
        console.log("probando inicio");
        
        console.log({user});
        this.data = user;

        this.message = `Welcome, ${user.email}`;

        this.authService.getAccessToken().then(token => {
          // Manejar el token 
          localStorage.setItem('accessToken', token);
        }).catch(error => {
          // Manejar la ausencia de usuario autenticado o cualquier otro error
          this.message = 'No user signed in.';
        });

      } else {
        this.message = 'No user signed in.';
      }
    });

    this.signIn();
  }
  signIn(): void {
    const email = 'andres.arevalo@imexhs.com';
    const password = '123456';

    this.authService.signIn(email, password)
      .catch((error) => {
        this.message = error.message;
      });
  }

  

  signOut(): void {
    this.authService.signOut()
      .catch((error) => {
        this.message = error.message;
      });
  }



  onUserActivity() {
    // Resetea el temporizador de inactividad cuando se detecta actividad del usuario
    this.authService.onUserActivity();
  }




}
