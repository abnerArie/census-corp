import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import {
  PopulationNationData,
  PopulationResponse,
  PopulationStateData,
  pupulationDrilldowns,
} from 'src/app/interfaces/populationResponse.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PopulationService {

  private readonly pupulationYearsToDisplay = [2015, 2016, 2017, 2018, 2019, 2020];

  constructor(
    private readonly http: HttpClient
  ) { }


  getPopulationData = (populationDrilldowns: pupulationDrilldowns = 'Nation'): Observable<(PopulationNationData | PopulationStateData)[]> => {
    return this.http.get<PopulationResponse>(`${environment.populationApiUrl}data?drilldowns=${populationDrilldowns}&measures=Population`)
      .pipe(
        map(({ data }): PopulationNationData[] | PopulationStateData[] => data || []),
        map((data: (PopulationNationData | PopulationStateData)[]): (PopulationNationData | PopulationStateData)[] => {
          const population = data.filter((item: PopulationNationData | PopulationStateData) => this.pupulationYearsToDisplay.includes(item['ID Year']))
          return population
        }),
        map(population => population.sort((a, b) => a['ID Year'] - b['ID Year'])),
        catchError((error: any): Observable<never[]> => {
          console.error(error)
          return of([])
        }
        )
      )
  }


}