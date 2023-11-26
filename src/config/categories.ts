export type ExpenseCategory = {
  name: string;
  emoji?: string;
  parent?: string;
  children?: string[];
};

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  {
    name: "Food",
    emoji: "🍕",
    children: [
      "Groceries",
      "Bar, café",
      "Restaurants, fast food",
      "Delivery",
      "Other",
    ],
  },
  {
    name: "Shopping",
    emoji: "🛍️",
    children: [
      "Clothing",
      "Electronics",
      "Accessories",
      "Tools",
      "Sports, hobbies",
      "Other",
    ],
  },
  {
    name: "Leisure",
    emoji: "🎱",
    children: [
      "Books",
      "Drinks",
      "Events",
      "Hobbies",
      "Movies, Shows",
      "Music",
      "Videogames",
      "Other",
    ],
  },
  {
    name: "Health",
    emoji: "🏥",
    children: [
      "Self care",
      "Fitness",
      "Doctors",
      "Medicines",
      "Supplements",
      "Other",
    ],
  },
  {
    name: "Transportation",
    emoji: "🚌",
    children: [
      "Fuel",
      "Maintenance",
      "Parking",
      "Tolls",
      "Public transport",
      "Fees, Taxes",
      "Other",
    ],
  },
  {
    name: "Housing",
    emoji: "🏡",
    children: [
      "Electricity",
      "Gas",
      "Water",
      "Internet",
      "Maintenance",
      "Mortgage",
      "Rent",
      "Taxes",
      "Other",
    ],
  },
  {
    name: "Travel",
    emoji: "✈️",
    children: [
      "Agencies",
      "Hotels",
      "Transportation",
      "Food & Drinks",
      "Leisure",
      "Attractions",
      "Other",
    ],
  },
  {
    name: "Subscriptions",
    emoji: "🔁",
    children: [
      "Books, E-Books",
      "E-learning",
      "Movies, TV Shows",
      "Music, Podcasts",
      "Phone",
      "Gaming",
      "Cloud storage",
      "Software",
      "Other",
    ],
  },
  {
    name: "Fees",
    emoji: "💸",
    children: ["Bank", "Brokers", "Taxes", "Other"],
  },
  {
    name: "Other",
    children: ["Charity", "Gifts", "Other"],
  },
];
