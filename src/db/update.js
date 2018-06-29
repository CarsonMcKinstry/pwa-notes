/* eslint-disable import/prefer-default-export */
import curry from 'lodash/fp/curry';

export const updateNote = curry((db, id, body) => db
  .notes
  .update(id, { body }));
