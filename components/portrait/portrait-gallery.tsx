import { PortraitCard } from './portrait-card'
import { StaggerChildren } from '@/components/motion/stagger-children'
import { STAGGER } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface Person {
  src: string
  name: string
  role: string
  bio?: string
  objectPosition?: string
}

interface PortraitGalleryProps {
  people: Person[]
  layout?: 'row' | 'grid'
  maxVisible?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PortraitGallery({
  people,
  layout = 'row',
  maxVisible,
  size = 'md',
  className,
}: PortraitGalleryProps) {
  const visible = maxVisible ? people.slice(0, maxVisible) : people

  return (
    <StaggerChildren
      stagger={STAGGER.portraits}
      variant="slow"
      className={cn(
        layout === 'row'
          ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
          : 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        className
      )}
    >
      {visible.map((person) => (
        <PortraitCard
          key={person.name}
          src={person.src}
          name={person.name}
          role={person.role}
          bio={person.bio}
          size={size}
          objectPosition={person.objectPosition}
        />
      ))}
    </StaggerChildren>
  )
}
