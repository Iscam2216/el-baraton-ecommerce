import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsProvider {

  constructor() {
    //inicializa variables
    if(this.getCar()==null){
      this.delCar();
    }
    if(this.getMinPrice()==null){
      this.setMinPrice("0");
    }
    if(this.getMaxPrice()==null){
      this.setMaxPrice("0");
    }
    if(this.getMaxQuantity()==null){
      this.setMaxQuantity("0");
    }
    if(this.getMinQuantity()==null){
      this.setMinQuantity("0");
    }
    if(this.getFilterBy('1')==null){
      this.setFilterBy('1',"false");
    }
    if(this.getFilterBy('2')==null){
      this.setFilterBy('2',"100000000000000");
    }
    if(this.getFilterBy('3')==null){
      this.setFilterBy('3',"0");
    }
    if(this.getFilterBy('4')==null){
      this.setFilterBy('4',"");
    }
    if(this.getCategories()==null){
      this.setCategories([]);
    }
    if(this.getRouteItemMenuSelect()==null){
      this.setRouteItemMenuSelect([]);
    }
  }
  
  
  //id de la categoria seleccionada
  setItemMenuSelect(item:string){
    localStorage.setItem('itemMenuSelect', item);
  }

  getItemMenuSelect(){
    return localStorage.getItem('itemMenuSelect');
  }  

  //categorias seleccionadas en el menu
  setRouteItemMenuSelect(item:any){
    localStorage.setItem('routeItemMenuSelect', JSON.stringify(item));
  }

  getRouteItemMenuSelect(){
    return JSON.parse(localStorage.getItem('routeItemMenuSelect'));
  }
  
  //tipo del orden aplicado
  setOrderBy(item:string){
    localStorage.setItem('orderby', item);
  }

  getOrderBy(){
    return localStorage.getItem('orderby');
  }

  //tipo del filtro y valor aplicado
  setFilterBy(type:string, val){
    localStorage.setItem('filterby'+type, val);
  }

  getFilterBy(type){
    return localStorage.getItem('filterby'+type);
  }

  //valor maximo del precio del producto
  setMaxPrice(val:string){
    localStorage.setItem('maxPrice', val);
  }

  getMaxPrice(){
    return localStorage.getItem('maxPrice');
  }

  //valor minimo del precio del producto
  setMinPrice(val:string){
    localStorage.setItem('minPrice', val);
  }

  getMinPrice(){
    return localStorage.getItem('minPrice');
  }

  //guardar las categorias
  setCategories(categories: any){
    localStorage.setItem('categories', JSON.stringify(categories));
  }

  getCategories(){
    return JSON.parse(localStorage.getItem('categories'));
  }

  //valor maximo de la cantidad del producto
  setMaxQuantity(val:string){
    localStorage.setItem('maxQuantity', val);
  }

  getMaxQuantity(){
    return localStorage.getItem('maxQuantity');
  }

  //valor minimo de la cantidad del producto
  setMinQuantity(val:string){
    localStorage.setItem('minQuantity', val);
  }

  getMinQuantity(){
    return localStorage.getItem('minQuantity');
  }

  //valor para la busqueda por palabra
  setSearchWord(val:string){
    localStorage.setItem('searchWord', val);
  }

  getSearchWord(){
    return localStorage.getItem('searchWord');
  }

  //almacena productos en el carrito
  setCar(product){
    var car = JSON.parse(localStorage.getItem("carrito"));
    
    if(car==null)
      car= [];
    
    //busca que no se encuentre
    var pos = car.map(function(e) { return e.id; }).indexOf(product.id); 
  
    if(pos>=0){
      car[pos].cantidad= car[pos].cantidad+1;
    }else{
      product.cantidad=1;
      car.push(product)
    }

    console.log(car)
    localStorage.setItem('carrito', JSON.stringify(car));
    
  }

  //borra todos los productos del carrito
  delCar(){
    var car= [];
    localStorage.setItem('carrito', JSON.stringify(car));
    
  }

  //borra un producto del carrito
  delCarItem(product){
    var car = JSON.parse(localStorage.getItem("carrito"));
    
    if(car==null)
      car= [];
    
    //busca que no se encuentre
    var pos = car.map(function(e) { return e.id; }).indexOf(product.id); 
  
    if(pos>=0){
      car[pos].cantidad= car[pos].cantidad-1;
      
      if(car[pos].cantidad<=0)
        car.splice(pos,1);
    }

    localStorage.setItem('carrito', JSON.stringify(car));
    

  }

  //obtiene productos del carrito
  getCar(){
    return JSON.parse(localStorage.getItem('carrito'));
  }

}