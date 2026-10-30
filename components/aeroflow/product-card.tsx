import Image from "next/image"
import { Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { formatPrice, type Product } from "@/components/aeroflow/products"

type ProductCardProps = {
  product: Product
  quantityValue: string
  cartQuantity: number
  onQuantityChange: (productId: string, value: string) => void
  onQuantityBlur: (productId: string) => void
  onAddToCart: (productId: string) => void
}

function ProductMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-1 px-1">
      <span className="text-sm font-semibold tabular-nums tracking-tight text-foreground">
        {value}
      </span>
      <span className="text-center text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:text-[10px]">
        {label}
      </span>
    </div>
  )
}

export function ProductCard({
  product,
  quantityValue,
  cartQuantity,
  onQuantityChange,
  onQuantityBlur,
  onAddToCart,
}: ProductCardProps) {
  const maxQuantity = Math.min(10, product.stock)
  const remaining = Math.max(0, maxQuantity - cartQuantity)
  const isAvailable = product.stock > 0 && remaining > 0

  return (
    <Card className="group/card h-full gap-0 rounded-2xl border border-border/70 bg-card py-0 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/5">
      <div className="relative overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.imageAlt}
          width={1024}
          height={1024}
          sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 330px"
          className="aspect-square w-full object-contain transition-transform duration-500 group-hover/card:scale-[1.035]"
        />
        <div className="absolute left-4 top-4">
          <Badge
            variant="secondary"
            className="border border-border/70 bg-background/90 text-foreground shadow-sm"
          >
            {product.tag}
          </Badge>
        </div>
        {product.stock === 0 && (
          <Badge
            variant="secondary"
            className="absolute right-4 top-4 border border-border/70 bg-background/90 text-muted-foreground shadow-sm"
          >
            Sold out
          </Badge>
        )}
      </div>

      <CardHeader className="gap-2 px-4 pb-3 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-medium tracking-[0.12em] text-muted-foreground">
              {product.sku}
            </p>
            <CardTitle
              role="heading"
              aria-level={3}
              className="mt-1 text-base font-semibold leading-tight tracking-[-0.02em]"
            >
              {product.name}
            </CardTitle>
          </div>
          <span className="shrink-0 pt-0.5 text-base font-semibold tabular-nums tracking-tight">
            {formatPrice(product.price)}
          </span>
        </div>
        <CardDescription className="min-h-10 text-xs leading-5">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        <div className="grid grid-cols-3 divide-x divide-border rounded-xl border border-border/70 bg-muted/40 py-3">
          <ProductMetric label="Airflow" value={`${product.airflow} CFM`} />
          <ProductMetric label="Noise" value={`${product.noise} dBA`} />
          <ProductMetric label="Frame" value={`${product.size} mm`} />
        </div>
        <div className="mt-3 flex min-h-6 items-center justify-between gap-2">
          <Badge variant="outline" className="gap-1.5 bg-background text-[10px] font-medium">
            <span
              className="size-1.5 rounded-full bg-primary"
              aria-hidden="true"
            />
            {product.pwm ? "PWM control" : "3-speed control"}
          </Badge>
          <span className="truncate text-[11px] text-muted-foreground">
            {product.stock === 0
              ? "Currently unavailable"
              : remaining === 0
                ? "Maximum in bag"
                : `${remaining} available`}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center gap-2 border-t border-border/70 bg-muted/30 px-4 py-4">
        <Input
          type="number"
          min={1}
          max={Math.max(1, remaining)}
          step={1}
          inputMode="numeric"
          value={quantityValue}
          disabled={!isAvailable}
          onChange={(event) => onQuantityChange(product.id, event.target.value)}
          onBlur={() => onQuantityBlur(product.id)}
          aria-label={`Quantity for ${product.name}`}
          className="h-10 w-[72px] rounded-xl bg-background text-center font-medium tabular-nums"
        />
        <Button
          type="button"
          className="h-10 flex-1 rounded-xl font-semibold"
          disabled={!isAvailable}
          onClick={() => onAddToCart(product.id)}
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus data-icon="inline-start" aria-hidden="true" />
          {product.stock === 0
            ? "Out of stock"
            : remaining === 0
              ? "Limit reached"
              : "Add to cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
