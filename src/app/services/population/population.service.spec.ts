import { TestBed } from '@angular/core/testing';

import { PopulationService } from './population.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { PopulationNationData, pupulationDrilldowns } from 'src/app/interfaces/populationResponse.interface';
import { environment } from 'src/environments/environment.development';

class MockHttpService {
  get() {
    return of({ data: [] })
  }
}

describe('PopulationService', () => {
  let service: PopulationService
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule],
  })



  beforeEach(() => {
    TestBed.configureTestingModule({})
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PopulationService(httpClientSpy)
  });

  it('should be created', () => {
    expect(service).toBeTruthy()
  })


  it('should return an observable of population data for a given drilldown', function () {
    const populationDrilldowns: pupulationDrilldowns = 'Nation'
    const expectedUrl = `${environment.populationApiUrl}data?drilldowns=${populationDrilldowns}&measures=Population`

    httpClientSpy.get.and.returnValue(of({ data: [] }))
    const result = service.getPopulationData(populationDrilldowns)

    expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl)
    expect(result).toEqual(jasmine.any(Observable))
  });


  it('should filter data depending on years order', function () {

    const mockData: PopulationNationData[] = [
      {
        "ID Nation": "1",
        Nation: "Nation 1",
        "ID Year": 2018,
        Year: "2018",
        Population: 1000,
        "Slug Nation": "nation-1"
      },
      {
        "ID Nation": "1",
        Nation: "Nation 1",
        "ID Year": 2016,
        Year: "2016",
        Population: 2000,
        "Slug Nation": "nation-1"
      },
      {
        "ID Nation": "31",
        Nation: "Nation 1",
        "ID Year": 2019,
        Year: "2019",
        Population: 1500,
        "Slug Nation": "nation-1"
      }
    ];


    httpClientSpy.get.and.returnValue(of({ data: mockData }));

    service.getPopulationData('Nation').subscribe((result) => {
      expect(result.length).toBe(3);
      expect(result[0]['ID Year']).toBe(2016);
      expect(result[1]['ID Year']).toBe(2018);
    });
  });


  it('should return an empty array when data is null', function () {
    httpClientSpy.get.and.returnValue(of({ data: null }));
    service.getPopulationData().subscribe((result) => {
      expect(result).toEqual([]);
    });
  });


  it('should return an Observable of an array of PopulationStateData objects when getPopulationData is called with State as an argument', function () {

    httpClientSpy.get.and.returnValue(of({ data: [] }));

    service.getPopulationData('State').subscribe((result) => {
      expect(result).toEqual([]);
    });
  });

});
