export interface Appointment {
  id: number;
  type: number;
  notes: string;
  takerid: number;
  date: number;
  dayid: number;
}

export interface Day {
  id: number;
  date: number;
  appointments: Appointment[];
}
