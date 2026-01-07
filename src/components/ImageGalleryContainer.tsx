import SmartImage from "./SmartImage";

interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ImageGalleryContainerProps {
  images: GalleryImage[];
  maxWidth?: string;
  gap?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  className?: string;
}

const ImageGalleryContainer: React.FC<ImageGalleryContainerProps> = ({
  images,
  maxWidth = "max-w-6xl",
  gap = "gap-4",
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  className,
}) => {
  const getGridCols = (): string => {
    const mobile = columns.mobile || 1;
    const tablet = columns.tablet || 2;
    const desktop = columns.desktop || 3;

    const mobileClass = `grid-cols-${mobile}`;
    const tabletClass = `md:grid-cols-${tablet}`;
    const desktopClass = `lg:grid-cols-${desktop}`;

    return `${mobileClass} ${tabletClass} ${desktopClass}`;
  };

  return (
    <div
      className={`comp-lyoh7fq5-container max-width-container w-full mx-auto px-4 sm:px-6 lg:px-8 ${maxWidth} ${className || ""}`}
    >
      <div className={`grid ${getGridCols()} ${gap}`}>
        {images &&
          images.length > 0 &&
          images.map((image, index) => (
            <div
              key={`gallery-image-${index}`}
              className="relative overflow-hidden rounded-lg bg-stone-100 aspect-square"
            >
              <SmartImage
                src={image.src}
                alt={image.alt || `Gallery image ${index + 1}`}
                width={image.width || 600}
                height={image.height || 600}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageGalleryContainer;