import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


import { IUser } from './user';

@Injectable()
export class AuthService {
     domain = "http://localhost:1978/"; // Development Domain - Not Needed in Production
    //  domain="";
    authToken;
    user; 
    options;
    public currentUser: IUser;
    public jwtToken: string;
    constructor(private http: Http) {

        const theUser:any = JSON.parse(localStorage.getItem('currentUser'));
        if (theUser) {
            this.jwtToken = theUser.token;
        }
    }
    loadToken() {
        console.log(localStorage.getItem('currentUser'))
        this.authToken = localStorage.getItem('currentUser');// Get token and asssign to variable to be used elsewhere
        const theUser:any = JSON.parse(localStorage.getItem('currentUser'));
        if (theUser) {
            this.jwtToken = theUser.token;
        }
      }
    isLoggedIn(): boolean {
        try {
            const theUser:any = JSON.parse(localStorage.getItem('currentUser'));
            if (theUser) {
                this.currentUser = theUser.user;
            }
        } catch (e) {
            return false;
        }
        
        return !!this.currentUser;
    }

    login(oUser) {
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.domain+'api/login', JSON.stringify(oUser), options)
        .do((response: Response) => {
            if (response.json().success) {
                this.currentUser = <IUser>response.json().message;
                let userObj: any = {};
                userObj.user = response.json().message;
                userObj.token = response.json().token;

                localStorage.setItem('currentUser', JSON.stringify(userObj));
            }
            response.json();
        })
        .catch(this.handleError);
    }

    logout(): void {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }
    createAuthenticationHeaders() {
        this.loadToken(); // Get token so it can be attached to headers
        // Headers configuration options
        this.options = new RequestOptions({
          headers: new Headers({
            'Content-Type': 'application/json', // Format set to JSON
            'authorization': this.jwtToken  // Attach token
          })
        });
      }
    getProfile() {
        this.createAuthenticationHeaders(); // Create headers before sending to API
        console.log(this.jwtToken);
        return this.http.get(this.domain + 'api/profile', this.options).map(res => res.json());
      }
     private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
