import Dexie from 'dexie';
import { getAllNotes, getNote } from './read';

const db = new Dexie('pwa-notes');

db.version(1).stores({
  notes: '++id,body,created_at,markedForDeletion,folder',
  folders: '++id,name,markedForDeletion',
});

export default {
  getAllNotes: getAllNotes(db),
  getNote: getNote(db),
};
