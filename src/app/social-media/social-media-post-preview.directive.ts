import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSocialMediaPostPreviewHost]',
})
export class SocialMediaPostPreviewDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
