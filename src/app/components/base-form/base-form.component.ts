import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseField } from '../../models/base-field.model';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormFieldType } from '../../enums/form-field-type';
import { FORM_INPUT_TYPE as EXTERNAL_FORM_INPUT_TYPE } from '../../constant/form-input-types';

@Component({
  selector: 'app-base-form',
  standalone: true,
  templateUrl: './base-form.component.html',
  styleUrl: './base-form.component.scss',
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
})
export class BaseFormComponent implements OnInit {
  form!: FormGroup;
  fields: BaseField[] = [];
  formBuilder: FormBuilder;
  inputTypeValues = Object.values(FormFieldType);
  errorMessages = {
    required: 'Campo obrigatório.',
    email: 'E-mail inválido.',
    minlength: (min: number) => `Este campo deve ter no mínimo ${min} caracteres.`,
    maxlength: (max: number) => `Este campo deve ter no máximo ${max} caracteres.`,
    pattern: 'Este campo não corresponde ao padrão esperado.',
  };
  readonly FORM_INPUT_TYPE = EXTERNAL_FORM_INPUT_TYPE;
  
  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }

  ngOnInit(): void {
    const formGroup: { [key: string]: any } = {};    
    this.fields.forEach(field => {      
      const validators = field.validators ? field.validators : [];
      formGroup[field.name] = new FormControl(
        { value: field.value || '', disabled: field.disabled || false }, 
        validators
      );
    });

    this.form = this.formBuilder.group(formGroup);
    this.updateFieldsOrdered();
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log('Formulário inválido');
    }
  }

  getErrorMessage(control: AbstractControl | null): string {
    if (!control) {
      return '';
    }
  
    if (control.errors) {
      for (const errorKey in control.errors) {        
        if (this.errorMessages.hasOwnProperty(errorKey)) {
          const errorValue = control.errors[errorKey];  
          const errorMessage = this.errorMessages[errorKey as keyof typeof this.errorMessages];  
          if (typeof errorMessage === 'function') {            
            return (errorMessage as Function)(errorValue?.requiredLength || errorValue?.maxlength);
          }  
          return errorMessage as string;
        }
      }
    }
    return '';
  }

  updateFieldsOrdered() {
    return this.fields.sort((a,b) => {
      const orderA = a.order ?? 0;
      const orderB = b.order ?? 0;
      return orderA - orderB;
    });
  }

}
