"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { CastleIcon } from "lucide-react";
import { BlogList } from "./BlogList";
import FadeIn from "./FadeIn";

export default function ExpandableCardsGrid({ data }: { data: Section[] }) {
  const cards = data.map((section) => ({
    title: section.title,
    description: section.description,
    src: section.coverImage,
    blogs: section.blogs,
    sectionslug: section.sectionslug,
  }));

  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
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
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const activeCardId =
  active && typeof active === "object"
    ? `card-${active.sectionslug}-${id}`
    : null;

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/40"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 z-100 grid place-items-center py-4">
            <motion.button
              key={`button-${activeCardId}`}
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
              className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white lg:hidden"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${activeCardId}`}
              ref={ref}
              className="flex h-[95%] w-full max-w-[80%] flex-col overflow-hidden rounded-3xl bg-white sm:max-w-lg md:h-fit md:max-h-[90%] dark:bg-neutral-900"
            >
              <motion.div layoutId={`image-${activeCardId}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="h-60 w-full object-cover object-top sm:rounded-tl-lg sm:rounded-tr-lg lg:h-80"
                />
              </motion.div>

              <div>
                <div className="flex items-start justify-between p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${activeCardId}`}
                      className="text-base font-medium text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${activeCardId}`}
                      className="text-base text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                </div>
                <div className="relative px-4 pt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] md:h-fit md:text-sm lg:text-base dark:text-neutral-400"
                  >
                    {<BlogList blogs={active.blogs} />}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((card, index) => {
          const cardId = `card-${card.sectionslug}-${id}`
          return (
            <FadeIn key={card.sectionslug} delay={200} duration={600}>
              <motion.div
                layoutId={`card-${cardId}`}
                key={card.title}
                onClick={() => setActive(card)}
                className="flex w-full cursor-pointer flex-col rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                <div className="flex w-full flex-col gap-4">
                  <motion.div layoutId={`image-${cardId}`}>
                    <img
                      src={card.src}
                      alt={card.title}
                      className="aspect-16/10 w-full rounded-lg object-cover object-top md:aspect-5/3"
                    />
                  </motion.div>
                  <div className="flex flex-col items-start justify-center">
                    <motion.h3
                      layoutId={`title-${cardId}`}
                      className="text-left text-base font-medium text-neutral-800 dark:text-neutral-200"
                    >
                      {card.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${cardId}`}
                      className="text-center text-base text-neutral-600 md:text-left dark:text-neutral-400"
                    >
                      {card.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          );
        })}
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
