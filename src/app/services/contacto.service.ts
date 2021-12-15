import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, filter} from 'rxjs/operators';
import { Contacto } from '../models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService{
  contactoList: AngularFireList<any>;
  contactos: Observable<any[]>;
  selectedContacto: Contacto = new Contacto();

  constructor(public firebase: AngularFireDatabase){
    this.contactoList = firebase.list('/contactos');
  }
  insertProduct(contacto: Contacto){
    return this.contactoList.push({
      Name: contacto.Name,
      Phone: contacto.Phone,
      Email: contacto.Email,
      Cellphone: contacto.Cellphone,
      Address: contacto.Address,
      IsVisible: true
    });
  }

  getContactosList():Observable<Contacto[]>{
    this.contactos = this.contactoList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
        .filter(contacto => contacto.IsVisible == true),)
    );
    return this.contactos;
  }

  deleteContacto(key){
    this.contactoList.update(key,{IsVisible: false});
  }

  updateContacto(key:string, contacto: Contacto)
  {
    this.contactoList.update(key,contacto);

  }
}
