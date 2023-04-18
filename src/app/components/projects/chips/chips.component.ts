import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent implements OnInit {
  @Input() skills: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  technologyCtrl = new FormControl('');
  filteredSkills: Observable<string[]>;
  technologies: string[] = [];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredSkills = this.technologyCtrl.valueChanges.pipe(
      startWith(null),
      map((technology: string | null) => (technology ? this._filter(technology) : this.skills.slice())),
    );
  }

  ngOnInit(): void {
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
    this.fruitInput.nativeElement.value = '';
    this.technologyCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.skills.filter(technology => technology.toLowerCase().includes(filterValue));
  }

}
