import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client, Params_Get_Client_By_CLIENT_ID, Proxy } from './proxy.service';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  i_Client: Client = new Client();

  constructor(private Proxy: Proxy,private httpClient: HttpClient) { }

  setUser(i_Params_Get_Client_By_CLIENT_ID : Params_Get_Client_By_CLIENT_ID) {
    this.Proxy.Get_Client_By_CLIENT_ID(i_Params_Get_Client_By_CLIENT_ID).subscribe(
      (result) => {
        if (result != null) {
          this.i_Client = result;
          // console.log(this.i_Client);

        }
      }
    );
  }

  getClient(): Observable<Client> {
    // return this.httpClient.get<Client>(this.i_Client);
    return of(this.i_Client);
  }
}
