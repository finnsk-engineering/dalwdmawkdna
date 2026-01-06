import SmartImage from "./SmartImage";

interface TwoColumnImageLayoutImage {
  src: string;
  alt: string;
  marginBottom?: boolean;
}

interface TwoColumnImageLayoutProps {
  images: TwoColumnImageLayoutImage[];
  layout: "side-by-side";
}

export default function TwoColumnImageLayout({ images, layout }: TwoColumnImageLayoutProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {images.map((image, index) => (
            <div key={index} className="flex flex-col">
              <div className={image.marginBottom ? "mb-4" : ""}>
                <SmartImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover rounded-sm shadow-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}