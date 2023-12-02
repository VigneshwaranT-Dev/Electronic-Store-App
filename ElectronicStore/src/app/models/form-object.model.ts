export interface IFormObject {
  [key: string]: IFormField;
}

export interface IFormField {
  id?: any;
  label?: string;
  value?: any;
  type?:
    | 'FormArray'
    | 'ChildForm'
    | 'InputText'
    | 'ComboBox'
    | 'CheckBox'
    | 'RadioBox'
    | 'TextArea'
    | 'DateField'
    | 'Hidden'
    | string;
  subForm?: IFormObject;
  validations?: FormValidation[]|any;
  disabled?: boolean;
  products?: string[];
  supplementCodes?: string[];
  irmpOptions?: any;
}

export interface FormValidation {
  validator: 'min' | 'max' | 'required' | 'requiredTrue' | 'email' | 'minLength' | 'maxLength' | 'pattern' | string;
  value: any;
  message: string;
}
