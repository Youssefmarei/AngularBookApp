import { Pipe, PipeTransform } from '@angular/core';

/**
 * A pipe that transforms a string by returning its first character in uppercase.
 */
@Pipe({
  name: 'shorten',
  standalone: false,
})
export class ShortenPipe implements PipeTransform {
  transform(value: string): string {
    return value.charAt(0).toUpperCase();
  }
}
