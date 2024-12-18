import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-headline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.css',
})
export class HeadlineComponent {
  @Input({ required: true }) public label: string = '';
  @Input({ required: true }) public level: number = 1;
  @Input() public color: string = '';
  @Input() public align: string = 'left';
  @Input() public weight: string = 'normal';

  get headingTag(): string {
    switch (this.level) {
      case 1:
        return 'h1';
      case 2:
        return 'h2';
      case 3:
        return 'h3';
      case 4:
        return 'h4';
      case 6:
        return 'p';
      default:
        return 'h1';
    }
  }
}
