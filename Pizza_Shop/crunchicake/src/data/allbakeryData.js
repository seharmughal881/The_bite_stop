const allbakeryData = [
  {
    id: 1,
    title: "Classic Chocolate Cake",
    category: "Cakes",

    description:
      "Rich and moist chocolate cake with layers of creamy chocolate frosting",
    price: 32.99,
    originalPrice: 39.99,
    discount: "18% OFF",

    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Ferrero-Classic-pgtfyrzbln55w2y8b11utotx6i73raxrnm9fhhngjs.jpg",

    features: [
      "Triple chocolate layers",
      "Creamy chocolate frosting",
      "Chocolate shavings topping",
      "Serves 8-10 people",
    ],
    specs: {
      flavor: "Chocolate",
      occasions: ["Birthday", "Anniversary", "Just Because"],
      weight: "2.5 lbs",
    },
  },

  {
    id: 2,
    title: "Red Velvet Dream Cake",
    category: "Cakes",
    description:
      "A stunning crimson cake with a subtle cocoa flavor and luxurious cream cheese frosting.",
    price: 36.99,
    originalPrice: 44.99,
    discount: "18% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Belgian-Chocolate-pgtfyq3n7z2l8v0ym08lopazzqgdbwqazcygixq8w8.jpg",
    features: [
      "Signature crimson red layers",
      "Velvety cream cheese frosting",
      "Decadent white chocolate curls",
      "Serves 10-12 people",
    ],
    specs: {
      flavor: "Red Velvet",
      occasions: ["Valentine's Day", "Anniversary", "Dinner Party"],
      weight: "3 lbs",
    },
  },
  {
    id: 3,
    title: "Vanilla Bean Bliss Cake",
    category: "Cakes",
    description:
      "A light and fluffy vanilla cake made with real vanilla beans, frosted with smooth vanilla buttercream.",
    price: 29.99,
    originalPrice: 35.99,
    discount: "17% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Red-Velvet-pgtfyyk6xhe65coo8lw8t565c7ao96nw0ittufdpc8.jpg",
    features: [
      "Madagascar vanilla bean infused",
      "Fluffy vanilla buttercream",
      "Edible flower decoration",
      "Serves 8-10 people",
    ],
    specs: {
      flavor: "Vanilla",
      occasions: ["Birthday", "Baby Shower", "Wedding"],
      weight: "2.5 lbs",
    },
  },
  {
    id: 4,
    title: "Luscious Lemon Drizzle Cake",
    category: "Cakes",
    description:
      "A tangy and sweet lemon cake soaked in a citrus glaze, topped with a zesty lemon frosting.",
    price: 31.99,
    originalPrice: 38.5,
    discount: "17% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/kit-kat-sqaure-ptftrki8vwjxpcqs2zp0so87l3q6gov3wx9scu8b60.jpg",
    features: [
      "Zesty lemon curd filling",
      "Tangy lemon glaze",
      "Toasted meringue peaks",
      "Serves 8-10 people",
    ],
    specs: {
      flavor: "Lemon",
      occasions: ["Spring Celebration", "Summer Party", "Just Because"],
      weight: "2.5 lbs",
    },
  },
  {
    id: 5,
    title: "Salted Caramel Delight Cake",
    category: "Cakes",
    description:
      "Indulgent caramel cake layers with a sweet and salty caramel frosting and a rich caramel drip.",
    price: 38.5,
    originalPrice: 46.0,
    discount: "16% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/rafaelo-q0b9wbsor4rh60mbm77w8z0fdtxwv8vtqpcq67vqtk.jpg",
    features: [
      "Sweet & salty caramel buttercream",
      "Gooey caramel drip finish",
      "Garnished with toffee pieces",
      "Serves 10-12 people",
    ],
    specs: {
      flavor: "Salted Caramel",
      occasions: ["Thanksgiving", "Friendsgiving", "Holiday Party"],
      weight: "3 lbs",
    },
  },
  {
    id: 6,
    title: "Decadent Dark Chocolate Ganache Cake",
    category: "Cakes",
    description:
      "An intensely rich dark chocolate cake enveloped in a smooth, glossy dark chocolate ganache.",
    price: 40.99,
    originalPrice: 48.99,
    discount: "16% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Coffee-pgtfyr1het3vkgzlgin8972gl4bqjlu1bhly07ouq0.jpg",
    features: [
      "70% dark chocolate ganache",
      "Moist chocolate sponge",
      "Gold leaf accent (optional)",
      "Serves 12-14 people",
    ],
    specs: {
      flavor: "Dark Chocolate",
      occasions: ["Anniversary", "Formal Event", "Christmas"],
      weight: "3.5 lbs",
    },
  },
  {
    id: 7,
    title: "Strawberry Shortcake Supreme",
    category: "Cakes",
    description:
      "Light vanilla sponge cake layered with fresh, sweetened strawberries and fluffy whipped cream.",
    price: 34.99,
    originalPrice: 41.99,
    discount: "17% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Honey-Cake-pgtfyzi14bfggynb34avdmxlxl61gvrmcnhbbpcb60.jpg",
    features: [
      "Layers of fresh strawberries",
      "Homemade whipped cream frosting",
      "White chocolate shavings",
      "Serves 8-10 people",
    ],
    specs: {
      flavor: "Strawberry & Cream",
      occasions: ["Mother's Day", "Summer Birthday", "Picnic"],
      weight: "2.75 lbs",
    },
  },
  {
    id: 8,
    title: "Cookies & Cream Cheesecake",
    category: "Cakes",
    description:
      "A creamy cheesecake filling on a chocolate cookie crust, loaded with chunks of chocolate cookies.",
    price: 41.99,
    originalPrice: 49.99,
    discount: "16% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Salted-Caramel-pgtfywoijtbli4rejl2zo5n85fjxtsgfc9iuvvghoo.jpg",
    features: [
      "Creamy cheesecake base",
      "Chocolate cookie crust",
      "Generous cookie chunks throughout",
      "Serves 12-14 people",
    ],
    specs: {
      flavor: "Cookies & Cream",
      occasions: ["Potluck", "Graduation", "Family Gathering"],
      weight: "4 lbs",
    },
  },
  {
    id: 9,
    title: "Classic Chocolate Cupcakes",
    category: "Cupcakes",
    description:
      "Rich and moist chocolate cupcakes with creamy chocolate frosting",
    price: 18.99,
    originalPrice: 22.99,
    discount: "17% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Ferrero-Rocher-cupcake-pgtfyq3n7z2l8v0ym08lopazzqgdbwqazcygixq8w8.jpg",
    features: [
      "Decadent chocolate sponge",
      "Creamy chocolate buttercream",
      "Chocolate sprinkles topping",
      "Set of 6 cupcakes",
    ],
    specs: {
      flavor: "Chocolate",
      occasions: ["Birthday", "Afternoon Tea", "Just Because"],
      weight: "1.2 lbs",
    },
  },
  {
    id: 10,
    title: "Red Velvet Cupcakes",
    category: "Cupcakes",
    description:
      "A stunning crimson cupcake with a subtle cocoa flavor and luxurious cream cheese frosting",
    price: 21.99,
    originalPrice: 26.5,
    discount: "17% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Red-Velvet-Cupcake-pgtfysx5sh6g7owv5jghe6ldrw2gz01hzqwwyrm2dk.jpg",
    features: [
      "Signature crimson red base",
      "Velvety cream cheese frosting",
      "Decadent red velvet crumbs",
      "Set of 6 cupcakes",
    ],
    specs: {
      flavor: "Red Velvet",
      occasions: ["Valentine's Day", "Anniversary", "Dinner Party"],
      weight: "1.4 lbs",
    },
  },
  {
    id: 11,
    title: "Vanilla Bean Cupcakes",
    category: "Cupcakes",
    description:
      "Light and fluffy vanilla cupcakes made with real vanilla beans, frosted with smooth vanilla buttercream",
    price: 17.99,
    originalPrice: 21.99,
    discount: "18% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Salted-Caramel-Cupcake-pgtfyusu6590uwu4uk9qj64aynt7ee8yo07vxbja14.jpg",
    features: [
      "Madagascar vanilla bean infused",
      "Fluffy vanilla buttercream",
      "Colorful sprinkles decoration",
      "Set of 6 cupcakes",
    ],
    specs: {
      flavor: "Vanilla",
      occasions: ["Birthday", "Baby Shower", "Wedding"],
      weight: "1.2 lbs",
    },
  },
  {
    id: 12,
    title: "Luscious Lemon Cupcakes",
    category: "Cupcakes",
    description:
      "Tangy and sweet lemon cupcakes with a citrus glaze and zesty lemon frosting",
    price: 19.5,
    originalPrice: 23.5,
    discount: "17% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Keylime-q9yl4q09ng69z5fy0hl5go1ze7iwrtrqc0d1uztea0.jpg",
    features: [
      "Zesty lemon curd center",
      "Tangy lemon glaze",
      "Candied lemon slice topping",
      "Set of 6 cupcakes",
    ],
    specs: {
      flavor: "Lemon",
      occasions: ["Spring Celebration", "Summer Party", "Just Because"],
      weight: "1.3 lbs",
    },
  },
  {
    id: 13,
    title: "Salted Caramel Cupcakes",
    category: "Cupcakes",
    description:
      "Indulgent caramel cupcakes with a sweet and salty caramel frosting and rich caramel drizzle",
    price: 22.99,
    originalPrice: 27.99,
    discount: "18% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Oreo-Cookie-q9yl4upglmcpl79491mab4vad4vqubae0nmh9dmfew.jpg",
    features: [
      "Sweet & salty caramel buttercream",
      "Gooey caramel drizzle",
      "Garnished with toffee pieces",
      "Set of 6 cupcakes",
    ],
    specs: {
      flavor: "Salted Caramel",
      occasions: ["Thanksgiving", "Friendsgiving", "Holiday Party"],
      weight: "1.5 lbs",
    },
  },
  {
    id: 14,
    title: "Decadent Dark Chocolate Cupcakes",
    category: "Cupcakes",
    description:
      "Intensely rich dark chocolate cupcakes with a smooth, glossy dark chocolate ganache topping",
    price: 24.5,
    originalPrice: 29.5,
    discount: "17% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Lotus-biscoff-5-pgx8fpx2wylarcml66bqrfbsvcxeqtza4fdjhn6kjs.jpg",
    features: [
      "70% dark chocolate ganache",
      "Moist chocolate sponge",
      "Gold dust accent (optional)",
      "Set of 6 cupcakes",
    ],
    specs: {
      flavor: "Dark Chocolate",
      occasions: ["Anniversary", "Formal Event", "Christmas"],
      weight: "1.4 lbs",
    },
  },
  {
    id: 15,
    title: "Strawberry Shortcake Cupcakes",
    category: "Cupcakes",
    description:
      "Light vanilla cupcakes filled with fresh strawberries and topped with fluffy whipped cream",
    price: 20.99,
    originalPrice: 24.99,
    discount: "16% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/strawberry-cupcake-qbqwmw4n5v83jz1suikxjivjp5pr43xdon7zzbtrpk.jpg",
    features: [
      "Fresh strawberry filling",
      "Homemade whipped cream frosting",
      "White chocolate shavings",
      "Set of 6 cupcakes",
    ],
    specs: {
      flavor: "Strawberry & Cream",
      occasions: ["Mother's Day", "Summer Birthday", "Picnic"],
      weight: "1.3 lbs",
    },
  },
  {
    id: 16,
    title: "Cookies & Cream Cupcakes",
    category: "Cupcakes",
    description:
      "Chocolate cupcakes with a creamy filling, topped with cookies & cream frosting and cookie pieces",
    price: 23.99,
    originalPrice: 28.99,
    discount: "17% OFF",
    imageUrl:
      "https://layers.pk/wp-content/uploads/elementor/thumbs/Lite-Coffee-4-pgx8fjc7l4cai2w58lhcryzkpntu8y95rit54pgbrc.jpg",
    features: [
      "Creamy center filling",
      "Cookies & cream buttercream",
      "Chocolate cookie piece on top",
      "Set of 6 cupcakes",
    ],
    specs: {
      flavor: "Cookies & Cream",
      occasions: ["Potluck", "Graduation", "Family Gathering"],
      weight: "1.5 lbs",
    },
  },
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

export default allbakeryData;
