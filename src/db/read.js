/* eslint-disable no-restricted-globals */
import curry from 'lodash/fp/curry';

export const getAllNotes = curry((db, _) => db // eslint-disable-line
  .notes
  .filter(note => note.markedForDeletion)
  .toArray());

export const getNote = curry((db, id) => {
  let parsedId = Number(id);
  if (isNaN(parsedId)) {
    parsedId = id;
  }

  return db
    .notes
    .get(parsedId);
});

export const getTrash = curry((db, _) => db // eslint-disable-line
  .notes
  .filter(note => !note.markedForDeletion)
  .toArray());
