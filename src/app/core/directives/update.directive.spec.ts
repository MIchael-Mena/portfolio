import {UpdateDirective} from './update.directive';
import {TemplateRef, ViewContainerRef} from '@angular/core';

describe('UpdateDirective', () => {
  it('should create an instance', () => {
    const templateRefMock: TemplateRef<any> = {} as TemplateRef<any>;
    const viewContainerRefMock: ViewContainerRef = {} as ViewContainerRef;

    const directive = new UpdateDirective(templateRefMock, viewContainerRefMock);
    expect(directive).toBeTruthy();
  });
});
