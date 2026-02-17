"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { apiContext } from "@/context/apiContext";
import { useParams } from "next/navigation";

export default function MobileDevice() {
  const [selectedImage, setSelectedImage] = useState(null);
  const observerRef = useRef(null);
  const { data, fetchData, setPage, category, setData } =
    useContext(apiContext);
  const params = useParams();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchData();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [fetchData]);

  useEffect(() => {
    setData([]);
  }, [category, params?.device]);

  console.log("in mobile device", data);
  return (
    <>
      {selectedImage && (
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
                    alt="not found"
                    className="rounded-xl w-[19rem] h-[34rem] md:h-[31rem] md:w-[17rem]  shadow-2xl"
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
        </>
      )}
      {data.length > 0 ? (
        <div className=" w-11/12 mx-auto flex mt-4 justify-center gap-[0.8rem]  flex-wrap">
          {data.map((item) => {
            return (
              <div
                className="h-[20rem] w-[11rem] md:h-[25rem] md:w-[13.5rem] lg:h-[25rem] lg:w-[13.5rem] z-10"
                key={item.id}
              >
                <Image
                  className="rounded-xl h-full w-full"
                  src={item.urls.small}
                  width={400}
                  height={1000}
                  alt={item.alt}
                  loading="lazy"
                  onClick={() => setSelectedImage(item.urls.small)}
                />
                <div ref={observerRef} className="h-10"></div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-10/12  mx-auto mt-4 flex gap-2 flex-wrap">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="mobile bg-gray-300 animate-pulse rounded-xl"
            />
          ))}
        </div>
      )}
    </>
  );
}
