import { ValidatorFn } from '@angular/forms';
import { FormFieldType } from '../enums/form-field-type';
import { FormInputData } from './form-input-data';
import { Observable } from 'rxjs';

export class BaseField {
  type!: FormFieldType;
  name!: string;
  label!: string;
  validators?: ValidatorFn[];
  placeholder? :string;
  value? :string;    
  disabled?: boolean;
  mask? :string;
  class? :string;
  style? :string;
  order?: number;
  data?: FormInputData[] | any | Observable<any[]>;;
  
  //mappedBackendId?: string;
}