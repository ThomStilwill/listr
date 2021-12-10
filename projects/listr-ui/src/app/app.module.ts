import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponent } from './containers/basic/basic.component';
import { ItemComponent } from './components/item/item.component';
import { ListService } from './services/list.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ListReducer } from './store/list.reducer';
import { ListEffects } from './store/list.effects';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      items: ListReducer
    }),
    EffectsModule.forRoot([ListEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
