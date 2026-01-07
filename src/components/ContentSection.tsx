import SmartImage from "./SmartImage";

interface ContentSectionProps {
  heading?: string;
  subheading?: string;
  content?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
  hasBackground?: boolean;
  className?: string;
  id?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  heading,
  subheading,
  content,
  backgroundImage,
  backgroundColor = "bg-stone-50",
  children,
  hasBackground = false,
  className = "",
  id,
}) => {
  return (
    <section
      id={id}
      className={`wixui-section wixui-border_section border_section relative w-full ${className}`}
    >
      {/* Background Layers */}
      <div className="bgLayers absolute inset-0 overflow-hidden">
        {hasBackground && backgroundImage && (
          <div className="bgMedia absolute inset-0">
            <SmartImage
              src={backgroundImage}
              alt="Section background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-stone-900/40" />
          </div>
        )}
        {!backgroundImage && hasBackground && (
          <div className={`absolute inset-0 ${backgroundColor}`} />
        )}
        {!hasBackground && (
          <div className={`absolute inset-0 ${backgroundColor}`} />
        )}
      </div>

      {/* Content Wrapper */}
      <div className="dkukWC relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col items-center">
          {/* Heading */}
          {heading && (
            <h2
              className={`mb-4 text-center font-serif text-3xl font-light tracking-wide sm:text-4xl lg:text-5xl ${
                hasBackground && backgroundImage
                  ? "text-stone-50"
                  : "text-stone-800"
              }`}
            >
              {heading}
            </h2>
          )}

          {/* Subheading */}
          {subheading && (
            <p
              className={`mb-6 text-center text-lg font-light tracking-wider uppercase ${
                hasBackground && backgroundImage
                  ? "text-stone-200"
                  : "text-red-800"
              }`}
            >
              {subheading}
            </p>
          )}

          {/* Decorative Divider */}
          {(heading || subheading) && (
            <div className="mb-8 flex items-center justify-center gap-3">
              <span
                className={`h-px w-12 ${
                  hasBackground && backgroundImage
                    ? "bg-stone-400"
                    : "bg-stone-300"
                }`}
              />
              <span
                className={`h-1.5 w-1.5 rotate-45 ${
                  hasBackground && backgroundImage
                    ? "bg-stone-400"
                    : "bg-red-800"
                }`}
              />
              <span
                className={`h-px w-12 ${
                  hasBackground && backgroundImage
                    ? "bg-stone-400"
                    : "bg-stone-300"
                }`}
              />
            </div>
          )}

          {/* Content Text */}
          {content && (
            <div
              className={`max-w-3xl text-center text-base leading-relaxed sm:text-lg ${
                hasBackground && backgroundImage
                  ? "text-stone-100"
                  : "text-stone-600"
              }`}
            >
              <p>{content}</p>
            </div>
          )}

          {/* Children / Flexible Content Area */}
          {children && (
            <div className="mt-8 w-full">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;