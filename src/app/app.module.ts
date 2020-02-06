import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CombinationComponent } from './combination/combination.component';

@NgModule({
  declarations: [AppComponent, CombinationComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
