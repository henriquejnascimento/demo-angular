import { Component } from '@angular/core';
import { BaseFormComponent } from '../base-form/base-form.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { BaseField } from '../../models/base-field.model';
// import { FormInputType } from '../../enums/form-input-type';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormFieldType } from '../../enums/form-field-type';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    
    NgxMaskDirective, 
    NgxMaskPipe,
  ], 
  providers: [    
    provideNgxMask(),
  ],
  templateUrl: './../base-form/base-form.component.html',
  styleUrl: './../base-form/base-form.component.scss'
})
export class ProductFormComponent extends BaseFormComponent {
  override form!: FormGroup;        // TODO MOVE
  override formBuilder: FormBuilder; // TODO MOVE

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
    this.formBuilder = formBuilder;    
  }

  
  override fields: BaseField[] = [
	  {
		  "type": FormFieldType.TEXT,
      "name": "name",
      "label": "label-test",
		  
      //"placeholder": "000.000.000-00", // pode ser o mesmo valor do mask caso mask nao seja null
      "value": "test",
      "validators": [Validators.required],
      //"required": true,
      //"errorMessageRequiredField": "Campo obrigatório",
      //"disabled": true,
      

		  // "required": true,
		   //"mask": Mask.CPF,
		   //"style": "border: 12px;",    OK
       //"class": "class-test"        OK
       "order": 1,
	  },
	  {
		  "type": FormFieldType.CHECKBOX,
      "name": "checkbox-name",
      "label": "checkbox-label",
      "value": "checkbox-value",
      "validators": [Validators.required],
      //"required": true,
      //"errorMessageRequiredField": "Campo obrigatório",
      //"disabled": true,
      "order": 2,
	  },    
  ];
  
}
