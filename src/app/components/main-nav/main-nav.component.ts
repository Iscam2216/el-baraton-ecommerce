import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {NavService} from '../../services/nav.service';
import { Categories } from 'src/app/data/categories'; 
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { GlobalsProvider } from 'src/app/providers/globals/globals';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements AfterViewInit {

  @ViewChild('drawer') drawer: ElementRef;
  categories: Categories[];
  filtersort=true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private navService: NavService, private http: HttpClient,  
    public router: Router,private cdRef:ChangeDetectorRef, private globals: GlobalsProvider) {
        
    this.getCategories().subscribe(data => {
      console.log(data);
      this.categories=data.categories;
      this.globals.setCategories(this.categories);
    });
  }

  public getCategories(): Observable<any> {
    var json= this.http.get("../../assets/data/categories.json");
    return json
  }

  startItems(){
    this.router.navigate(['']);
    document.getElementById("title-top").innerHTML="Todos los productos";
    this.navService.closeNav();
    this.globals.setItemMenuSelect(null);
    this.globals.setRouteItemMenuSelect([])
  }

  orderProduct(type){
    this.globals.setOrderBy(type);
    var id = this.globals.getItemMenuSelect();
    console.log("id",id)
    if(id!=null && id!="null")
      this.router.navigate(['product/'+id]);
    else
      this.router.navigate(['']);
      
  }

  filterAndSort(){
    this.filtersort=!this.filtersort;
  }

  filterProduct(type, val){
    this.globals.setFilterBy(type, val);
    var id = this.globals.getItemMenuSelect();
 
    console.log("id",id)
    if(id!=null && id!="null")
      this.router.navigate(['product/'+id]);
    else
      this.router.navigate(['']);


  }

  finalizarCompra(){
    this.globals.delCar();
    document.getElementById("carrito-number").innerHTML="";
  }

  vaciarCarrito(){
    this.globals.delCar();
    document.getElementById("carrito-number").innerHTML="";
  }

  addProduct(event,product){
    event.stopPropagation(); //impide que se cierre el menu
    console.log(product)
    this.globals.setCar(product)

    let data = this.globals.getCar();
    document.getElementById("carrito-number").innerHTML=data.length.toString();
  }

  delProduct(event,product){
    event.stopPropagation();//impide que se cierre el menu
    this.globals.delCarItem(product)

    let data = this.globals.getCar();
    document.getElementById("carrito-number").innerHTML=data.length.toString();
  }

  getTotalCar(){
    var price=0;
    this.globals.getCar().forEach(e => {
      price=price+this.getNumberPrice(e.price)*e.cantidad
    });
    return price;
  }

  getNumberPrice(number){
    return Number(number.replace(/[^0-9.-]+/g,''))
  }

  ngAfterViewInit() {
    this.navService.drawer = this.drawer;
    this.cdRef.detectChanges();
  }
  
}
