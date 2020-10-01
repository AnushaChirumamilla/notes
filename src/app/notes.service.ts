import { Injectable } from '@angular/core';
import { Note } from './note';
@Injectable()
export class NotesService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 0;

  // Placeholder for notes
  notes: Note[] = [];

  constructor() {
    if (!localStorage.getItem('notes')) {
      localStorage.setItem('notes', JSON.stringify([]));
    }
  }

  // Simulate POST /notes
  addNote(note: Note): NotesService {
    if (this.notes.length) {
      this.lastId = this.notes[this.notes.length - 1].id;
    }
    if (!note.id) {
      note.id = ++this.lastId;
    }

    this.notes.push(note);
    localStorage.setItem('notes', JSON.stringify(this.notes));
    return this;
  }

  // Simulate DELETE /notes/:id
  deleteNoteById(id: number): NotesService {
    this.notes = this.notes
      .filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(this.notes));
    return this;
  }

  // Simulate PUT /notes/:id
  updateNoteById(id: number, values: Object = {}): Note {
    let note = this.getNoteById(id);
    if (!note) {
      return null;
    }
    Object.assign(note, values);
    localStorage.setItem('notes', JSON.stringify(this.notes));
    return note;
  }
  searchnotes(content: string): Note[] {
    let note = this.getNotebysearch(content);
    let notes = JSON.stringify(note);

    return JSON.parse(notes);
  }
  // Simulate GET /notes
  getAllNotes(): Note[] {
    let notes = JSON.parse(localStorage.getItem('notes'));
    if (notes) {
      this.notes = notes;
    } else {
      this.notes = [];
    }
    return this.notes;
  }

  // Simulate GET /notes/:id
  getNoteById(id: number): Note {
    return this.notes
      .filter(note => note.id === id)
      .pop();
  }
  getNotebysearch(content1: string) {
  console.log('notes',this.notes);
    let cities = [
      { name: 'Los Angeles', population: 3792621 },
      { name: 'New York', population: 8175133 },
      { name: 'Chicago', population: 2695598 },
      { name: 'Houston', population: 2099451 },
      { name: 'Philadelphia', population: 1526006 }
    ];
    let bigCities = this.notes.filter(function (e) {
      let str=e.content;
      if(str.includes(content1)){
      return e.content === content1;
      }
    });
    let bigCities1 = cities.filter(function (e) {
      return e.name === 'New';
    });
    console.log(bigCities);
    console.log(bigCities1);
return this.notes
  .filter(note => note.content === content1);
   



  }

}
