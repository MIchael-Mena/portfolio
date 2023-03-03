import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {IconData} from "../skill/SkillData";

@Component({
  selector: 'app-select-file',
  templateUrl: './select-file.component.html',
  styleUrls: ['./select-file.component.css']
})
export class SelectFileComponent implements OnChanges {

  @Input() previewFile: string = '';
  @Output() onChooseFile: EventEmitter<IconData> = new EventEmitter<IconData>();
  public invalidFormatError: boolean = false;
  @Input() hasRequiredError: boolean = false;

  constructor() {
  }

  public ngOnChanges(): void {
    // TODO: mejorar código
    if (this.previewFile.includes('<svg')) {
      this.previewSvgInBase64 = this.previewFile;
    }
  }

  public onFileSelected(event: any) {
    // TODO: SVG sin viewBox no se visualiza bien en mat-icon
    // Contiene los binarios del archivo, el nombre y el tipo
    const file = <File>event.target.files[0];

    if (file.type === 'image/svg+xml') {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      // No hay await en el on load es un callback y se continúa la ejecución
      fileReader.onload = async e => {
        this.setUpFile(fileReader, file);
      }
      // Si uso readAsDataURL, me lo convierte a base64
      // fileReader.readAsDataURL(file);
      // this.fileSelected = file;
    } else {
      this.invalidFormatError = true;
    }
  }

  private setUpFile(fileReader: FileReader, file: File): void {
    const result = fileReader.result as string;
    if (this.checkMaliciousSvg(result)) {
      return;
    }
    this.previewSvgInBase64 = result;
    this.hasRequiredError = false;
    this.invalidFormatError = false;
    this.onChooseFile.emit({
      name: file.name,
      content: result,
    });
  }

  private checkMaliciousSvg(svg: string): boolean {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const script = doc.getElementsByTagName('script');
    if (script.length > 0) {
      // throw new Error('Malicious SVG');
      console.error('Malicious SVG');
      return true;
    }
    return false;
  }

  set previewSvgInBase64(svg: string) {
    this.previewFile = 'data:image/svg+xml;base64,' + window.btoa(svg);
  }

}
