import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/modules/shared/modules/material/material.module';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [MaterialModule],
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // NavbarComponent is created successfully
  it('should create an instance of NavbarComponent', () => {
    const navbarComponent = component
    expect(navbarComponent).toBeInstanceOf(NavbarComponent);
  });


  // currentRoute is initialized to an empty string
  it('should initialize currentRoute as an empty string', () => {
    const navbarComponent = component
    expect(navbarComponent.currentRoute).toBe('');
  });


  // menuRoutes object is initialized with two MenuRoute objects
  it('should initialize menuRoutes object with two MenuRoute objects', () => {
    const navbarComponent = component
    expect(navbarComponent.menuRoutes).toEqual({
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
    });
  });

});
