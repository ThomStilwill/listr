import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BudgetDate } from './budget-date';

import { BudgetItem } from './budget-item';
import budgetData from "./budget.json";

@Component({
  selector: 'listr-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  days = ["sunday","monday","tuesday","wednesday","thursday", "friday", "saturday"];
  items = new Array<BudgetItem>();
  budgetDates = new Array<BudgetDate>();

  startDate: Date;
  endDate: Date;
  startAmount: number;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {

    budgetData.items.forEach(item => {
      this.items.push(item);
    });

    const startDateText = '2022-1-1';
    const endDateText = '2022-3-2';

    this.startDate = new Date(startDateText);
    this.endDate = new Date(endDateText);
    this.startAmount = 2000;
    this.buildBudget();
  }

  modelChanges(event){
    this.buildBudget();
  }

  buildBudget(){
    let total = this.startAmount;

    let currentDate = new Date(this.startDate);
    this.budgetDates = new Array<BudgetDate>();

    while(currentDate < this.endDate){
      const budgetDate = new BudgetDate(currentDate);
      budgetDate.total = total;
      this.setAmount(budgetDate);
      total = budgetDate.total;
      this.budgetDates.push(budgetDate)
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }


  setAmount(budgetDate: BudgetDate): void {
    let amount = 0;
    this.items.forEach(item => {
      amount += this.getBudgetAmount(budgetDate.date, item);
    });

    budgetDate.weekNumber = this.weekNumber(budgetDate.date);
    budgetDate.amount = amount;
    budgetDate.total += amount;
  }

  getBudgetAmount(date: Date, budgetItem: BudgetItem): number {
    var day = this.days[date.getDay()];
    var dom = date.getDate();

    var weekNumber = this.weekNumber(date);
    var isEven = weekNumber % 2 === 0;

    console.log(date, weekNumber, isEven);

    if(dom == budgetItem.monthDay) {
      return budgetItem.amount;
    }

    if(day == budgetItem.dow) {

      if(!budgetItem.week){
        return budgetItem.amount;
      }
      if(budgetItem.week === 'even' && isEven) {
        return budgetItem.amount;
      }
      if(budgetItem.week === 'odd' && !isEven) {
        return budgetItem.amount;
      }

    }

    return 0;
  }

  weekNumber(date: Date): number {
      return Number(this.datePipe.transform(date,'w'));
  }

}
