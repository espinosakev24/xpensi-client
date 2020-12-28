import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IRegistry } from 'src/app/interfaces/registry';
import { RegistriesService } from 'src/app/services/registries/registries.service';

@Component({
  selector: 'app-summaries',
  templateUrl: './summaries.component.html',
  styleUrls: ['./summaries.component.scss']
})
export class SummariesComponent implements OnInit, OnDestroy {
  registries: IRegistry[] = [];
  subscription = new Subscription();
  total: number = 0;
  spent: number = 0;
  earned: number = 0;

  constructor(private registriesService: RegistriesService) {}

  ngOnInit(): void {
    console.log('hello');
    this.updateRegistries();
    this.subscription = this.registriesService.refresh$.subscribe(() => {
      this.updateRegistries();
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  updateRegistries() {
    this.registriesService.getRegistries()
      .subscribe(registries => {
        this.registries = registries as IRegistry[];
        this.setAmounts();
      })
  }
  setAmounts() {
    this.total = 0;
    this.spent = 0;
    this.earned = 0;

    if (!this.registries.length) return;

    for (let registry of this.registries) {
      this.total += registry.amount;
      this.earned += registry.amount > 0 ? registry.amount : 0;
      this.spent += registry.amount < 0 ? registry.amount : 0;
    }
  }
  getTotalAmount() {
    return new Intl.NumberFormat().format(this.total);
  }
  getEarnedAmount () {
    return new Intl.NumberFormat().format(this.earned);
  }
  getSpentAmount() {
    return new Intl.NumberFormat().format(this.spent);
  }
  getRegistries() {
    return this.registries;
  }
}
