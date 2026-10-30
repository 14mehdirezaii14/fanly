"use client"

import Image from "next/image"
import { Minus, Plus, ShoppingBag, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Progress,
} from "@/components/ui/progress"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { formatPrice, type Product } from "@/components/aeroflow/products"

type CartLine = {
  product: Product
  quantity: number
}

type CartDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CartLine[]
  itemCount: number
  subtotal: number
  onUpdateQuantity: (productId: string, quantity: number) => void
}

export function CartDrawer({
  open,
  onOpenChange,
  items,
  itemCount,
  subtotal,
  onUpdateQuantity,
}: CartDrawerProps) {
  const freeShippingProgress = Math.min(100, (subtotal / 75) * 100)
  const shippingMessage =
    subtotal >= 75
      ? "Your bag qualifies for free shipping."
      : `${formatPrice(75 - subtotal)} away from free shipping`

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[min(100vw,27rem)] max-w-none gap-0 overflow-hidden p-0"
      >
        <SheetHeader className="border-b border-border/70 px-5 py-5 pr-14 text-left sm:px-6 sm:py-6">
          <div className="flex items-center gap-2.5">
            <SheetTitle>Shopping bag</SheetTitle>
            <Badge variant="secondary" className="rounded-full px-2 tabular-nums">
              {itemCount}
            </Badge>
          </div>
          <SheetDescription className="sr-only">
            Cart contents are stored for this preview session.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <ShoppingBag className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">
              Your bag is ready for a build.
            </h3>
            <p className="mt-2 max-w-[260px] text-sm leading-6 text-muted-foreground">
              Add a fan to compare your selections and see the order summary.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-6 rounded-xl"
              onClick={() => onOpenChange(false)}
            >
              Browse fans
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <ul className="flex flex-col gap-5">
                {items.map(({ product, quantity }) => {
                  const maxQuantity = Math.min(10, product.stock)

                  return (
                    <li
                      key={product.id}
                      className="flex gap-3 border-b border-border/70 pb-5 last:border-b-0"
                    >
                      <div className="size-[76px] shrink-0 overflow-hidden rounded-xl bg-muted">
                        <Image
                          src={product.image}
                          alt={product.imageAlt}
                          width={160}
                          height={160}
                          className="size-full object-contain"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-mono text-[9px] tracking-[0.12em] text-muted-foreground">
                              {product.sku}
                            </p>
                            <h3 className="mt-0.5 truncate text-sm font-semibold">
                              {product.name}
                            </h3>
                          </div>
                          <span className="shrink-0 text-sm font-semibold tabular-nums">
                            {formatPrice(product.price * quantity)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {product.size} mm · {product.pwm ? "PWM control" : "3-speed control"}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon-sm"
                              className="rounded-lg"
                              aria-label={`Remove one ${product.name} from the bag`}
                              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                            >
                              <Minus aria-hidden="true" />
                            </Button>
                            <span
                              className="min-w-6 text-center text-xs font-medium tabular-nums"
                              aria-label={`${quantity} in bag`}
                            >
                              {quantity}
                            </span>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon-sm"
                              className="rounded-lg"
                              aria-label={`Add one ${product.name} to the bag`}
                              disabled={quantity >= maxQuantity}
                              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            >
                              <Plus aria-hidden="true" />
                            </Button>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs text-muted-foreground"
                            onClick={() => onUpdateQuantity(product.id, 0)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="border-t border-border/70 bg-background px-5 py-5 sm:px-6">
              <div className="mb-4 rounded-xl bg-muted/55 p-3.5">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="flex items-center gap-2 font-medium">
                    <Truck className="size-4 text-muted-foreground" aria-hidden="true" />
                    {shippingMessage}
                  </span>
                  <span className="shrink-0 text-muted-foreground">$75</span>
                </div>
                <Progress
                  value={freeShippingProgress}
                  aria-label="Progress toward the free shipping threshold"
                  className="mt-3"
                />
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-base font-semibold tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Shipping and taxes are calculated later.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-5 h-10 w-full rounded-xl"
                onClick={() => onOpenChange(false)}
              >
                Continue browsing
              </Button>
              <p className="mt-3 text-center text-[10px] text-muted-foreground">
                Preview cart · checkout is not configured
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
