export class ListItem {
  id: string;
  name: string;
  selected: boolean;
  dirty: boolean;

  constructor(id: string, name: string, selected: boolean = false) {
      this.id = id;
      this.selected = selected;
      this.name = name;
    }
}