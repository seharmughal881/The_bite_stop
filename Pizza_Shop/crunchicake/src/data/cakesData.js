const cakesData = [
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
];

export default cakesData;
