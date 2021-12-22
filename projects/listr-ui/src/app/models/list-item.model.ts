export class ListItem {
  id: string;
  name: string;
  selected: boolean;
  order: number;

  constructor(
    id: string, 
    name: string, 
    selected: boolean = false,
    order: number = -1) {
      this.id = id;
      this.selected = selected;
      this.name = name;
      this.order = order;
    }
}
