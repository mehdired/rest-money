export interface Income {
  id: string;
  from: string;
  date: Date;
  amount: number;
  isTva: boolean;
}

export interface Settings {
  name: string;
  value: string;
}
