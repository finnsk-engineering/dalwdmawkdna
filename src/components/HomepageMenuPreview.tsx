import React from "react";

interface MenuItem {
  name: string;
  description?: string;
  price?: string;
}

interface HomeMenuPreviewProps {
  sectionTitle: string;
  subtitle?: string;
  items: MenuItem[];
  displayLimit?: number;
}

const HomepageMenuPreview: React.FC<HomeMenuPreviewProps> = ({
  sectionTitle,
  subtitle,
  items,
  displayLimit,
}) => {
  const displayedItems = displayLimit ? items.slice(0, displayLimit) : items;

  return (
    <section className="bg-stone-50 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-stone-800 tracking-wide uppercase">
            {sectionTitle}
          </h3>
          {subtitle && (
            <p className="mt-2 text-stone-600 text-sm md:text-base italic">
              {subtitle}
            </p>
          )}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 md:space-y-8">
            {displayedItems.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="border-b border-stone-200 pb-5 last:border-b-0 last:pb-0"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h4 className="font-serif text-lg md:text-xl font-medium text-stone-800 uppercase tracking-wider">
                      {item.name}
                    </h4>
                    {item.description && (
                      <p className="mt-2 text-stone-600 text-sm md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                  {item.price && (
                    <span className="font-serif text-lg md:text-xl font-semibold text-red-800 whitespace-nowrap">
                      {item.price}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {displayLimit && items.length > displayLimit && (
            <div className="mt-10 text-center">
              <span className="inline-block px-6 py-3 border-2 border-red-800 text-red-800 font-medium uppercase tracking-wider text-sm hover:bg-red-800 hover:text-white transition-colors duration-300 cursor-pointer">
                View Full Menu
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomepageMenuPreview;