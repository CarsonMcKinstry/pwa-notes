import curry from 'lodash/fp/curry';
import moment from 'moment';

export const createNote = curry((db, body) => {
  const createdAt = moment().toISOString();
  return db.notes.add({
    markedForDeletion: false,
    body,
    createdAt,
    folder: null
  });
});

export const createFolder = curry((db, name) => {
  const createdAt = moment().toISOString();
  return db.folders.add({
    createdAt,
    name,
    markedForDeletion: false,
  });
});
