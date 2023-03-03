import {Component, Input} from '@angular/core';
import {faSquareCaretDown, faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {faTrashCan, faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import {StorageSessionService} from "../../../service/storage-session.service";
import {MatDialog} from "@angular/material/dialog";
import {SocialMedia} from "../AboutMeData";

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent {

  @Input() socialMedia: SocialMedia[] = [];
  public icons = {faSquareCaretDown, faPenToSquare, faTrashCan, faSquarePlus}
  public isLoggedIn: boolean = false;
  public activeEdit: boolean = false;

  constructor(private storageService: StorageSessionService, private dialog: MatDialog,) {
    this.storageService.onToggleSignUp().subscribe(() => {
      this.isLoggedIn = storageService.isLoggedIn;
    });
  }

  public editSocialMedia(): void {
    this.activeEdit = !this.activeEdit;
  }

  public openDeleteDialog(): void {

  }

  public openEditModal(): void {

  }

  public openAddModal(): void {

  }

}
