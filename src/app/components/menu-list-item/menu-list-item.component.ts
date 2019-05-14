import {Component, HostBinding, Input, OnInit, AfterViewInit} from '@angular/core';
import {Categories} from '../../data/categories';
import {Router} from '@angular/router';
import {NavService} from '../../services/nav.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { GlobalsProvider } from 'src/app/providers/globals/globals';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotateX(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit, AfterViewInit{
  expanded: boolean;
  route_categorie:any=[];
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: Categories;
  @Input() level: number;

  constructor(public navService: NavService, public router: Router, private globals: GlobalsProvider) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    if (this.level === undefined) {
      this.level = 0;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe(() => {
      if(this.item==null){
        this.item=this.globals.getRouteItemMenuSelect()[this.globals.getRouteItemMenuSelect().length-2]
      }
      this.expanded = this.globals.getRouteItemMenuSelect().findIndex(a => a.id ==this.item.id)!=-1
      this.ariaExpanded = this.expanded;
      
    });
  }

  onItemSelected(item: Categories) {
  
    if (!item.sublevels) {
      this.router.navigate(['product/'+item.id]);
      this.searchRouteCategorie(this.globals.getCategories(),item.id)
      this.navService.closeNav();

      if(document.getElementById('cat'+this.globals.getItemMenuSelect())!=null)
        document.getElementById('cat'+this.globals.getItemMenuSelect()).style.backgroundColor="";

      if(document.getElementById('cat'+item.id)!=null)
        document.getElementById('cat'+item.id).style.backgroundColor="gray";
    }
    else{
      this.expanded = !this.expanded;
    } 
    
  }

  searchRouteCategorie(array, id){
    array.forEach(e => {
      if(e.sublevels){
        this.route_categorie.push(e)
        return this.searchRouteCategorie(e.sublevels, id)
      }else if(e.id==id){
        this.route_categorie.push(e)
        this.globals.setRouteItemMenuSelect(this.route_categorie);
      }
    });
    this.route_categorie=[];
  }


  ngAfterViewInit() {
    
    if(document.getElementById('cat'+this.globals.getItemMenuSelect())!=null)
      document.getElementById('cat'+this.globals.getItemMenuSelect()).style.backgroundColor="gray";
  }

}
