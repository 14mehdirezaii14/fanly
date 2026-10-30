export type ProductCategory = "all" | "120" | "140" | "200"

export type SortOrder =
  | "featured"
  | "price-low"
  | "price-high"
  | "airflow-high"
  | "noise-low"

export type Product = {
  id: string
  name: string
  sku: string
  description: string
  price: number
  size: number
  airflow: number
  noise: number
  stock: number
  pwm: boolean
  tag: string
  image: string
  imageAlt: string
}

export const categories: { value: ProductCategory; label: string }[] = [
  { value: "all", label: "All fans" },
  { value: "120", label: "120 mm" },
  { value: "140", label: "140 mm" },
  { value: "200", label: "200 mm" },
]

export const products: Product[] = [
  {
    id: "aircore-140-pro",
    name: "AirCore 140 Pro",
    sku: "AF-140P",
    description: "Balanced, high-volume cooling with precise PWM control.",
    price: 34,
    size: 140,
    airflow: 101,
    noise: 24,
    stock: 14,
    pwm: true,
    tag: "Featured",
    image: "/images/aeroflow/flagship-fan.png",
    imageAlt: "Black 140 mm AeroFlow cooling fan with a cyan center ring",
  },
  {
    id: "quietline-120",
    name: "Quietline 120",
    sku: "AF-120Q",
    description: "Soft-running airflow for quiet builds and everyday use.",
    price: 26,
    size: 120,
    airflow: 64,
    noise: 17,
    stock: 22,
    pwm: true,
    tag: "Low noise",
    image: "/images/aeroflow/silent-fan.png",
    imageAlt: "White 120 mm AeroFlow cooling fan with pale gray blades",
  },
  {
    id: "pressurex-120",
    name: "PressureX 120",
    sku: "AF-120P",
    description: "Focused airflow for radiators and dense heatsink fins.",
    price: 29,
    size: 120,
    airflow: 78,
    noise: 22,
    stock: 0,
    pwm: true,
    tag: "Static pressure",
    image: "/images/aeroflow/pressure-fan.png",
    imageAlt: "Black 120 mm AeroFlow static-pressure cooling fan",
  },
  {
    id: "ventus-200",
    name: "Ventus 200",
    sku: "AF-200V",
    description: "Large-format cooling designed to move more air at lower RPM.",
    price: 48,
    size: 200,
    airflow: 160,
    noise: 30,
    stock: 8,
    pwm: false,
    tag: "High volume",
    image: "/images/aeroflow/industrial-fan.png",
    imageAlt: "Large black 200 mm AeroFlow industrial-style cooling fan",
  },
]

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
