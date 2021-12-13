import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppConfigModule } from './app-config.module';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material/material.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';  

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    ItemComponent
  ],
  imports: [
    AppConfigModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({
      items: ListReducer
    }),
    EffectsModule.forRoot([ListEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule 
  ],
  providers: [ListService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
       ...new MatDialogConfig(),
       disableClose: true,
       autoFocus: true,
       hasBackdrop: true,
       width: '400px',
       position: {
         top: '60px'
       }
       } as MatDialogConfig
     }],
  bootstrap: [AppComponent]
})
export class AppModule { }
