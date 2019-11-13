import { test, allPass, compose } from 'ramda';

const containsOnlyEngAndNumbers = test(/^[A-Za-z0-9]+$/);

const getCardID = (obj: FormData) => obj.get('card_id') as string;
export const cardIDValidator = containsOnlyEngAndNumbers;
const validateCardID = compose(containsOnlyEngAndNumbers, getCardID);

export const validateUser = allPass([validateCardID]);