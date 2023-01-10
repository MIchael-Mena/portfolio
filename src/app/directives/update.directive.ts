import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUpdate]'
})

export class UpdateDirective implements OnChanges {
  @Input() appUpdate: any;

  constructor( private templateRef : TemplateRef<any>,
               private viewContainer : ViewContainerRef ) 
  { 
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  ngOnChanges( changes : SimpleChanges ): void {
    if( changes['appUpdate'] && changes['appUpdate'].previousValue != undefined)
    {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
