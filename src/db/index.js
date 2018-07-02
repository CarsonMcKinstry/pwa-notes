import Dexie from 'dexie';
import { getAllNotes, getNote, getTrash } from './read';
import { createNote } from './create';
import { updateNote, recoverNote } from './update';
import { deleteNote, trashNote, collectTrash } from './delete';

const db = new Dexie('pwa-notes');

export const stores = {
  notes: '++id,body,createdAt,markedForDeletion,folder',
  folders: '++id,name,cratedAt,markedForDeletion',
};

db.version(1).stores(stores);

export default {
  getAllNotes: getAllNotes(db),
  getNote: getNote(db),
  getTrash: getTrash(db),
  createNote: createNote(db),
  updateNote: updateNote(db),
  deleteNote: deleteNote(db),
  trashNote: trashNote(db),
  collectTrash: collectTrash(db),
  recoverNote: recoverNote(db)
};
