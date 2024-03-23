import {SafePipe} from './safe.pipe';
import {DomSanitizer} from '@angular/platform-browser';

describe('SafePipe', () => {
  it('should create an instance', () => {
    const domSanitizerMock: DomSanitizer = {} as DomSanitizer;

    const pipe = new SafePipe(domSanitizerMock);
    expect(pipe).toBeTruthy();
  });
});
