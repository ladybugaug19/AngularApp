import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  LoggedIn: boolean = false;
  constructor(private httpClient: HttpClient) {}

  public isLoggedIn() {
    return this.LoggedIn;
  }

  public logout() {
    this.LoggedIn = false;
  }

  //login validating employee
  public validateUser(email, password) {
    return this.httpClient
      .post<any>("http://192.168.40.131:81/authenticate", {
        email: email,
        password: password
      })
      .pipe(
        map(data => {
          console.log(data);
          if (data === true) {
            this.LoggedIn = true;
            return true;
          } else {
            this.LoggedIn = false;
            return false;
          }
        })
      );
  }

  //register
  public register(empId, empName, empEmail, empPassword, empRole, empUserName) {
    console.log(empId);
    return this.httpClient
      .post<any>("http://192.168.40.131:81/register", {
        empId: empId,
        empName: empName,
        empEmail: empEmail,
        empPassword: empPassword,
        empRole: empRole,
        empUserName: empUserName
      })
      .pipe(
        map(data => {
          console.log(data);
          if (data === true) {
            return data;
          } else {
            return false;
          }
        })
      );
  }

  // reset password service layer,sending email to get the link to reset the password

  public resetPwd(email) {
    console.log("in authservice");
    console.log(email);
    return this.httpClient
      .post<any>("http://192.168.40.131:81/forgot", {
        email: email
      })
      .pipe(
        map(data => {
          if (data === true) {
            console.log("data in if block ");
            console.log(data);
            return true;
          } else {
            console.log("in data else block");
            return false;
          }
        })
      );
  }

  //submiting new password

  public submitPwd(password, token) {
    console.log(token);
    return this.httpClient
      .post<any>("http://192.168.40.131:81/reset/" + token, {
        password: password
      })
      .pipe(
        map(data => {
          if (data === true) {
            return true;
          } else {
            return false;
          }
        })
      );
  }
}
