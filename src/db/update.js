import curry from 'lodash/fp/curry';

export const updateNote = curry((db, id, body) => db
  .notes
  .update(id, { body }));

export const recoverNote = curry((db, id) => db
  .notes
  .update(id, { markedForDeletion: false }));
