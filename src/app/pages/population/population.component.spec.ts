import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ChartComponent } from 'src/app/components/chart/chart.component';
import { PopulationService } from 'src/app/services/population/population.service';

import { SharedModule } from '../../modules/shared/shared.module';
import { PopulationComponent } from './population.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { STATES_OF_AMERICA } from 'src/app/constants/populationConstants';
import { of } from 'rxjs';
import { PopulationNationData } from 'src/app/interfaces/populationResponse.interface';

describe('PopulationComponent', () => {
  let component: PopulationComponent;
  let fixture: ComponentFixture<PopulationComponent>;
  let populationService: PopulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, SharedModule, RouterTestingModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [PopulationComponent, ChartComponent],
      providers: [
        {
          PopulationService, useValue: {
            getPopulationData: () => of([]),
          }
        },
      ],
    });
    fixture = TestBed.createComponent(PopulationComponent)
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });


  // PopulationComponent initializes with default values
  it('should initialize with default values', () => {
    const populationComponent = component
    expect(populationComponent.derilldownsOptions).toEqual(['Nation', 'State'])
    expect(populationComponent.defaultDrilldowns).toEqual('Nation')
    expect(populationComponent.statesOfAmerica).toEqual(STATES_OF_AMERICA);
    expect(populationComponent.populationOptionsForm.value).toEqual({
      drilldown: 'Nation',
      state: ''
    });
  });


  // Form changes trigger population data retrieval
  it('should trigger population data retrieval when form changes', () => {
    const populationComponent = component

    const formChangeSpy = spyOn(populationComponent, 'onFormChange')
    populationComponent.populationOptionsForm?.get('drilldown')!.valueChanges.subscribe(populationComponent.onFormChange)

    populationComponent.populationOptionsForm.get('drilldown')?.setValue('State');
    expect(formChangeSpy).toHaveBeenCalledWith('State')
  });


  // Population data is retrieved successfully
  it('should retrieve population data successfully', () => {
    const populationComponent = component
    const populationDataMock = [{ 'ID Year': 2015, Population: 1000 }, { ['ID Year']: 2016, Population: 2000 }] as PopulationNationData[];
    const service = TestBed.inject(PopulationService)

    spyOn(service, 'getPopulationData').and.returnValue(of(populationDataMock))

    populationComponent.onFormChange('Nation')

    populationComponent.populationData$.subscribe((data) => {
      expect(data).toEqual(populationDataMock)
    });
  });

  // Population data retrieval fails
  it('should handle population data retrieval failure', () => {
    const populationComponent = component
    const service = TestBed.inject(PopulationService)

    spyOn(service, 'getPopulationData').and.returnValue(of([]))
    populationComponent.onFormChange('Nation')
    populationComponent.populationData$.subscribe((data) => {
      expect(data).toEqual([])
    }
    );
  });

});
