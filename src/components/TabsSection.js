"use client";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiContext } from "@/context/apiContext";

export default function TabsSection() {
  const { category, setCategory, fetchData, setData } =
    useContext(apiContext);
  const [active, setActive] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setData([])
    fetchData();
  }, [category]);

  const tabs = [
    { id: 0, title: "bike" },
    { id: 1, title: "food" },
    { id: 2, title: "birds" },
    { id: 3, title: "nature" },
    { id: 4, title: "laptop" },
  ];

  const handleTabClick = (tab) => {
    setCategory(tab.title);
    setActive(tab.id);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setCategory(inputValue);
      setActive(null);
      setInputValue("");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-4 px-4">
      <motion.div
        className="flex justify-center border-b border-gray-700"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`${
              active === tab.id
                ? "text-pink-500"
                : "text-gray-400 hover:text-pink-500"
            } relative px-4 py-3 text-md font-medium transition-colors duration-300 focus-visible:outline-none`}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {active === tab.id && (
              <motion.span
                layoutId="active_tab_indicator"
                className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 to-orange-400"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            {tab.title}
          </motion.button>
        ))}
      </motion.div>
      <motion.form
        onSubmit={handleInputSubmit}
        className="flex justify-center mt-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a category"
          className="px-4 py-2 text-gray-800 bg-gray-200 rounded-l-md focus:outline-none"
          variants={itemVariants}
          whileFocus={{ scale: 1.05 }}
        />
        <motion.button
          type="submit"
          className="px-4 py-2 text-white bg-[pink] rounded-r-md cursor-pointer hover:bg-[#e0388c85] focus:outline-none"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </motion.form>
    </div>
  );
}
