import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import about1 from "../image/about1.jpg";
import about2 from "../image/about2.jpg";
import about3 from "../image/about3.jpg";

const values = [
  {
    number: "01",
    title: "Craft",
    text: "Every detail is considered with care, from refined materials to precise silhouettes and impeccable finishing.",
  },
  {
    number: "02",
    title: "Vision",
    text: "We create modern designs that balance sophistication, individuality, and effortless contemporary style.",
  },
  {
    number: "03",
    title: "Character",
    text: "Our collections are designed for people who value confidence, expression, and timeless elegance.",
  },
];

const journey = [
  {
    number: "01",
    title: "The Inspiration",
    text: "Our creative process begins with a fascination for refined silhouettes, luxurious textures, architecture, art, and modern culture.",
  },
  {
    number: "02",
    title: "The Creation",
    text: "Ideas become tangible through thoughtful design, carefully selected fabrics, precise construction, and an obsessive eye for detail.",
  },
  {
    number: "03",
    title: "The Expression",
    text: "The final piece is more than clothing. It becomes a personal expression of confidence, individuality, and modern luxury.",
  },
];

const About = () => {
  return (
    <div className="bg-[#FAF7F2] text-[#171717] overflow-hidden">

      {/* =================================================
          HERO
      ================================================= */}

      {/* =================================================
    HERO — SPLIT LUXURY LAYOUT
================================================= */}

<section className="min-h-[600px] lg:min-h-[650px] bg-[#F5F1EB]">

  <div className="max-w-7xl mx-auto min-h-[600px] lg:min-h-[650px] grid lg:grid-cols-2">

    {/* LEFT — CONTENT */}

    <div className="flex items-center px-8 sm:px-12 lg:px-16 py-16 lg:py-20">

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl"
      >

        <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-amber-700">
          The Art Behind The Brand
        </span>


        <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-serif leading-[0.95] text-[#171717]">

          Designed

          <br />

          <span className="italic">
            With Intention
          </span>

        </h1>


        <p className="mt-6 max-w-md text-sm text-gray-600 leading-7 font-light">

          A modern expression of luxury where exceptional design,
          refined materials, and effortless elegance come together.

        </p>


        {/* Small decorative line */}

        <div className="mt-8 flex items-center gap-4">

          <div className="w-12 h-px bg-amber-700" />

          <span className="text-[9px] tracking-[0.25em] uppercase text-gray-400">
            Contemporary Luxury
          </span>

        </div>

      </motion.div>

    </div>


    {/* RIGHT — IMAGE */}

    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
      className="relative min-h-[420px] lg:min-h-full overflow-hidden"
    >

      <img
        src={about1}
        alt="Luxury fashion collection"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* subtle overlay */}

      <div className="absolute inset-0 bg-black/5" />


      {/* Image label */}

      <div className="absolute bottom-6 left-6">

        <span className="text-[9px] tracking-[0.3em] uppercase text-white/80">
          The Collection
        </span>

      </div>

    </motion.div>

  </div>

</section>


      {/* =================================================
          PHILOSOPHY
      ================================================= */}

      <section className="py-16 lg:py-20">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Image */}

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >

              <img
                src={about2}
                alt="Luxury fabrics and fashion studio"
                className="w-full h-[330px] sm:h-[380px] lg:h-[420px] object-cover object-center"
              />

              <div className="absolute -bottom-4 -right-4 w-20 h-20 border border-amber-700/30 hidden sm:block" />

            </motion.div>


            {/* Text */}

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >

              <span className="text-[9px] tracking-[0.3em] uppercase text-amber-700">
                Our Philosophy
              </span>

              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight">

                The Art Behind

                <br />

                <span className="italic text-amber-700">
                  Every Detail
                </span>

              </h2>

              <div className="mt-6 space-y-4 text-xs sm:text-sm text-gray-600 leading-7 font-light">

                <p>
                  True luxury is not simply about what you see.
                  It is about the thought, precision, and intention
                  behind every detail.
                </p>

                <p>
                  From the first sketch to the final finish,
                  every element is carefully considered to create
                  pieces that feel sophisticated and effortless.
                </p>

                <p>
                  We believe exceptional fashion should feel relevant
                  today while remaining beautiful long after the moment
                  has passed.
                </p>

              </div>

            </motion.div>

          </div>

        </div>

      </section>


      {/* =================================================
          VALUES
      ================================================= */}

      <section className="py-16 lg:py-20 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          {/* Heading */}

          <div className="text-center mb-10">

            <span className="text-[9px] tracking-[0.3em] uppercase text-amber-700">
              What Guides Us
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-serif">

              Craft. Vision.{" "}

              <span className="italic text-amber-700">
                Character.
              </span>

            </h2>

          </div>


          {/* Cards */}

          <div className="grid md:grid-cols-3 gap-4">

            {values.map((item, index) => (

              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                className="
                  group
                  min-h-[230px]
                  border
                  border-[#e8dfd3]
                  p-6
                  flex
                  flex-col
                  justify-between
                  hover:bg-[#FAF7F2]
                  transition-colors
                  duration-500
                "
              >

                <span className="text-[11px] text-amber-700">
                  {item.number}
                </span>

                <div>

                  <h3 className="text-2xl font-serif">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs text-gray-500 leading-6 font-light">
                    {item.text}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          CREATIVE PROCESS
      ================================================= */}

      <section className="py-16 lg:py-20">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">

            {/* Left */}

            <div>

              <span className="text-[9px] tracking-[0.3em] uppercase text-amber-700">
                Our Journey
              </span>

              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight">

                From Idea

                <br />

                <span className="italic">
                  To Expression
                </span>

              </h2>

              <p className="mt-5 text-xs text-gray-500 leading-6 font-light max-w-sm">

                Every collection begins with an idea and evolves
                through creativity, precision, and an uncompromising
                attention to detail.

              </p>

            </div>


            {/* Timeline */}

            <div className="space-y-8">

              {journey.map((item, index) => (

                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                  }}
                  className="
                    grid
                    grid-cols-[45px_1fr]
                    gap-4
                    border-b
                    border-[#ddd4c8]
                    pb-7
                  "
                >

                  <span className="text-xs text-amber-700">
                    {item.number}
                  </span>

                  <div>

                    <h3 className="text-xl font-serif">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs text-gray-500 leading-6 font-light">
                      {item.text}
                    </p>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          DESIGNER
      ================================================= */}

     <section className="py-12 lg:py-16 bg-gradient-to-br from-[#fffaf3] via-[#f7eee2] to-[#eadbc9] text-[#2d2925]">
  <div className="max-w-6xl mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden rounded-2xl"
      >
        <img
          src={about3}
          alt="Fashion designer creating a collection"
          className="w-full h-[280px] sm:h-[330px] lg:h-[360px] object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#a47745]">
          The Creative Process
        </span>

        <h2 className="mt-3 text-3xl lg:text-4xl font-serif leading-tight">
          Ideas Become{" "}
          <span className="italic text-[#a47745]">Design</span>
        </h2>

        <p className="mt-5 text-xs sm:text-sm text-[#665d54] leading-6 max-w-md">
          Great design begins with curiosity, experimentation, textures,
          proportions, and a clear creative vision.
        </p>

        <p className="mt-3 text-xs sm:text-sm text-[#665d54] leading-6 max-w-md">
          We transform these ideas into refined collections that feel
          modern, confident, and timeless.
        </p>

        <div className="mt-5 w-10 h-px bg-[#a47745]" />
      </motion.div>

    </div>
  </div>
</section>

    </div>
  );
};

export default About;