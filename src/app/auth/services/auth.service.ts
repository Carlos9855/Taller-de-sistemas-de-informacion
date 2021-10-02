import { first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
//import { auth } from 'firebase/app';
import { User } from "../../shared/services/user";
import { AngularFireAuth} from '@angular/fire/auth';
@Injectable()

export class AuthService {
  public user:User;
  constructor(public afAuth: AngularFireAuth) { }


  async login(email:string, password:string){
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async register(email:string, password:string){
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
