import { Component, OnInit, Output } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../app/app.reducer";
import { map } from "rxjs/operators";
import { SeatService } from "./seat.service";
import { Subject } from "rxjs";
import { Seat } from "./seat.model";
@Component({
  selector: "app-seat-map",
  templateUrl: "./seat-map.component.html",
  styleUrls: ["./seat-map.component.scss"]
})
export class SeatMapComponent implements OnInit {
  seatToggle: boolean = false;
  seats: Seat[];
  arrayOfArrays = [];
  seatColor: string;
  flightid;
  @Output()
  seatno = new Subject<string>();
  rows1 = [
    { id: "1A", color: "primary" },
    { id: "1B", color: "primary" },
    "",
    { id: "1C", color: "warn" },
    { id: "1D", color: "primary" },
    "",
    { id: "1E", color: "primary" },
    { id: "1F", color: "warn" }
  ];
  rows2 = [
    { id: "2A", color: "primary" },
    { id: "2B", color: "primary" },
    "",
    { id: "2C", color: "primary" },
    { id: "2D", color: "primary" },
    "",
    { id: "2E", color: "primary" },
    { id: "2F", color: "primary" }
  ];
  rows3 = [
    { id: "3A", color: "primary" },
    { id: "3B", color: "primary" },
    "",
    { id: "3C", color: "primary" },
    { id: "3D", color: "primary" },
    "",
    { id: "3E", color: "primary" },
    { id: "3F", color: "primary" }
  ];
  rows4 = [
    { id: "4A", color: "primary" },
    { id: "4B", color: "primary" },
    "",
    { id: "4C", color: "warn" },
    { id: "4D", color: "warn" },
    "",
    { id: "4E", color: "primary" },
    { id: "4F", color: "warn" }
  ];
  rows5 = [
    { id: "5A", color: "primary" },
    { id: "5B", color: "primary" },
    "",
    { id: "5C", color: "primary" },
    { id: "5D", color: "primary" },
    "",
    { id: "5E", color: "warn" },
    { id: "5F", color: "primary" }
  ];
  rows6 = [
    { id: "6A", color: "primary" },
    { id: "6B", color: "primary" },
    "",
    { id: "6C", color: "primary" },
    { id: "6D", color: "primary" },
    "",
    { id: "6E", color: "primary" },
    { id: "6F", color: "warn" }
  ];
  rows7 = [
    { id: "7A", color: "primary" },
    { id: "7B", color: "primary" },
    "",
    { id: "7C", color: "warn" },
    { id: "7D", color: "warn" },
    "",
    { id: "7E", color: "primary" },
    { id: "7F", color: "primary" }
  ];
  rows8 = [
    { id: "8A", color: "primary" },
    { id: "8B", color: "primary" },
    "",
    { id: "8C", color: "primary" },
    { id: "8D", color: "primary" },
    "",
    { id: "8E", color: "warn" },
    { id: "8F", color: "warn" }
  ];
  rows9 = [
    { id: "9A", color: "warn" },
    { id: "9B", color: "primary" },
    "",
    { id: "9C", color: "primary" },
    { id: "9D", color: "primary" },
    "",
    { id: "9E", color: "primary" },
    { id: "9F", color: "warn" }
  ];
  // rows1=[{id:"1A",color:'primary'},{id:"1A",color:'primary'},"",{id:"1B",color:'warn'},{id:"1A",color:'primary'},"",{id:"1A",color:'primary'},{id:"1A",color:'warn'}]

  // rows2=["2A","2B","","2C","2D","","2E","2F"]
  // rows3=["3A","3B","","3C","3D","","3E","3F"]
  // rows4=["4A","4B","","4C","4D","","4E","4F"]
  // rows5=["5A","5B","","5C","5D","","5E","5F"]
  // rows6=["6A","6B","","6C","6D","","6E","6F"]
  // rows7=["7A","7B","","7C","7D","","7E","7F"]
  // rows8=["8A","8B","","8C","8D","","8E","8F"]
  // rows9=["9A","9B","","9C","9D","","9E","9F"]
  // rows10=["10A","10B","","10C","","10D","10E","10F"]
  bookedSeats = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    //private dialogRef: MatDialogRef<SeatMapComponent>,
    private store: Store<fromApp.appState>,
    private seatService: SeatService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flightid = params["id"];
    });
    console.log("ngInit called on seatmap");
    this.store
      .select("seats")
      .pipe(
        map(seatState => {
          console.log(seatState.seats);
          return seatState.seats;
        })
      )
      .subscribe(seats => {
        console.log(seats);
        this.seats = seats;
      });
    var size = 6;

    for (let i = 0; i <= this.seats.length; i += size) {
      this.arrayOfArrays.push(this.seats.slice(i, i + size));
    }
    console.log(this.arrayOfArrays);
  }

  seat(seatno: string) {
    console.log(seatno);
  }
  seatSelected(value) {
    this.seatToggle = !this.seatToggle;
    console.log(this.seatToggle);
    console.log(value);
    console.log(this.seats.indexOf(value));
    //this.seatService.selectSeat(value.seatno, this.seats.indexOf(value));
    this.seatService.selectSeat(value, this.seats.indexOf(value));
    this.router.navigate(["flights", this.flightid]);
    // this.router.navigate(['flights/3/passenger',number]);
    //this.router.navigate(["flights/3/passenger"], {
    //queryParams: { serviceId: number }
    //});
    // this.router.navigate(['flights/3/passenger'], {
    //   state: { example: number }
    // });
    // router.navigate(['/show_alunos'])
  }
}
