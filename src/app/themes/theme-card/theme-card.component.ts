import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../view-models/message';

@Component({
  selector: 'app-theme-card',
  templateUrl: './theme-card.component.html',
  styleUrls: ['./theme-card.component.scss']
})
export class ThemeCardComponent {
  @Input() theme: Message;
  @Input() last: Boolean;
}
