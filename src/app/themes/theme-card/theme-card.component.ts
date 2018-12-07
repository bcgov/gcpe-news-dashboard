import { Component, OnInit, Input } from '@angular/core';
import { Theme } from '../../view-models/theme';

@Component({
  selector: 'app-theme-card',
  templateUrl: './theme-card.component.html',
  styleUrls: ['./theme-card.component.scss']
})
export class ThemeCardComponent {
  @Input() theme: Theme;
  @Input() last: Boolean;
}
