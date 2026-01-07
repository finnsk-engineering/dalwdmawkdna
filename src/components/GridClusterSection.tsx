import SmartImage from "./SmartImage";

interface GridItem {
  id: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaHref?: string;
}

interface GridClusterSectionProps {
  sectionId?: string;
  headings?: string[];
  subheading?: string;
  items?: GridItem[];
  columns?: 2 | 3 | 4;
  showBorder?: boolean;
  backgroundColor?: string;
}

const GridClusterSection: React.FC<GridClusterSectionProps> = ({
  sectionId,
  headings,
  subheading,
  items,
  columns = 3,
  showBorder = true,
  backgroundColor = "bg-stone-50",
}) => {
  const getGridCols = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <section
      id={sectionId}
      className={`wixui-section wixui-border_section ${backgroundColor} py-16 px-4 sm:px-6 lg:px-8 ${
        showBorder ? "border-t border-b border-stone-200" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {headings && headings.length > 0 && (
          <div className="text-center mb-12">
            {headings.map((heading, index) => (
              <h2
                key={index}
                className={`font-serif text-stone-800 ${
                  index === 0
                    ? "text-3xl sm:text-4xl lg:text-5xl font-bold"
                    : "text-xl sm:text-2xl font-medium mt-2"
                }`}
              >
                {heading}
              </h2>
            ))}
            {subheading && (
              <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
                {subheading}
              </p>
            )}
          </div>
        )}

        {items && items.length > 0 && (
          <div className={`grid ${getGridCols()} gap-6 lg:gap-8`}>
            {items.map((item) => (
              <article
                key={item.id}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                {item.imageSrc && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <SmartImage
                      src={item.imageSrc}
                      alt={item.imageAlt || item.title || "Grid item image"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6">
                  {item.title && (
                    <h3 className="font-serif text-xl font-semibold text-stone-800 mb-2">
                      {item.title}
                    </h3>
                  )}

                  {item.description && (
                    <p className="text-stone-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                  )}

                  {item.ctaText && item.ctaHref && (
                    <a
                      href={item.ctaHref}
                      className="inline-flex items-center text-red-800 font-medium text-sm hover:text-red-900 transition-colors duration-200 group/link"
                    >
                      {item.ctaText}
                      <svg
                        className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {(!items || items.length === 0) && (
          <div className="text-center py-12">
            <p className="text-stone-500 italic">No items to display</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GridClusterSection;