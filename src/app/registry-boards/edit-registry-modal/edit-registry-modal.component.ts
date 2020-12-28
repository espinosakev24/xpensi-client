import { Component, OnInit, Inject } from '@angular/core';
import { IRegistry } from 'src/app/interfaces/registry';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperationsService } from 'src/app/services/ops/operations.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RegistriesService } from 'src/app/services/registries/registries.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './matTimeFormatter';
@Component({
  selector: 'app-edit-registry-modal',
  templateUrl: './edit-registry-modal.component.html',
  styleUrls: ['./edit-registry-modal.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class EditRegistryModalComponent implements OnInit {
  templateData = {
    title: '',
    description: '',
    amount: 0,
    date: new FormControl(new Date())
  }
  editForm: FormGroup;

  constructor(
    public registriesService: RegistriesService,
    public ops: OperationsService,
    public dialogRef: MatDialogRef<EditRegistryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRegistry,
    private formBuilder: FormBuilder,
  ) {
    this.editForm = formBuilder.group({ title: [], description: [], amount: [], reg_date: [] })
  }
  ngOnInit(): void {
    const { title, description, amount, reg_date } = this.data;
    this.templateData = {
      title: title,
      description: description,
      amount: amount,
      date: new FormControl(new Date(reg_date))
    }
    this.editForm = this.formBuilder.group({
      title: [title, Validators.required],
      description: [description],
      amount: [amount, Validators.required],
      reg_date: [reg_date, Validators.required]
    })
  }
  onSubmit() {
    if (!this.editForm.valid) return;
    const { id } = this.data;
    const registry = this.editForm.value;
    const timeStamp = this.ops.toTimestamp(registry.reg_date);

    this.registriesService.putRegistry({ ...registry, id: id, reg_date: timeStamp }).subscribe(data => {
      this.dialogRef.close();
    });
  }
}
