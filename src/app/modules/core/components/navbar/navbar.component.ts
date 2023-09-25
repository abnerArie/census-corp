import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'cen-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  
  public currentRoute: string = ''
  public readonly menuRoutes: MenuRoutes = {
    home: {
      route: 'home',
      label: 'Home',
      icon: 'home',
    },
    population: {
      route: 'population',
      label: 'Population',
      icon: 'map',
    },
  }

  private readonly DEFAULT_ROUTE = 'not-found'

  constructor(
    private readonly router: Router,
  ) {
    router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.currentRoute = ev.urlAfterRedirects.split('/')[1]
      }
    })
  }

  get menuRoutesKeys(): string[] {
    return Object.keys(this.menuRoutes)
  }


  public readonly onNavigate = (routeToNavigate: string) => {
    if (!this.menuRoutes[routeToNavigate]) {
      this.router.navigate([this.DEFAULT_ROUTE])
    }
    this.router.navigate([this.menuRoutes[routeToNavigate].route])
  }

}


export interface MenuRoute {
  route: string;
  label?: string;
  icon?: string;
}

export interface MenuRoutes {
  [key: string]: MenuRoute;
}