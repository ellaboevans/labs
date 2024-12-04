export interface FormFields {
  name: string;
  email: string;
  phone: string;
  plan: Plan;
  addons: Addon;
}

type Plan = {
  type: string;
  price: string;
};

type Addon = {
  type: string;
  package: string;
  price: string;
};
