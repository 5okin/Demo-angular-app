import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LandmarkModalComponent } from './landmark-modal/landmark-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    ImageModalComponent,
    SearchBarComponent,
    LandmarkModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
