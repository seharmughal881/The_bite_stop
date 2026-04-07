const dessertsData = [
  {
    id: 17,
    title: "Classic Tiramisu",
    category: "Desserts",
    description:
      "Layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa powder",
    price: 15.99,
    originalPrice: 19.99,
    discount: "20% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Strawberry-Cheesecake-1-qbqwx8cqc9dn9k14gzh6ywy2xqr3s8z33tka0whv9k.jpg",
    features: [
      "Espresso-infused ladyfingers",
      "Creamy mascarpone filling",
      "Dusted with premium cocoa",
      "Serves 2-3 people",
    ],
    specs: {
      flavor: "Coffee & Chocolate",
      occasions: ["Dinner Party", "Date Night", "Special Treat"],
      weight: "1.8 lbs",
    },
  },
  {
    id: 18,
    title: "New York Cheesecake Slice",
    category: "Desserts",
    description:
      "Creamy, dense cheesecake with a graham cracker crust and berry compote topping",
    price: 12.99,
    originalPrice: 15.99,
    discount: "19% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Mini-Chocolate-Tarts-Feature-1-r96m4csn4h3jj42qmgkb0kv6ihcpsbh9usnp4g6d8o.jpg",
    features: [
      "Creamy cheese filling",
      "Buttery graham cracker crust",
      "Mixed berry compote topping",
      "Generous single serving",
    ],
    specs: {
      flavor: "Cheesecake",
      occasions: ["Afternoon Tea", "Dessert Night", "Just Because"],
      weight: "1.2 lbs",
    },
  },
  {
    id: 19,
    title: "Chocolate Lava Cake",
    category: "Desserts",
    description:
      "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream",
    price: 14.5,
    originalPrice: 17.99,
    discount: "19% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Apple-pie-1-pgx8f1h9z9nudhm34vrfylhtfc9v6pa9d2ex0g6t1k.jpg",
    features: [
      "Warm molten chocolate center",
      "Served with vanilla bean ice cream",
      "Dusted with powdered sugar",
      "Fresh berries garnish",
    ],
    specs: {
      flavor: "Chocolate",
      occasions: ["Date Night", "Anniversary", "Special Occasion"],
      weight: "1.1 lbs",
    },
  },
  {
    id: 20,
    title: "Fruit Tart",
    category: "Desserts",
    description:
      "Buttery shortcrust pastry filled with vanilla custard and topped with fresh seasonal fruits",
    price: 13.99,
    originalPrice: 16.99,
    discount: "18% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Creme-brulee-pgtfyr1het3vkgzlgin8972gl4bqjlu1bhly07ouq0.jpg",
    features: [
      "Buttery shortcrust pastry",
      "Silky vanilla custard filling",
      "Assorted fresh seasonal fruits",
      "Glazed with apricot jelly",
    ],
    specs: {
      flavor: "Vanilla & Fruit",
      occasions: ["Spring Celebration", "Summer Party", "Brunch"],
      weight: "1.5 lbs",
    },
  },
  {
    id: 21,
    title: "Crème Brûlée",
    category: "Desserts",
    description:
      "Rich vanilla custard topped with a layer of hardened caramelized sugar",
    price: 11.99,
    originalPrice: 14.5,
    discount: "17% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Pistachio-Kunafa-r96ls7pouih7kfpmipmsb55uab71d2a36pawys6fm0.jpg",
    features: [
      "Silky vanilla bean custard",
      "Crispy caramelized sugar top",
      "Served with fresh berries",
      "Classic French dessert",
    ],
    specs: {
      flavor: "Vanilla",
      occasions: ["Fine Dining", "Anniversary", "Gourmet Experience"],
      weight: "0.9 lbs",
    },
  },
  {
    id: 22,
    title: "Chocolate Mousse",
    category: "Desserts",
    description:
      "Light and airy chocolate mousse topped with whipped cream and chocolate shavings",
    price: 10.99,
    originalPrice: 13.25,
    discount: "17% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Lotus-cheesecake-9-pgvscytfuo72hzt6esxcnigzv1cgflcad9fv3uwars.jpg",
    features: [
      "Light and airy texture",
      "70% dark chocolate base",
      "Fresh whipped cream topping",
      "Chocolate shavings garnish",
    ],
    specs: {
      flavor: "Chocolate",
      occasions: ["Dinner Party", "Potluck", "Just Because"],
      weight: "1.0 lbs",
    },
  },
  {
    id: 23,
    title: "Apple Pie Slice",
    category: "Desserts",
    description:
      "Warm slice of classic apple pie with cinnamon-spiced filling and flaky crust",
    price: 9.99,
    originalPrice: 11.99,
    discount: "17% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Walnut-Cup-Pie-pgtfyq3n7z2l8v0ym08lopazzqgdbwqazcygixq8w8.jpg",
    features: [
      "Cinnamon-spiced apple filling",
      "Flaky buttery crust",
      "Served warm with vanilla ice cream",
      "Classic American dessert",
    ],
    specs: {
      flavor: "Apple & Cinnamon",
      occasions: ["Thanksgiving", "Holiday Party", "Comfort Food"],
      weight: "1.3 lbs",
    },
  },
  {
    id: 24,
    title: "Berry Parfait",
    category: "Desserts",
    description:
      "Layers of Greek yogurt, granola, and mixed fresh berries in a elegant glass",
    price: 8.99,
    originalPrice: 10.99,
    discount: "18% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Mango-cheese-cake-pqn84n803bmuzpemfhfdgu99cyun4okk55uh2qd11k.jpg",
    features: [
      "Layered Greek yogurt and granola",
      "Mixed fresh berries",
      "Drizzled with honey",
      "Served in elegant glass",
    ],
    specs: {
      flavor: "Berry & Yogurt",
      occasions: ["Breakfast", "Brunch", "Healthy Treat"],
      weight: "0.8 lbs",
    },
  },
];

export default dessertsData;
