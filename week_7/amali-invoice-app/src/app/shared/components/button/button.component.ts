import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonType } from '../../types/button.types';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input({ required: true }) public label: string = '';
  @Input() public altText: string = '';
  @Input() public icon: string = '';
  @Input() public isDisabled: boolean = false;
  @Input() public variant: ButtonType = 'primary';

  @Output() private clicked = new EventEmitter<void>();

  public onClick(): void {
    this.clicked.emit();
  }
}
