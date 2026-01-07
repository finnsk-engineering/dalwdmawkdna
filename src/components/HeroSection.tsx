import SmartImage from "./SmartImage";

interface HeroSectionProps {
  heading?: string;
  subheading?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
  ctaText?: string;
  ctaHref?: string;
  overlayOpacity?: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  heading,
  subheading,
  backgroundImage,
  backgroundAlt,
  ctaText,
  ctaHref,
  overlayOpacity = 0.4,
}) => {
  return (
    <section className="wixui-section wixui-border_welcome border_welcome relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Layers */}
      <div className="bgLayers absolute inset-0 w-full h-full">
        <div className="bgMedia absolute inset-0 w-full h-full">
          {backgroundImage && (
            <div className="wow-image relative w-full h-full">
              <SmartImage
                src={backgroundImage}
                alt={backgroundAlt || "Hero background"}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          )}
        </div>
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-stone-900"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          {heading && (
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-stone-50 tracking-tight leading-tight">
              {heading}
            </h1>
          )}
          
          {subheading && (
            <p className="text-lg md:text-xl lg:text-2xl text-stone-200 font-light max-w-2xl mx-auto leading-relaxed">
              {subheading}
            </p>
          )}
          
          {ctaText && ctaHref && (
            <div className="pt-6">
              <a
                href={ctaHref}
                className="inline-block px-8 py-4 bg-red-800 text-stone-50 font-semibold text-lg uppercase tracking-wider rounded-sm hover:bg-red-900 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {ctaText}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-800 to-transparent" />
    </section>
  );
};

export default HeroSection;