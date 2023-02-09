import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resenha'
})
export class ResenhaPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    return value.slice(0, 360) + '...'
  }

}
