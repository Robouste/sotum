import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { ExcludePipe } from "./exclude.pipe";
import { IncludePipe } from "./include.pipe";

@NgModule({
	declarations: [AppComponent, ExcludePipe, IncludePipe],
	imports: [
		BrowserModule,
		HttpClientModule,
		CommonModule,
		FormsModule,
		BrowserAnimationsModule,
		MatInputModule,
		MatButtonModule,
		MatListModule,
		MatSelectModule,
		MatButtonToggleModule,
		MatToolbarModule,
		MatIconModule,
		ScrollingModule,
		MatCardModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
