"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { apiContext } from "@/context/apiContext";

export default function LaptopDevice() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { data, page, setPage,fetchData, setData, category } =
    useContext(apiContext);
  const observerRef = useRef(null);
  const params = useParams();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting ) {
        fetchData();
      }
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [ fetchData]);

  useEffect(() => {
  setData([]);
}, [category, params?.device]);

  console.log("in laptop device", data);

  return (
    <>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 backdrop-blur-sm z-50 flex flex-col justify-center items-center bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center"
            >
              <Image
                width={400}
                height={1000}
                src={selectedImage}
                alt="Selected"
                className="rounded-xl h-[14rem] w-[22rem]  shadow-2xl"
              />

              <a
                href={selectedImage}
                download
                className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-colors"
              >
                Download
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {data.length > 0 ? (
        <div className="w-full h-full  flex justify-center">
          <div className=" w-auto  flex justify-center  mt-4 gap-[0.3rem] sm:gap-[0.8rem] flex-wrap">
            {data.map((image) => {
              return (
                <div className="h-[10rem] w-[23rem] md:h-[13rem] md:w-[23rem] min-w-[2rem] z-10" key={image.id}>
                  <Image
                    className="rounded-xl h-full w-full"
                    src={image.urls.small}
                    width={400}
                    height={1000}
                    alt="not found"
                    loading="lazy"
                    onClick={() => setSelectedImage(image.urls.small)}
                  />
                </div>
              );
            })}
            <div ref={observerRef} className="h-1" />
          </div>
        </div>
      ) : (
        <div className="w-10/12  mx-auto mt-4 flex gap-2 flex-wrap">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="laptop bg-gray-300 animate-pulse rounded-xl"
            />
          ))}
        </div>
      )}
    </>
  );
}
