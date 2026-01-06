import SmartImage from "./SmartImage";

interface PriceOption {
  size: string;
  price: string;
}

interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  prices?: PriceOption[];
}

interface FullWidthMenuCategoryGelatoStyleProps {
  categoryTitle: string;
  items: MenuItem[];
}

export default function FullWidthMenuCategoryGelatoStyle({
  categoryTitle,
  items,
}: FullWidthMenuCategoryGelatoStyleProps) {
  return (
    <div className="container mx-auto mt-3 px-4">
      <div className="w-full">
        <h2 className="text-3xl md:text-4xl font-serif text-stone-800 text-center mb-8 tracking-wide">
          {categoryTitle}
        </h2>
        
        <div className="bg-stone-50 rounded-lg p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-300 border border-stone-100"
              >
                <div className="flex flex-col h-full">
                  <h3 className="text-lg font-semibold text-stone-800 mb-2">
                    {item.name}
                  </h3>
                  
                  {item.description && (
                    <p className="text-stone-600 text-sm mb-3 flex-grow">
                      {item.description}
                    </p>
                  )}
                  
                  <div className="mt-auto">
                    {item.price && (
                      <span className="text-red-800 font-semibold text-lg">
                        {item.price}
                      </span>
                    )}
                    
                    {item.prices && item.prices.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-2">
                        {item.prices.map((priceOption, priceIndex) => (
                          <div
                            key={priceIndex}
                            className="flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-full"
                          >
                            <span className="text-stone-600 text-sm">
                              {priceOption.size}
                            </span>
                            <span className="text-red-800 font-semibold">
                              {priceOption.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-stone-500 text-sm italic">
            Ask about our seasonal flavors
          </p>
        </div>
      </div>
    </div>
  );
}