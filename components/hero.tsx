"use client";

import React from "react";
import { HomePageProps } from "@/types/home";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Phone } from "lucide-react";

export default function Hero({ hero }: HomePageProps) {
  return (
    <section className="bg-muted/40 py-16 px-6 md:py-24 md:px-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-8">
          <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full font-semibold text-sm">
            {hero.badge}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-4">
            {hero.title}{" "}
            <span className="text-accent">{hero.titleAccent}</span>
          </h1>

          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            {hero.description}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          {/* CTA PRINCIPAL — LLAMAR AHORA */}
          <Link href={hero.ctaPrimaryLink}>
            <Button size="lg" className="text-lg px-8">
              {hero.ctaPrimary}
            </Button>
          </Link>

          {/* CTA SECUNDARIO — EMAIL */}
          <Link href={hero.ctaSecondaryLink} className="flex items-center">
            <div className="flex items-center border border-accent text-accent px-6 py-3 rounded-xl text-lg hover:bg-accent hover:text-white transition-all">
              <Phone className="mr-2 h-5 w-5" />
              {hero.ctaSecondary}
            </div>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 md:gap-12">
          {hero.stats.map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-bold text-accent">{item.value}</p>
              <p className="text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fondo decorativo */}
      <div className="absolute right-0 top-0 h-full hidden md:block">
        <svg width="420" height="100%" viewBox="0 0 400 800" fill="none">
          <rect x="50" width="300" height="800" fill="#d7e1da" rx="60" />
          <rect x="100" width="300" height="800" fill="#c3cfc6" rx="60" />
        </svg>
      </div>
    </section>
  );
}
