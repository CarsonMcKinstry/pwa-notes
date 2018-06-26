import curry from 'lodash/fp/curry';

export const getAllNotes = curry((db, _) => db //eslint-disable-line 
  .where({ markedForDeletion: false })
  .toArray());

export const getNote = curry((db, id) => db.find(id));
