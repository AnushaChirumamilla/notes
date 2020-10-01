import { Component, OnInit, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotesService } from '../notes.service';
import { Note } from '../note';


import { OrderbyPipe } from '../orderby.pipe';


@Component({
  selector: 'app-notes-app',
  templateUrl: './notes-app.component.html',
  styleUrls: ['./notes-app.component.css'],
  providers: [NotesService, OrderbyPipe],

})
export class NotesAppComponent implements OnInit {


  noteindex: number;
  activenoteid: any;
  deletenote: boolean;
  onselectedanothernote: boolean = false;
  fname: string = 'New Note';
  newnotehighlight: boolean;

  noteid: any;

  notedata: any;

  shownewnote: boolean = false;
  newNote: Note = new Note();
  notes = [];
  noteForm: FormGroup;

  notevalue = {};

  today: number = Date.now();
  searchText = '';

  constructor(private noteService: NotesService, private fb: FormBuilder, private elementRef: ElementRef, public cdRef: ChangeDetectorRef) {
    this.createForm();
  }

  createForm() {
    this.noteForm = this.fb.group({ 'title': '', 'content': '', 'id': '', 'datetime': '' });
  }

  getNotes() {
    this.notes = this.noteService.getAllNotes();
    let i = this.notes.length;
    this.notedata = this.notes[i - 1];
    if (this.deletenote && this.noteindex != undefined) {
      this.notedata = this.notes[this.noteindex]
      this.onselectednote(this.notedata, this.notedata.id)
    }
    else {
      this.onselectednote(this.notedata, 0);
    }


  }
  searchnotes(event) {
    this.notes = this.noteService.searchnotes(event);
  }
  addNote(note) {

    if (note.content != "") {

      this.newNote = note;
      if (this.newNote.id)

        this.noteService.updateNoteById(this.newNote.id, this.newNote)

      else {
        this.noteService.addNote(this.newNote);

        this.getNotes();
      }
    }
  }



  ngAfterViewInit() {

    this.cdRef.detectChanges();
  }
  newNoteadd() {

    this.onselectedanothernote = true;

    this.newnotehighlight = true;
    this.createForm();
    this.activenoteid = '';
    this.fname = ''

    this.shownewnote = true;

    this.newNote = new Note;
    this.notedata = this.newnotedata
    this.noteid = this.notedata.id;
  }
  newnotedata = {
    'id': '',
    'title': "",
    'content': "New Note"

  }
  onselectednote(note, index?) {
    this.onselectedanothernote = true;
    if (this.shownewnote)
      this.shownewnote = false;
    this.activenoteid = note.id;
    // if (index != undefined)
    //   this.activeProjectIndex = index;
    if (note == undefined) {
      let note1 = this.newnotedata
      this.newnotehighlight = true;
      note = note1
    }
    else
      this.newnotehighlight = false;
    this.notevalue = note;
    this.noteid = note.id
    this.editNote(note);

  }

  editNote(note) {
    this.notedata = note;
    this.noteForm = this.fb.group({ 'title': note.title, 'content': note.content, 'id': note.id });
    if (this.onselectedanothernote) {
      if (note.content != "New Note" && !this.newnotehighlight) {
        this.fname = note.content;
      }
      else {

        this.fname = "New Note";
      }
    }
  }
  removeNote() {
    this.onselectedanothernote = true;


    this.deletenote = true;
    if (this.noteid) {
      this.noteindex = this.notes.findIndex(obj => obj.id == this.noteid);
      this.noteindex = this.noteindex - 1;
      this.noteService.deleteNoteById(this.noteid);
    }
    else if (this.shownewnote)
      this.shownewnote = false;
    // this.activeProjectIndex = 0;
    this.getNotes();
    this.deletenote = false;

  }
  ngOnInit() {
    this.getNotes();
  }
  onSubmit(value: any): void {

    value.datetime = this.today;
    value.content = this.fname;
    if (value.content != "") {
      this.addNote(value);
    }

    this.shownewnote = false;
  }
}
