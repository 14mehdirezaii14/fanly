"use client"

import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatPrice, products } from "@/components/aeroflow/products"

export function HeroSection() {
  const featuredProduct = products[0]

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden rounded-[28px] bg-foreground p-5 text-background sm:p-8 lg:p-10"
    >
      <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.86fr)] lg:gap-12">
        <div className="flex flex-col items-start py-2 sm:py-4 lg:py-8">
          <div className="mb-6 flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-background/65 sm:text-[11px]">
            <span className="size-1.5 rounded-full bg-primary" />
            AeroFlow / Performance series
          </div>

          <h1
            id="hero-title"
            className="max-w-[660px] text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[4.5rem]"
          >
            Airflow, built for
            <br />
            <span className="text-primary">quiet precision.</span>
          </h1>

          <p className="mt-5 max-w-[480px] text-sm leading-6 text-background/70 sm:text-base sm:leading-7">
            Purpose-built cooling fans with the performance data to make every
            build feel considered.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button
              render={<a href="#products" />}
              size="lg"
              className="h-11 rounded-xl px-5 font-semibold"
            >
              Shop performance fans
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
            <a
              href="#engineering"
              className="inline-flex items-center gap-1.5 rounded-lg px-1 py-2 text-sm font-medium text-background/75 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Explore the engineering
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8 grid w-full max-w-[440px] grid-cols-3 gap-3 border-t border-background/15 pt-5 sm:mt-10">
            <div>
              <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                {featuredProduct.airflow}
                <span className="ml-1 text-xs font-medium text-background/55 sm:text-sm">
                  CFM
                </span>
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-background/55 sm:text-[11px]">
                Airflow
              </p>
            </div>
            <div>
              <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                {featuredProduct.noise}
                <span className="ml-1 text-xs font-medium text-background/55 sm:text-sm">
                  dBA
                </span>
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-background/55 sm:text-[11px]">
                Noise level
              </p>
            </div>
            <div>
              <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                {featuredProduct.size}
                <span className="ml-1 text-xs font-medium text-background/55 sm:text-sm">
                  mm
                </span>
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-background/55 sm:text-[11px]">
                Frame size
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted shadow-2xl shadow-black/20">
            <Image
              src={featuredProduct.image}
              alt={featuredProduct.imageAlt}
              width={1024}
              height={1024}
              priority
              sizes="(max-width: 1024px) 90vw, 520px"
              className="aspect-square w-full object-cover"
            />
            <div className="absolute left-4 top-4 rounded-full border border-border/70 bg-background/90 px-3 py-1.5 font-mono text-[10px] font-semibold tracking-wider text-foreground shadow-sm">
              AF / 140P
            </div>
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/95 px-4 py-3 text-foreground shadow-lg backdrop-blur sm:inset-x-4 sm:bottom-4">
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Featured / 01
                </p>
                <p className="mt-0.5 truncate text-sm font-semibold sm:text-base">
                  {featuredProduct.name}
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold tabular-nums sm:text-base">
                {formatPrice(featuredProduct.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
