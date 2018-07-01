/* globals beforeAll, describe, it, expect */
import Dexie from 'dexie';
import indexedDB from 'fake-indexeddb';
import IDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange';
import faker from 'faker';
import every from 'lodash/fp/every';

import { stores } from './index';
import { getAllNotes, getNote, getTrash } from './read';
import { createNote, createFolder } from './create';
import { trashNote, deleteNote, collectTrash } from './delete';
import { updateNote } from './update';

Dexie.dependencies.indexedDB = indexedDB;
Dexie.dependencies.IDBKeyRange = IDBKeyRange;

const db = new Dexie('pwa-notes');
db.version(1).stores(stores);

beforeAll(() => {
  const notes = [...Array(10)].map((_, i) => ({
    body: faker.lorem.paragraph(1),
    markedForDeletion: i >= 5,
    folder: null
  }), ['body', 'markedForDeletion', 'folder']);

  db
    .notes
    .bulkAdd(notes);
  // .then(() => db.notes.toArray())
  // .then(console.log);
});

describe('pwa-notes db', () => {
  it('should exist', () => {
    expect(db.name).toBe('pwa-notes');
  });

  it('should have two tables', () => {
    const { tables } = db;

    expect(tables.length).toBe(2);
  });

  describe('notes table', () => {
    it('should exist', () => {
      expect(db.notes).toBeDefined();
    });

    it('should have 10 records', () => {
      expect.assertions(1);
      return db.notes.count().then(count => expect(count).toEqual(10));
    });

    describe('getAllNotes', () => {
      it('should return 5 notes not marked for deletion', async () => {
        expect.assertions(2);
        const notes = await getAllNotes(db, null);
        expect(notes.length).toEqual(5);
        expect(every(note => note.markedForDeletion, notes)).toBeTruthy();
      });
    });

    describe('getNote', () => {
      it('should return 1 note when id is passed', () => {
        expect.assertions(1);
        return getNote(db, 1)
          .then(note => expect(note.id).toEqual(1));
      });
      it('should return a note if an id of type string is passed', () => {
        expect.assertions(1);
        return getNote(db, '1')
          .then(note => expect(note.id).toEqual(1));
      });
    });

    describe('getTrash', () => {
      it('should return 5 notes marked for deletion', async () => {
        expect.assertions(2);
        const trash = await getTrash(db, null);
        expect(trash.length).toEqual(5);
        expect(every(note => !note.markedForDeletion, trash)).toBeTruthy();
      });
    });

    describe('createNote', () => {
      it('should create a new note', async () => {
        expect.assertions(3);
        const created = await createNote(db, faker.lorem.paragraph());
        expect(created).toBeDefined();
        const count = await db.notes.count();
        expect(count).toEqual(11);
        const last = await db.notes.toCollection().last();
        expect(last.id).toEqual(11);
      });
    });

    describe('createFolder', () => {
      it('should create a new folder', async () => {
        expect.assertions(3);
        const created = await createFolder(db, 'Hello World');
        expect(created).toBeDefined();
        const count = await db.folders.count();
        expect(count).toEqual(1);
        const last = await db.folders.toCollection().last();
        expect(last.id).toEqual(1);
      });
    });

    describe('updateNote', () => {
      it('should update a note', async () => {
        expect.assertions(3);

        const note = await getNote(db, 2);
        expect(note).toBeDefined();
        const updated = await updateNote(db, 2, 'Hello World');
        expect(updated).toBeTruthy();
        const updatedNote = await getNote(db, 2);
        expect(updatedNote.body).toBe('Hello World');
      });
    });

    describe('trashNote', () => {
      it('should trash a note', async () => {
        expect.assertions(3);
        const note = await getNote(db, 1);
        expect(note).toBeDefined();
        const updatedId = await trashNote(db, note);
        expect(updatedId).toEqual(1);
        const updatedNote = await getNote(db, 1);
        expect(updatedNote.markedForDeletion).toBe(true);
      });
    });

    describe('deleteNote', () => {
      it('should delete a note', async () => {
        expect.assertions(2);

        const deletedResponse = await deleteNote(db, 1);
        expect(deletedResponse).toBeUndefined();
        const note = await getNote(db, 1);
        expect(note).toBeUndefined();
      });

      it('should throw an error if markedForDeletion is false', async () => {
        expect.assertions(1);
        await expect(deleteNote(db, 2)).rejects.toEqual(Error('Notes must be marked for permanent deletion'));
      });
    });

    describe('collectTrash', () => {
      it('should delete notes marked for deletion', async () => {
        expect.assertions(2);
        await collectTrash(db, null);

        const notes = await db.notes.toArray();
        expect(every(note => note.id <= 5 || note.id > 10, notes)).toBe(true);
        expect(notes.length).toEqual(5);
      });
    });
  });
});
