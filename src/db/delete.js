import curry from 'lodash/fp/curry';

export const collectTrash = curry(async (db, _) => {
  const notes = await db.notes.filter(note => note.markedForDeletion).toArray();
  const ids = notes.map(note => note.id);

  return db.notes.bulkDelete(ids);
});

export const deleteNote = curry(async (db, id) => {
  const note = await db.notes.get(id);
  if (!note.markedForDeletion) throw new Error('Notes must be marked for permanent deletion');

  return db.notes.delete(note.id);
});

export const trashNote = curry((db, { id }) => db
  .notes
  .update(id, { markedForDeletion: true }));
