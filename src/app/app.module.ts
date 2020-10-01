
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { NotesAppComponent } from './notes-app/notes-app.component';
import { FilterPipe } from './filter.pipe';
import { HighlightDirective } from './highlight.directive';
import { OrderbyPipe } from './orderby.pipe';



@NgModule({
  declarations: [
    AppComponent,
    NotesAppComponent,
    FilterPipe,
    HighlightDirective,

    OrderbyPipe
  ],
  imports: [
    BrowserModule,

    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
