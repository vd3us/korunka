import { Reveal } from '@/components/motion/reveal'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  as = 'h2',
}: SectionHeadingProps) {
  const Tag = as
  const isCenter = align === 'center'

  return (
    <div className={isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow flex items-center gap-3 text-xs font-medium text-[var(--gold)]">
            {isCenter && <span className="h-px w-8 bg-[var(--gold)]/50" aria-hidden />}
            {eyebrow}
            <span className="h-px w-8 bg-[var(--gold)]/50" aria-hidden />
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Tag className="mt-4 text-balance font-serif text-3xl leading-tight text-primary md:text-4xl lg:text-[2.75rem]">
          {title}
        </Tag>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
