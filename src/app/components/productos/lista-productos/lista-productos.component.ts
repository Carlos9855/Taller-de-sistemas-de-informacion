import { Component, OnInit } from '@angular/core';

//SERVICIO
import { ProductoService} from'../../../services/producto.service';

//CLASE PRODUCTO
import { Producto} from'../../../models/producto';


@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {

  listaProductos:Producto[];
  constructor(public productoService: ProductoService) { }

  ngOnInit() {
    this.productoService.getProducts()
    .snapshotChanges()
    .subscribe(item =>{
      this.listaProductos=[];
      item.forEach(element=>{
        let x= element.payload.toJSON();
        x["$key"] =element.key;
        this.listaProductos.push(x as Producto);
      });
    });
  }
  onEdit(product:Producto){
    this.productoService.selectedProduct=Object.assign({},product);
  }
  onDelete($key:string){
    this,this.productoService.deleteProduct($key);
  }

}
