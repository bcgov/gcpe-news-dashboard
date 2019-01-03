import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../../view-models/message';
import { SortEvent } from '../../events/SortEvent';

@Component({
  selector: 'app-theme-card',
  templateUrl: './theme-card.component.html',
  styleUrls: ['./theme-card.component.scss']
})
export class ThemeCardComponent {
  @Input() theme: Message;
  @Input() first: boolean;
  @Input() last: boolean;
  @Input() admin: boolean = false;
  @Output() unpublishTheme = new EventEmitter<Message>();
  @Output() sort = new EventEmitter<SortEvent>();

  constructor(private router: Router) {}

  navigateToTheme() {
    this.router.navigate([`/theme/edit/${this.theme.id}`]);
  }

  unpublish() {
    this.unpublishTheme.emit(this.theme);
  }

  moveUp() {
    this.sort.emit({ direction: 'up', themeId: this.theme.id });
  }
  
  moveDown() {
    this.sort.emit({ direction: 'down', themeId: this.theme.id });
  }
}
