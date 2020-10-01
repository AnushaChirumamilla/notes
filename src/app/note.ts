export class Note {
  id: any;
  title: string = '';
  content: string = '';
  datetime: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
