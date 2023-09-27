import { object, string, number } from "yup";

export const roomValidationSchema = object().shape({
  roomname: string().required("Room name is required"),
  roomnumber: number()
    .moreThan(0, "Number of occupants need to be more than 0")
    .typeError("Number of occupants need to be an number")
    .required("Room number is required"),
  gender: string().required("Gender is required"),
});

export const authValidationSchema = object().shape({
  username: string().required("Username is required"),
  password: string().required("Password is required"),
});

export const codeValidationSchema = object().shape({
  amount: number()
    .moreThan(0)
    .typeError("Amount should be a number")
    .required("Amount is required"),
  nameofpayer: string().required('Payer\'s name is required')
});


export const bookValidationSchema = object().shape({
  code: string().required('Code is required'),
  fullname: string().required('Full name is required'),
  dob: string().required('Day and month of birth is required'),
  phonenumber: string().length(10, 'Phone number should be 10 digits long').required('Phone number is required'),
  emailaddress: string().email('Please enter a valid email address'),
  gender: string().required('Gender is required'),
  branch: string().required('Branch is required'),
  studentOrAlumni: string().required('Please specify your status'),
  highestlevelofeducation: string().required('Highest level of education is required'),
  institution: string().required('Institution is required'),
  currentlyemployed: string().required('Currently employed is required'),
  jobtitle: string().when('currentlyemployed', {
    is: 'yes',
    then: () => string().required('Job title is required'),
  }),
  currentplaceofemployment: string().when('currentlyemployed', {
    is: 'yes',
    then: () => string().required('Current place of employment is required'),
  }),
});