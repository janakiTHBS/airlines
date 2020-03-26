import { NgModule } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectChange, MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
const materials = [
  MatListModule,
  MatGridListModule,
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule
];
@NgModule({
  imports: [materials],
  exports: [materials]
})
export class MaterialModule {}
