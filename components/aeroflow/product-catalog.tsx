"use client"

import { useState } from "react"
import { SlidersHorizontal } from "lucide-react"

import { FilterControls } from "@/components/aeroflow/filter-controls"
import { ProductCard } from "@/components/aeroflow/product-card"
import { categories, type Product, type ProductCategory, type SortOrder } from "@/components/aeroflow/products"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ProductCatalogProps = {
  products: Product[]
  totalProducts: number
  category: ProductCategory
  onCategoryChange: (value: ProductCategory) => void
  sortOrder: SortOrder
  onSortChange: (value: SortOrder) => void
  maxNoise: number
  minAirflow: number
  inStockOnly: boolean
  pwmOnly: boolean
  activeFilterCount: number
  onMaxNoiseChange: (value: number) => void
  onMinAirflowChange: (value: number) => void
  onInStockOnlyChange: (checked: boolean) => void
  onPwmOnlyChange: (checked: boolean) => void
  onResetFilters: () => void
  onResetAll: () => void
  quantityValues: Record<string, string>
  cartQuantities: Record<string, number>
  onQuantityChange: (productId: string, value: string) => void
  onQuantityBlur: (productId: string) => void
  onAddToCart: (productId: string) => void
}

export function ProductCatalog({
  products,
  totalProducts,
  category,
  onCategoryChange,
  sortOrder,
  onSortChange,
  maxNoise,
  minAirflow,
  inStockOnly,
  pwmOnly,
  activeFilterCount,
  onMaxNoiseChange,
  onMinAirflowChange,
  onInStockOnlyChange,
  onPwmOnlyChange,
  onResetFilters,
  onResetAll,
  quantityValues,
  cartQuantities,
  onQuantityChange,
  onQuantityBlur,
  onAddToCart,
}: ProductCatalogProps) {
  const [filterOpen, setFilterOpen] = useState(false)

  const filterControls = (
    <FilterControls
      maxNoise={maxNoise}
      minAirflow={minAirflow}
      inStockOnly={inStockOnly}
      pwmOnly={pwmOnly}
      onMaxNoiseChange={onMaxNoiseChange}
      onMinAirflowChange={onMinAirflowChange}
      onInStockOnlyChange={onInStockOnlyChange}
      onPwmOnlyChange={onPwmOnlyChange}
      onReset={onResetFilters}
    />
  )

  return (
    <Sheet
      open={filterOpen}
      onOpenChange={(open) => {
        console.log("[v0] filter sheet state", open)
        setFilterOpen(open)
      }}
    >
      <section id="products" aria-labelledby="products-title" className="scroll-mt-24">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            The performance collection
          </div>
          <h2
            id="products-title"
            className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl"
          >
            Find your airflow.
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Compare the details that matter, then tune the list to your build.
          </p>
        </div>
        <Badge variant="outline" className="w-fit rounded-full bg-card px-3 py-1 text-xs">
          {totalProducts} performance models
        </Badge>
      </div>

      <div className="mt-7 flex flex-col gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Tabs
            value={category}
            onValueChange={(value) => onCategoryChange(value as ProductCategory)}
            className="w-full sm:w-fit"
          >
            <TabsList
              aria-label="Filter by fan frame size"
              className="h-10 w-full justify-between rounded-xl border border-border/70 bg-card p-1 sm:w-fit sm:justify-start"
            >
              {categories.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="h-8 min-w-0 flex-1 px-2 text-xs sm:flex-none sm:px-4 sm:text-sm"
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-10 flex-1 gap-2 rounded-xl px-3 lg:hidden"
              aria-label={`Open filters${activeFilterCount ? `, ${activeFilterCount} active` : ""}`}
              aria-haspopup="dialog"
              aria-expanded={filterOpen}
              aria-controls="filters-drawer"
              data-testid="mobile-filter-trigger"
              onClick={() => {
                console.log("[v0] mobile filter button clicked")
                setFilterOpen(true)
              }}
            >
              <SlidersHorizontal data-icon="inline-start" aria-hidden="true" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-0.5 size-5 rounded-full p-0 text-[10px]">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>

            <Select
              value={sortOrder}
              onValueChange={(value) => onSortChange(value as SortOrder)}
            >
              <SelectTrigger
                aria-label="Sort products"
                className="h-10 w-full rounded-xl bg-card sm:w-[190px]"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: low to high</SelectItem>
                  <SelectItem value="price-high">Price: high to low</SelectItem>
                  <SelectItem value="airflow-high">Highest airflow</SelectItem>
                  <SelectItem value="noise-low">Quietest first</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[232px_minmax(0,1fr)] xl:gap-7">
          <aside aria-label="Product filters" className="hidden lg:block">
            {filterControls}
          </aside>

          <div className="min-w-0">
            <div className="mb-4 flex min-h-8 items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground" aria-live="polite">
                Showing <span className="font-semibold text-foreground">{products.length}</span> of {totalProducts} fans
              </p>
              {activeFilterCount > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs text-muted-foreground"
                  onClick={onResetFilters}
                >
                  Clear filters
                </Button>
              )}
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantityValue={quantityValues[product.id] ?? "1"}
                    cartQuantity={cartQuantities[product.id] ?? 0}
                    onQuantityChange={onQuantityChange}
                    onQuantityBlur={onQuantityBlur}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            ) : (
              <Card className="items-center border-dashed bg-card px-6 py-10 text-center shadow-none sm:py-14">
                <CardHeader className="max-w-md justify-items-center">
                  <span className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                    <SlidersHorizontal className="size-5" aria-hidden="true" />
                  </span>
                  <CardTitle
                    role="heading"
                    aria-level={3}
                    className="text-lg font-semibold"
                  >
                    No fans match those specs.
                  </CardTitle>
                  <CardDescription className="text-sm leading-6">
                    Try a wider airflow or noise range, or clear the current search and filters.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="justify-center border-0 bg-transparent p-0">
                  <Button type="button" variant="outline" onClick={onResetAll}>
                    Reset all filters
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>

      <SheetContent id="filters-drawer" side="right" className="w-[min(100vw,25rem)] max-w-none gap-5 overflow-y-auto px-5 py-6 sm:px-6">
          <SheetHeader className="border-b border-border/70 pb-4 pr-10">
            <SheetTitle>Refine your search</SheetTitle>
            <SheetDescription>
              Adjust the product specs to match your build.
            </SheetDescription>
          </SheetHeader>
          <div className="pb-2">
            <FilterControls
              maxNoise={maxNoise}
              minAirflow={minAirflow}
              inStockOnly={inStockOnly}
              pwmOnly={pwmOnly}
              onMaxNoiseChange={onMaxNoiseChange}
              onMinAirflowChange={onMinAirflowChange}
              onInStockOnlyChange={onInStockOnlyChange}
              onPwmOnlyChange={onPwmOnlyChange}
              onReset={onResetFilters}
              className="border-0 shadow-none ring-0"
            />
          </div>
        </SheetContent>
      </section>
    </Sheet>
  )
}
