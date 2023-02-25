import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BrowserModule} from "@angular/platform-browser";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {MaterialModule} from "./material.module";
import {DateLanguageModule} from "./date-language.module";

import {SafePipe} from "../pipes/safe.pipe";

@NgModule({
  declarations: [SafePipe],
  imports: [
    CommonModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    DateLanguageModule,
  ],
  exports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    DateLanguageModule,
    SafePipe,
  ]
})

export class SharedModule {

}
