import { Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";

export const SELECT_SEAT = "SELECT_SEAT";

export class SelectSeat implements Action {
  readonly type = SELECT_SEAT;

  constructor(public payload: { seat: string; color: string; index: number }) {}
}

export type SeatActions = SelectSeat;
