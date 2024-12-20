export interface Addon {
  type: string;
  title: string;
  description: string;
  price: string;
  yearly?: YearlyPlan;
}

type monthlyPlan = {
  price: string;
};

type YearlyPlan = {
  price: string;
  extras?: string;
};

export type Plan = Partial<
  Pick<Addon, 'type' | 'yearly'> & YearlyPlan & monthlyPlan
>;
