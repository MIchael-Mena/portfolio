import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, timeout} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent implements OnChanges {
  @Input() skills: string[] = [];
  @Input() technologies: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  technologyCtrl = new FormControl('');
  filteredSkills!: Observable<string[]>;

  @ViewChild('technologyInput') technologyInput!: ElementRef<HTMLInputElement>

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // Cuando cambia el valor de skills, se actualiza el valor de filteredSkills
    // Si no se hace esto, el autocomplete no funciona al abrir el modal. Solo funciona después de escribir algo
    if (changes['skills']) {
      this.filteredSkills = this.technologyCtrl.valueChanges.pipe(
        startWith(null),
        map((technology: string | null) => (technology ? this._filter(technology) : this.skills.slice())),
      );
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.technologies.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.technologyCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.technologies.indexOf(fruit);

    if (index >= 0) {
      this.technologies.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.technologies.push(event.option.viewValue);
    this.technologyInput.nativeElement.value = '';
    this.technologyCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.skills.filter(technology => technology.toLowerCase().includes(filterValue));
  }

}
