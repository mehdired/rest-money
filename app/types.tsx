export interface Income {
  id: string;
  from: string;
  date: Date;
  amount: number;
}

export interface Settings {
  urssaf: number;
  tva: number;
}
