import { Wind } from "lucide-react"

export function SiteFooter() {
  return (
    <footer id="support" className="scroll-mt-24 bg-foreground text-background">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 py-9 sm:px-6 sm:py-10 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div className="max-w-sm">
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="AeroFlow home"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wind aria-hidden="true" />
            </span>
            <span className="text-sm font-bold tracking-[-0.04em]">AeroFlow</span>
          </a>
          <p className="mt-3 text-sm leading-6 text-background/65">
            Purpose-built fans. Clear specs. Better-informed builds.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-background/70">
          <a className="transition-colors hover:text-background" href="#products">
            Shop fans
          </a>
          <a className="transition-colors hover:text-background" href="#engineering">
            Engineering
          </a>
          <a className="transition-colors hover:text-background" href="#top">
            Back to top
          </a>
        </nav>
      </div>
      <div className="border-t border-background/15">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-1 px-4 py-4 text-[10px] text-background/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <span>© 2026 AeroFlow. Sample storefront concept.</span>
          <span>Preview catalog · Checkout is not configured</span>
        </div>
      </div>
    </footer>
  )
}
