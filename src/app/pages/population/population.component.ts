import { Component, OnDestroy } from '@angular/core';
import { PopulationService } from 'src/app/services/population/population.service';
import { STATES_OF_AMERICA } from 'src/app/constants/populationConstants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cen-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.sass']
})
export class PopulationComponent implements OnDestroy {

  public readonly derilldownsOptions = ['Nation', 'State'];
  public readonly defaultDrilldowns = 'Nation';
  public readonly statesOfAmerica = STATES_OF_AMERICA;

  public populationOptionsForm: FormGroup = new FormGroup({})

  private readonly drilldownsChangesSubscription: Subscription = new Subscription();

  constructor(
    private readonly pupulationService: PopulationService,
    private readonly fb: FormBuilder
  ) {
    this.populationOptionsForm = this.initialFormState();
    this.drilldownsChangesSubscription = this.populationOptionsForm?.get('drilldown')!.valueChanges.subscribe(this.onFormChange);
  }
  ngOnDestroy(): void {
    this.drilldownsChangesSubscription.unsubscribe()
  }

  public populationData$ = this.pupulationService.getPopulationData()

  public initialFormState = () => this.fb.group({
    drilldown: [this.defaultDrilldowns, [Validators.required]],
    state: ['']
  });


  onFormChange = (drillsownValue: string) => {
    if (drillsownValue === this.defaultDrilldowns) {
      this.populationData$ = this.pupulationService.getPopulationData()
      this.populationOptionsForm?.get('state')?.setValue('')
    }

    if (drillsownValue === 'State') {
      this.populationData$ = this.pupulationService.getPopulationData('State')
    }
  }
}

interface PopulationOptions {
  drilldown: string
  state?: string
}