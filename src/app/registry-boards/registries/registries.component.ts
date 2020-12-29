import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegistriesService } from './../../services/registries/registries.service';
import { IRegistry } from './../../interfaces/registry';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditRegistryModalComponent } from '../edit-registry-modal/edit-registry-modal.component';
import { OperationsService } from 'src/app/services/ops/operations.service';

@Component({
  selector: 'app-registries',
  templateUrl: './registries.component.html',
  styleUrls: ['./registries.component.scss']
})
export class RegistriesComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  registries: IRegistry[] = []

  constructor(
    private registriesService: RegistriesService,
    public dialog: MatDialog,
    private ops: OperationsService
  ) { }

  ngOnInit(): void {
    this.updateRegistries();

    this.subscription = this.registriesService.refresh$.subscribe(() => {
      this.updateRegistries();
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openEditDialog(registry: IRegistry) {
    this.dialog.open(EditRegistryModalComponent, {
      data: {
        id: registry.id,
        title: registry.title,
        description: registry.description,
        amount: registry.amount,
        reg_date: registry.reg_date
      }
    });
  }

  updateRegistries() {
    this.registriesService.getRegistries().subscribe(data => {
      this.registries = data as IRegistry[];
    })
  }

  deleteRegistry(registry: IRegistry) {
    this.registriesService.deleteRegistry(registry).subscribe(data => {
      console.log(data, 'Registry removed');
    })
  }
  getRegistries() {
    return this.registries;
  }

  getFormatedDate(date: string) {
    return this.ops.convertIsoDate(date);
  }
}
