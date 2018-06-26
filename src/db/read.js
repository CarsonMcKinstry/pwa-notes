import curry from 'lodash/fp/curry';

export const getAllNotes = curry((db, _) => db // eslint-disable-line
  .notes
  .filter(note => note.markedForDeletion)
  .toArray());

export const getNote = curry((db, id) => db
  .notes
  .get(id));

export const getTrash = curry((db, _) => db // eslint-disable-line
  .notes
  .filter(note => !note.markedForDeletion)
  .toArray());
