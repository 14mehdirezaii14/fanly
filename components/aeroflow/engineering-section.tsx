import { Gauge, ShieldCheck, Volume2 } from "lucide-react"

const features = [
  {
    icon: Volume2,
    eyebrow: "Acoustic profile",
    title: "Quiet by design",
    description: "Compare noise ratings before choosing a fan for your build.",
  },
  {
    icon: Gauge,
    eyebrow: "Speed control",
    title: "PWM precision",
    description: "See which models support fine-grained smart speed control.",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Clear specs",
    title: "Built around the details",
    description: "Airflow, frame size, and stock status stay easy to scan.",
  },
]

export function EngineeringSection() {
  return (
    <section
      id="engineering"
      aria-label="AeroFlow engineering details"
      className="grid scroll-mt-24 grid-cols-1 divide-y divide-border rounded-2xl border border-border/80 bg-card md:grid-cols-3 md:divide-x md:divide-y-0"
    >
      {features.map(({ icon: Icon, eyebrow, title, description }) => (
        <article key={title} className="flex gap-4 px-5 py-5 sm:px-6 sm:py-6">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {eyebrow}
            </p>
            <h2 className="mt-1 text-sm font-semibold tracking-tight sm:text-base">
              {title}
            </h2>
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground sm:text-sm">
              {description}
            </p>
          </div>
        </article>
      ))}
    </section>
  )
}
