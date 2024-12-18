import { Component, Input } from '@angular/core';
import { HeadlineComponent } from '../../shared/components/headline/headline.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeadlineComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() public readonly buttonIcon = '/assets/icon-plus.svg';

  public newInvoice() {
    console.log('New Invoice');
  }
}
