export interface iIngData {
  ingName: string;
  ingImage: string;
  nowIngCount: number;
  targetIngCount: number;
  diffIngCount: number;
}

export interface iDishData {
  name: string;
  ingredients: {
    [key: string]: number;
  };
  BonusAtLv1: number;
}

export interface ImageInputProps {
  result: iIngData[];
  setResult: (result: iIngData[]) => void;
}

export interface GridProps {
  result: iIngData[];
  isMaximumMode: boolean;
  setIsMaximumMode: (isMaximumMode: boolean) => void;
}

export interface DishOrderInputProps {
  result: iIngData[];
  setResult: (result: iIngData[]) => void;
  isMaximumMode: boolean;
}

export interface DishSelectProps {
  dish: iDishOrder;
  index: number;
  category: 'Curry' | 'Salad' | 'Dessert';
  updateDishOrder: (category: 'Curry' | 'Salad' | 'Dessert', action: 'add' | 'delete') => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    category: 'Curry' | 'Salad' | 'Dessert',
    index: number
  ) => void;
  handleSelectChange: (
    event: React.SyntheticEvent,
    value: string,
    category: 'Curry' | 'Salad' | 'Dessert',
    index: number
  ) => void;
  handleCountChange: (
    category: 'Curry' | 'Salad' | 'Dessert',
    index: number,
    value: number
  ) => void;
  result: iIngData[];
}

export interface DishOrderDisplayProps {
  updateDishOrder: (category: 'Curry' | 'Salad' | 'Dessert', action: 'add' | 'delete') => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    category: 'Curry' | 'Salad' | 'Dessert',
    index: number
  ) => void;
  handleSelectChange: (
    event: React.SyntheticEvent,
    value: string,
    category: 'Curry' | 'Salad' | 'Dessert',
    index: number
  ) => void;
  handleCountChange: (
    category: 'Curry' | 'Salad' | 'Dessert',
    index: number,
    value: number
  ) => void;
  dishOrderCurry: iDishOrder[];
  dishOrderSalad: iDishOrder[];
  dishOrderDessert: iDishOrder[];
  result: iIngData[];
}

export interface iDishOrder {
  name: string;
  count: number;
}