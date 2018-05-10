import { shape, number, string, func, instanceOf } from 'prop-types';

/*
export const userType = shape({
  id: number,
  firstName: string.isRequired,
  lastName: string.isRequired,
  company: string,
  role: oneOf(['user', 'author']),
  address: shape({
    id: number.isRequired,
    street: string.isRequired,
    street2: string,
    city: string.isRequired,
    state: string.isRequired,
    postal: number.isRequired
  });
});
*/

export const domainComponentType = shape({
  acceptedTerms: string,
  accessCode: string.isRequired,
  domainId: number.isRequired,
  createdDate: instanceOf(Date).isRequired
});

export const createExplorationType = shape({
  domainId: number.isRequired,
  organizationId: number.isRequired,
  explorationCreateComplete: func.isRequired
});

export const accessCodeLoginType = shape({
  accessCode: string.isRequired,
  loginComplete: func.isRequired
})