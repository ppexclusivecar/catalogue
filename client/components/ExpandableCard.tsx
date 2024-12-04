"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { FaCar, FaCarSide, FaDoorClosed, FaEuroSign, FaGasPump, FaGears, FaPaintRoller, FaSitemap } from "react-icons/fa6";
import { FaHistory, FaTachometerAlt } from "react-icons/fa";
 
interface CatalogueItem {
  Num: number;
  Description: string;
  Nom: string;
  CtaLink: string;
  Brand: string;
  Model: string;
  Price: string;
  Kilometers: string;
  Color: string;
  Fuel: string;
  Gearbox: string;
  Engine: string;
  Doors: string;
  Year: string;
  Image: string;
}

export function ExpandableCard() {
  const [catalogueItems, setCatalogueItems] = useState<CatalogueItem[]>([]);

  useEffect(() => {
    fetch('https://ppexclusive-server.vercel.app/api/catalogue')
      .then((res) => res.json())
      .then((data: CatalogueItem[]) => {
        setCatalogueItems(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const [active, setActive] = useState<(typeof catalogueItems)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }
 
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
 
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);
 
  useOutsideClick(ref, () => setActive(null));
 
  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100] ">
            <motion.button
              key={`button-${active.Nom}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.Nom}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-auto"
            >
              <motion.div layoutId={`image-${active.Nom}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.Image}
                  alt={active.Nom}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top scrollbar-hide"
                />
              </motion.div>
 
              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.Nom}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.Nom}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.Description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.Year}
                    </motion.p>
                  </div>
 
                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.CtaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-yellow-500 text-white scrollbar-hide"
                  >
                    {'Plus'}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-auto pb-10 flex flex-col items-start gap-4 overflow-visible dark:text-neutral-400 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {active.Description} {/* Affiche simplement le contenu */}
                    <div className="flex justify-center w-full pb-10">
                      <div className="flex w-full">
                        <div className="flex-1 mr-5">
                          <p className="flex items-center"><FaCar className="mr-1"/> Marque: <span className="text-yellow-500 ml-1">{active.Brand}</span> </p>
                          <p className="flex items-center"><FaCarSide className="mr-1"/>Modèle: <span className="text-yellow-500 ml-1">{active.Model}</span> </p>
                          <p className="flex items-center"><FaEuroSign className="mr-1"/>Prix: <span className="text-yellow-500 ml-1">{active.Price}</span> </p>
                          <p className="flex items-center"><FaTachometerAlt className="mr-1"/>Kilométrage: <span className="text-yellow-500 ml-1">{active.Kilometers}</span> </p>
                          <p className="flex items-center"><FaPaintRoller className="mr-1"/>Couleur: <span className="text-yellow-500 ml-1">{active.Color}</span> </p>
                        </div>
                        <div className="flex-1">
                          <p className="flex items-center"><FaGasPump className="mr-1"/>Carburant: <span className="text-yellow-500 ml-1">{active.Fuel}</span> </p>
                          <p className="flex items-center"><FaSitemap className="mr-1"/>Boite: <span className="text-yellow-500 ml-1">{active.Gearbox}</span> </p>
                          <p className="flex items-center"><FaGears className="mr-1"/>Moteur: <span className="text-yellow-500 ml-1">{active.Engine}</span> </p>
                          <p className="flex items-center"><FaDoorClosed className="mr-1"/>Portes: <span className="text-yellow-500 ml-1">{active.Doors}</span> </p>
                          <p className="flex items-center"><FaHistory className="mr-1"/>Année: <span className="text-yellow-500 ml-1">{active.Year}</span> </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className=" relative max-w-7xl mx-auto w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-10 sm:px-10 px-5">
        {catalogueItems.map((item, index) => (
          <motion.div
            layoutId={`card-${item.Nom}-${id}`}
            key={item.Nom}
            onClick={() => setActive(item)}
            className="p-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
          <div className="flex gap-4 flex-col w-full">
            <motion.div layoutId={`image-${item.Nom}-${id}`} className="w-11/12 max-w-[375px]">
              <img
                width={375}  // Réduction de 25% de la taille par défaut
                height={225} // Réduction correspondante
                src={item.Image}
                alt={item.Nom}
                className="rounded-lg object-cover object-top"
              />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${item.Nom}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {item.Nom}
                </motion.h3>
                <motion.p
                  layoutId={`description-${item.Nom}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                >
                  {item.Year}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}
 
export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};


