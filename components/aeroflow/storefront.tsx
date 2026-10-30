"use client"

import { useMemo, useState } from "react"

import { CartDrawer } from "@/components/aeroflow/cart-drawer"
import { EngineeringSection } from "@/components/aeroflow/engineering-section"
import { HeroSection } from "@/components/aeroflow/hero-section"
import { ProductCatalog } from "@/components/aeroflow/product-catalog"
import { products, type ProductCategory, type SortOrder } from "@/components/aeroflow/products"
import { SiteFooter } from "@/components/aeroflow/site-footer"
import { SiteHeader } from "@/components/aeroflow/site-header"

const MAX_ORDER_QUANTITY = 10

export function AeroFlowStorefront() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState<ProductCategory>("all")
  const [sortOrder, setSortOrder] = useState<SortOrder>("featured")
  const [maxNoise, setMaxNoise] = useState(50)
  const [minAirflow, setMinAirflow] = useState(0)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [pwmOnly, setPwmOnly] = useState(false)
  const [quantityValues, setQuantityValues] = useState<Record<string, string>>({})
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [announcement, setAnnouncement] = useState("")

  const activeFilterCount =
    Number(maxNoise < 50) +
    Number(minAirflow > 0) +
    Number(inStockOnly) +
    Number(pwmOnly)

  const visibleProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    const filtered = products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          product.name,
          product.sku,
          product.description,
          `${product.size} mm`,
          `${product.airflow} cfm`,
          `${product.noise} dba`,
          product.pwm ? "pwm" : "",
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch)

      return (
        matchesSearch &&
        (category === "all" || String(product.size) === category) &&
        product.noise <= maxNoise &&
        product.airflow >= minAirflow &&
        (!inStockOnly || product.stock > 0) &&
        (!pwmOnly || product.pwm)
      )
    })

    return filtered.sort((first, second) => {
      switch (sortOrder) {
        case "price-low":
          return first.price - second.price
        case "price-high":
          return second.price - first.price
        case "airflow-high":
          return second.airflow - first.airflow
        case "noise-low":
          return first.noise - second.noise
        default:
          return 0
      }
    })
  }, [category, inStockOnly, maxNoise, minAirflow, pwmOnly, searchTerm, sortOrder])

  const cartLines = useMemo(
    () =>
      Object.entries(cartQuantities).flatMap(([productId, quantity]) => {
        const product = products.find((item) => item.id === productId)
        return product && quantity > 0 ? [{ product, quantity }] : []
      }),
    [cartQuantities],
  )

  const cartCount = Object.values(cartQuantities).reduce(
    (total, quantity) => total + quantity,
    0,
  )
  const cartSubtotal = cartLines.reduce(
    (total, line) => total + line.product.price * line.quantity,
    0,
  )

  const resetFilters = () => {
    setMaxNoise(50)
    setMinAirflow(0)
    setInStockOnly(false)
    setPwmOnly(false)
  }

  const resetAll = () => {
    resetFilters()
    setCategory("all")
    setSearchTerm("")
    setSortOrder("featured")
  }

  const updateQuantityInput = (productId: string, value: string) => {
    setQuantityValues((current) => ({ ...current, [productId]: value }))
  }

  const normalizeQuantityInput = (productId: string) => {
    const product = products.find((item) => item.id === productId)
    if (!product) return

    const remaining = Math.max(
      1,
      Math.min(MAX_ORDER_QUANTITY, product.stock) - (cartQuantities[productId] ?? 0),
    )
    const parsedQuantity = Number.parseInt(quantityValues[productId] ?? "1", 10)
    const normalizedQuantity = Number.isFinite(parsedQuantity)
      ? Math.max(1, Math.min(remaining, parsedQuantity))
      : 1

    setQuantityValues((current) => ({
      ...current,
      [productId]: String(normalizedQuantity),
    }))
  }

  const addToCart = (productId: string) => {
    const product = products.find((item) => item.id === productId)
    if (!product || product.stock === 0) return

    const maxQuantity = Math.min(MAX_ORDER_QUANTITY, product.stock)
    const currentQuantity = cartQuantities[productId] ?? 0
    const remaining = maxQuantity - currentQuantity
    if (remaining <= 0) return

    const parsedQuantity = Number.parseInt(quantityValues[productId] ?? "1", 10)
    const requestedQuantity = Number.isFinite(parsedQuantity)
      ? Math.max(1, Math.min(MAX_ORDER_QUANTITY, parsedQuantity))
      : 1
    const addedQuantity = Math.min(requestedQuantity, remaining)

    setCartQuantities((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + addedQuantity,
    }))
    setQuantityValues((current) => ({ ...current, [productId]: "1" }))
    setAnnouncement(
      `${addedQuantity} ${product.name} ${addedQuantity === 1 ? "added" : "added"} to the shopping bag.`,
    )
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    const product = products.find((item) => item.id === productId)
    if (!product) return

    const maxQuantity = Math.min(MAX_ORDER_QUANTITY, product.stock)
    const nextQuantity = Math.max(0, Math.min(maxQuantity, quantity))
    setCartQuantities((current) => {
      const next = { ...current }
      if (nextQuantity === 0) {
        delete next[productId]
      } else {
        next[productId] = nextQuantity
      }
      return next
    })
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
      <SiteHeader
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 py-5 sm:gap-12 sm:px-6 sm:py-7 lg:gap-14 lg:px-10 lg:py-9">
        <HeroSection />
        <EngineeringSection />
        <ProductCatalog
          products={visibleProducts}
          totalProducts={products.length}
          category={category}
          onCategoryChange={setCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          maxNoise={maxNoise}
          minAirflow={minAirflow}
          inStockOnly={inStockOnly}
          pwmOnly={pwmOnly}
          activeFilterCount={activeFilterCount}
          onMaxNoiseChange={setMaxNoise}
          onMinAirflowChange={setMinAirflow}
          onInStockOnlyChange={setInStockOnly}
          onPwmOnlyChange={setPwmOnly}
          onResetFilters={resetFilters}
          onResetAll={resetAll}
          quantityValues={quantityValues}
          cartQuantities={cartQuantities}
          onQuantityChange={updateQuantityInput}
          onQuantityBlur={normalizeQuantityInput}
          onAddToCart={addToCart}
        />
      </div>

      <SiteFooter />
      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartLines}
        itemCount={cartCount}
        subtotal={cartSubtotal}
        onUpdateQuantity={updateCartQuantity}
      />
    </main>
  )
}
