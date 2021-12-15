import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Cliente } from "../models/cliente";

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  clienteList: AngularFireList<any>;
  clientes: Observable<any>;
  selectedCliente: Cliente = new Cliente();

  constructor(public firebase: AngularFireDatabase) {
    this.clienteList = firebase.list('/clientes');
  }

  insertProduct(cliente: Cliente){
    return this.clienteList.push({
      Ci: cliente.Ci,
      Name: cliente.Name,
      LastName: cliente.LastName,
      BirthdayDate: cliente.BirthdayDate,
      Phone: cliente.Phone,
      Email: cliente.Email,
      Cellphone: cliente.Cellphone,
      Address: cliente.Address,
      IsVisible: true
    });
  }

  getClienteList():Observable<Cliente[]>{
    this.clientes = this.clienteList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        .filter(cliente => cliente.IsVisible == true),
      )
    );
    return this.clientes;
  }

  deleteCliente(key){
    this.clienteList.update(key, {IsVisible: false});
  }

  updateCliente(key:string, cliente:Cliente){
    this.clienteList.update(key,cliente);
  }

}
