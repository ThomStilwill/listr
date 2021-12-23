import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { BasicRoutingModule } from './basic-routing.module';



@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    BasicRoutingModule
  ]
})
export class BasicModule { }
