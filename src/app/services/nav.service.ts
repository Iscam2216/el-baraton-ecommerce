import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event, Router, NavigationEnd } from '@angular/router';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  public drawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);
  
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }


  public closeNav() {
    if(document.getElementById("toggle-icon")!=null)
      this.drawer.close();
  }

  public openNav() {
    this.drawer.open();
  }
}
