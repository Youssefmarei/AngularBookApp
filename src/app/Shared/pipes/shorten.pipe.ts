import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone: false,
})
export class ShortenPipe implements PipeTransform {
  transform(value: string): string {
    return value.charAt(0).toUpperCase();
  }
}
