import Image from 'next/image';
import assets from '@/data/assets.json';
export function ArtImage({
  src,
  alt,
  priority = false,
  className = '',
  sizes = '(max-width: 700px) 100vw, 70vw',
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const size = (assets as Record<string, { width: number; height: number }>)[src] || {
    width: 1600,
    height: 900,
  };
  return (
    <Image
      src={src}
      alt={alt}
      width={size.width}
      height={size.height}
      sizes={sizes}
      priority={priority}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
    />
  );
}
