import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { AuthService } from '../_auth/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      if(this.authService.roleMatch(this.appHasRole) && !this.isVisible) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.isVisible = true;
      } else if (!this.authService.roleMatch(this.appHasRole) && this.isVisible){
        this.viewContainerRef.clear();
        this.isVisible = false
      }
    });
  }
}
