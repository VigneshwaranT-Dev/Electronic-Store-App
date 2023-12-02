import { IFormObject } from 'src/app/models/form-object.model';
import { v4 as uuidv4 } from 'uuid';

export const esLoginFormObject: IFormObject = {
  esUserName: {
    id: uuidv4(),
    label: 'esUserName',
    value: '',
    type: 'InputText',
    validations: [],
    disabled: false,
  },
  esPassword: {
    id: uuidv4(),
    label: 'esPassword',
    value: '',
    type: 'InputText',
    validations: [],
    disabled: false,
  }
}
