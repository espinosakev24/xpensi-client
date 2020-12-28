import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { RegistriesService } from './../../services/registries/registries.service';
import { IRegistry } from './../../interfaces/registry';

@Component({
  selector: 'app-add-registry-modal',
  templateUrl: './add-registry-modal.component.html',
  styleUrls: ['./add-registry-modal.component.scss']
})
export class AddRegistryModalComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) {}

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  ngOnInit(): void {
  }

}
@Component({
  selector: 'add-registry-dialog',
  templateUrl: './add-registry-dialog.html',
  styleUrls: ['./add-registry-modal.component.scss']
})
export class DialogElementsExampleDialog {
  checked = true;
  indeterminate = false;
  labelPosition: '1' | '-1' = '-1';
  disabled = false;
  constructor(
    public dialog: MatDialog,
    private registriesService: RegistriesService
  ) {}

  onSubmit(registryForm: NgForm) {
    const {
      id,
      title,
      description,
      amount,
      reg_date,
      registryFactor
    } = registryForm.value;

    if (!amount || !title) return;

    const amountSigned: number = parseFloat(amount) * parseFloat(registryFactor);
    const registry: IRegistry = {
      id,
      title,
      description,
      amount: amountSigned,
      reg_date,
    };

    this.registriesService.postRegistry(registry).subscribe(data => {
      this.dialog.closeAll();
      console.log(data);
    })
  }
  onNoClick(): void {
    this.dialog.closeAll();
  }
}