import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SHA256, HmacSHA256 } from "crypto-js";
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginMophicService {

  constructor(
    private http:HttpClient
  ) { }

  private mophUrl = "https://cvp1.moph.go.th"
  private privateKey = "$jwt@moph#";
  public login(username:string, password:string){
    const password_hash = HmacSHA256(password ,this.privateKey).toString().toUpperCase();    
    // console.log(password_hash);
    return this.http.post(this.mophUrl+"/token?Action=get_moph_access_token&user="+username+"&password_hash="+password_hash+"&hospital_code=11443",[]);
    
  }
}
