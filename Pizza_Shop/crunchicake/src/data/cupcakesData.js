const cupcakesData = [
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
];

export default cupcakesData;
