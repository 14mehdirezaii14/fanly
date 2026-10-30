"use client"

import { useEffect } from "react"
import { Search, ShoppingBag, Truck, Wind } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type SiteHeaderProps = {
  cartCount: number
  onOpenCart: () => void
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function SiteHeader({
  cartCount,
  onOpenCart,
  searchTerm,
  onSearchChange,
}: SiteHeaderProps) {
  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        document.getElementById("store-search")?.focus()
      }
    }

    window.addEventListener("keydown", handleSearchShortcut)
    return () => window.removeEventListener("keydown", handleSearchShortcut)
  }, [])

  return (
    <>
      <div className="bg-foreground text-background">
        <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-2 px-4 py-2 text-[11px] font-medium tracking-wide sm:text-xs">
          <Truck className="size-3.5 text-primary" aria-hidden="true" />
          <span>Complimentary shipping on orders over $75</span>
          <span className="hidden text-background/50 sm:inline" aria-hidden="true">
            ·
          </span>
          <span className="hidden text-background/70 sm:inline">
            Straightforward returns
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6 lg:gap-8 lg:px-10">
          <a
            href="#top"
            className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="AeroFlow home"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Wind aria-hidden="true" />
            </span>
            <span className="text-[15px] font-bold tracking-[-0.04em] sm:text-base">
              AeroFlow
            </span>
          </a>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex"
          >
            <a className="transition-colors hover:text-foreground" href="#products">
              Fans
            </a>
            <a className="transition-colors hover:text-foreground" href="#engineering">
              Engineering
            </a>
            <a className="transition-colors hover:text-foreground" href="#support">
              Support
            </a>
          </nav>

          <div className="ml-auto flex min-w-0 flex-1 items-center gap-2 sm:gap-3 lg:ml-0 lg:justify-end">
            <div className="relative min-w-0 flex-1 lg:max-w-[360px]">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="store-search"
                type="search"
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search fans..."
                aria-label="Search cooling fans by name or specification"
                className="h-10 rounded-xl border-border/70 bg-muted/60 pl-9 pr-3 text-sm focus-visible:bg-background sm:pr-20"
              />
              <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground sm:inline-flex">
                ⌘ / Ctrl K
              </kbd>
            </div>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-10 shrink-0 gap-2 rounded-xl px-2.5 sm:px-3"
              onClick={onOpenCart}
              aria-label={`Open shopping bag, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
            >
              <ShoppingBag data-icon="inline-start" aria-hidden="true" />
              <span className="hidden sm:inline">Bag</span>
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold leading-none text-primary-foreground tabular-nums">
                {cartCount}
              </span>
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}
