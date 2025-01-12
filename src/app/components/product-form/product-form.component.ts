import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../base-form/base-form.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { BaseField } from '../../models/base-field.model';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormFieldType } from '../../enums/form-field-type';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductStatusService } from '../../services/product-status.service';
import { ProductStatus } from '../../models/product-status.model';

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
export class ProductFormComponent extends BaseFormComponent implements OnInit {
  override form!: FormGroup;        // TODO MOVE
  override formBuilder: FormBuilder; // TODO MOVE  

  constructor(
    productService: ProductService, 
    private productStatusService: ProductStatusService,
    formBuilder: FormBuilder, 
    router: Router,
    activatedRoute: ActivatedRoute) {
    super(productService, formBuilder, router, activatedRoute);
    this.formBuilder = formBuilder;
  }
  
  override fields: BaseField[] = [
	  {
		  "type": FormFieldType.TEXT,
      "name": "name",
      "label": "Name",
		  
      //"placeholder": "000.000.000-00", // pode ser o mesmo valor do mask caso mask nao seja null
      //"value": "test",
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
		  "type": FormFieldType.TEXTAREA,
      "name": "description",
      "label": "Description",
      //"value": "",
      "validators": [Validators.required],
      //"required": true,
      //"errorMessageRequiredField": "Campo obrigatório",
      //"disabled": true,
      // "data": [
      //   { 
      //     "value": "value-1",
      //     "label": "label-1"
      //   },
      //   { 
      //     "value": "value-2",
      //     "label": "label-2"
      //   },        
      // ],
      "order": 2,
	  },
	  {
		  "type": FormFieldType.SELECT,
      "name": "status",
      "label": "Status",
      //"value": "1",
      "validators": [Validators.required],
      //"required": true,
      //"errorMessageRequiredField": "Campo obrigatório",
      //"disabled": true,
      // "data": [],
      // "data": [
      //   { 
      //     "value": "AVAILABLE",
      //     "label": "Available"
      //   },
      //   { 
      //     "value": "DAMAGED",
      //     "label": "Damaged"
      //   },        
      // ],      
      //"mappedBackendId": "id",
      "order": 3,
	  },    
  ];  

  updateFieldStatusData() {
    this.productStatusService.getData().subscribe(
      (response) => {        
          const data = response.map((status: ProductStatus) => ({
            value: status.id,
            label: status.description
          }));              
          this.updateFieldData('status', data); // TODO refactor status to variable
      },
      (error) => {
        console.error('Erro ao carregar status', error);
      }
    );
  }
  
  updateFieldData(fieldName: string, data: any) {
    const field = this.fields.find(f => f.name === fieldName);
    if (field) {
      field.data = data;
    }    
  }
  
  override ngOnInit(): void {    
    super.ngOnInit();
    this.updateFieldStatusData();
  }

}

