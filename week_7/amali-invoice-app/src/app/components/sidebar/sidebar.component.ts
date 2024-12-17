import { Component } from '@angular/core';
import { AvatarComponent } from "../avatar/avatar.component";
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AvatarComponent, ThemeToggleComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
