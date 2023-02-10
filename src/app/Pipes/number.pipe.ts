import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'number'
})
export class NumberPipe implements PipeTransform {

  transform(value: number, ...args: number[]): string {
    return value.toFixed(1);
  }

}
