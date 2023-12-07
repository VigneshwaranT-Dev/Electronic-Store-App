import { IFormObject } from 'src/app/models/form-object.model';
import { v4 as uuidv4 } from 'uuid';

export const esSignupFormObject: IFormObject = {
  esFirstName: {
    id: uuidv4(),
    label: 'esFirstName',
    value: '',
    type: 'InputText',
    validations: [
      {
        validator: 'required',
        value: true,
        message: 'First Name Required'
      }
    ],
    disabled: false,
  },
  esLastName: {
    id: uuidv4(),
    label: 'esLastName',
    value: '',
    type: 'InputText',
    validations: [
      {
        validator: 'required',
        value: true,
        message: 'Last Name Required'
      }
    ],
    disabled: false,
  },
  esUserName: {
    id: uuidv4(),
    label: 'esUserName',
    value: '',
    type: 'InputText',
    validations: [
      {
        validator: 'required',
        value: true,
        message: 'Username Required'
      },
      {
        validator: 'min',
        value: true,
        message: 'Username Min 5 Characters Required'
      },
      {
        validator: 'userExists',
        value: true,
        message: 'Username Already Exists'
      }
    ],
    disabled: false,
  },
  esPassword: {
    id: uuidv4(),
    label: 'esPassword',
    value: '',
    type: 'InputText',
    validations: [
      {
        validator: 'required',
        value: true,
        message: 'Password Required'
      }
    ],
    disabled: false,
  },
  esConfPassword: {
    id: uuidv4(),
    label: 'esConfPassword',
    value: '',
    type: 'InputText',
    validations: [
      {
        validator: 'required',
        value: true,
        message: 'Confirm Password Required'
      },
      {
        validator: 'notSamePass',
        value: true,
        message: 'Passwords Must Be Same',
    },
    ],
    disabled: false,
  },
  esEmailId: {
    id: uuidv4(),
    label: 'esEmailId',
    value: '',
    type: 'InputText',
    validations: [
      {
        validator: 'required',
        value: true,
        message: 'Email Id Required'
      },
      {
        validator: 'pattern',
        value: '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}',
        message: 'Please Enter Valid Email Id',
      }
    ],
    disabled: false,
  },
  esUserMobNum: {
    id: uuidv4(),
    label: 'esUserMobNum',
    value: '',
    type: 'InputText',
    validations: [
      {
        validator: 'required',
        value: true,
        message: 'Mobile Number Required'
      },
      {
          validator: 'invalidMobNum',
          value: true,
          message: 'Please Enter Valid Mobile Number',
      },
    ],
    disabled: false,
  },
}
