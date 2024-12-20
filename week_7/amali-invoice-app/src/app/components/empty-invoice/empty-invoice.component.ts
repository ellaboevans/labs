import { Component } from '@angular/core';
import { HeadlineComponent } from "../../shared/components/headline/headline.component";

@Component({
  selector: 'app-empty-invoice',
  standalone: true,
  imports: [HeadlineComponent],
  templateUrl: './empty-invoice.component.html',
  styleUrl: './empty-invoice.component.css'
})
export class EmptyInvoiceComponent {

}
