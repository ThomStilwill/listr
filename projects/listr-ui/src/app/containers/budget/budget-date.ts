export class BudgetDate {
  date: Date;
  weekNumber: number = 0;
  amount: number = 0;
  total: number = 0;

  constructor(date:Date){
    this.date = new Date(date);

  }
}
