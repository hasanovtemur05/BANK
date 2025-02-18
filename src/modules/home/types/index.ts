export interface BankType {
    id:number
    name:string
    slug:string
}

export interface ConverterType {
    currency: string | undefined;
    from_c: string;
    to_c: string;
    bank: number;
    type: "buy" | "sell";
    amount: number;
  }

export interface PredictionType {
    currency:string
    date:string
    predicted_change:string
    predicted_rate:string
    status: string
}

export interface ChartItemType {
    date: string;
    buying: number;
    selling: number;
  }

  export interface FaqsType {
    answer: string
    id: number
    question: string
    slug: string
  }