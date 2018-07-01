import Dexie from 'dexie';
import { getAllNotes, getNote } from './read';
import { createNote } from './create';
import { updateNote } from './update';

const db = new Dexie('pwa-notes');

export const stores = {
  notes: '++id,body,createdAt,markedForDeletion,folder',
  folders: '++id,name,cratedAt,markedForDeletion',
};

db.version(1).stores(stores);

export default {
  getAllNotes: getAllNotes(db),
  getNote: getNote(db),
  createNote: createNote(db),
  updateNote: updateNote(db)
};
