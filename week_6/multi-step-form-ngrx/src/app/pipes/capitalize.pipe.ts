import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string | undefined | null): string | null {
    if (typeof value === 'undefined' || value === null || value.trim() === '')
      return null;

    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
