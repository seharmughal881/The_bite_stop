"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ImageSlider from "../components/ImageSlider";
import Pizzas from "../components/Pizzas";
import CustomPizzaBuilder from "../components/CustomPizzaBuilder";
import Shawarmas from "../components/Shawarmas";
import Burgers from "../components/Burgers";
import AllFastFoodProducts from "../components/AllFastFoodProducts";
import WhatsAppButton from "@/components/WhatsAppButton";

function ProductList() {
  const [isDesktop, setIsDesktop] = useState(false);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <br />
      <ImageSlider />
      <Pizzas />
      <Shawarmas />
      <Burgers />
      <AllFastFoodProducts />
      <CustomPizzaBuilder />
      <WhatsAppButton />
    </>
  );
}

export default ProductList;
