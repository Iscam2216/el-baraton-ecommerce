import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/data/products';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalsProvider } from 'src/app/providers/globals/globals';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit{
  ngOnInit(): void {
  }

  products: Products[];
  id: string;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private globals: GlobalsProvider) {
    this.id = this.route.snapshot.paramMap.get("id"); 
    
    //title bar
    var title="Todos los productos";
    this.globals.getRouteItemMenuSelect().forEach(e => {
      if(title!="Todos los productos")
        title= title+' / '+e.name
      else
        title= e.name
    });
    
    //no tiene informacion en storage por lo que redirecciona al inicio
    if( title=="Todos los productos" && this.id!=null)
      this.router.navigate(['']);

    document.getElementById("title-top").innerHTML=title;

    this.globals.setItemMenuSelect(this.id);

    console.log("obtiene_productos")
    let data = this.globals.getCar();
    document.getElementById("carrito-number").innerHTML=data.length.toString();

    var order = this.globals.getOrderBy();
    var filter1 = this.globals.getFilterBy("1");
    var filter2 = this.globals.getFilterBy("2");
    var filter3 = this.globals.getFilterBy("3");
    var filter4 = this.globals.getFilterBy("4");

    this.getProducts().subscribe(data => {
      if(this.id!=null){
        this.products=data.products.filter(e => e.sublevel_id.toString()==this.id);  
      }else{
        this.products=data.products;
      }
      //almacena el minimo y maximo precio para el filtro
      this.globals.setMinPrice(data.products.reduce(function (a, b) {
      var aprice=Number(a.price.replace(/[^0-9.-]+/g,""));
      var bprice=Number(b.price.replace(/[^0-9.-]+/g,""));
      return ( aprice < bprice ? a : b );
      }).price);

      this.globals.setMaxPrice(data.products.reduce(function (a, b) {
      var aprice=Number(a.price.replace(/[^0-9.-]+/g,""));
      var bprice=Number(b.price.replace(/[^0-9.-]+/g,""));
      return ( aprice > bprice ? a : b );
      }).price);

      //almacena el minimo y maximo de cantidad para el filtro
      this.globals.setMinQuantity(data.products.reduce(function (a, b) {
      return ( a.quantity < b.quantity ? a : b );
      }).quantity);

      this.globals.setMaxQuantity(data.products.reduce(function (a, b) {
      return ( a.quantity > b.quantity ? a : b );
      }).quantity);

      //filtrar productos por disponibles
      if(filter1=="true"){
        this.products=this.products.filter(e => e.available==true);  
      }

      //ordenar productos
      if(order=="1"){
        this.products=this.products.sort(function (a, b) {
          var aprice=Number(a.price.replace(/[^0-9.-]+/g,""));
          var bprice=Number(b.price.replace(/[^0-9.-]+/g,""));
          
          if (aprice > bprice) {
            return 1;
          }
          if (aprice < bprice) {
            return -1;
          }
          return 0;
        });
      }else if(order=="2"){
        this.products=this.products.sort(function (a, b) {
          if (a.available < b.available) {
            return 1;
          }
          if (a.available > b.available) {
            return -1;
          }
          return 0;
        });
      }else if(order=="3"){
        this.products=this.products.sort(function (a, b) {
          if (a.quantity > b.quantity) {
            return 1;
          }
          if (a.quantity < b.quantity) {
            return -1;
          }
          return 0;
        });
      }

      //filtrar productos por precio
      this.products=this.products.filter(e => Number(e.price.replace(/[^0-9.-]+/g,""))<=Number(filter2));  
      
      console.log(filter3+' '+filter2+' '+filter1+' '+filter4)
      //filtrar productos por cantidad
      this.products=this.products.filter(e => e.quantity>=Number(filter3));  
      
      console.log(this.products)
      //filtrar por nombre
      this.products=this.products.filter(e => e.name.includes(filter4));  

    });
  }

  public getProducts(): Observable<any> {
    var json= this.http.get("../../assets/data/products.json");
    return json
  }

  public addCar(product){
    this.globals.setCar(product);

    let data = this.globals.getCar();
    document.getElementById("carrito-number").innerHTML=data.length.toString();
  }

}
