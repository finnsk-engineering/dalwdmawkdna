import React from "react";

interface PriceOption {
  size: string;
  price: string;
}

interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  prices?: PriceOption[];
  servingNote?: string;
}

interface MenuCategoryMainProps {
  categoryTitle: string;
  categoryTitleClass?: "menutoptitle";
  items: MenuItem[];
}

const MenuCategoryBlockwithMainTitle: React.FC<MenuCategoryMainProps> = ({
  categoryTitle,
  items,
}) => {
  return (
    <div className="w-full md:w-1/3 px-4 mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-red-800 mb-6 uppercase tracking-wide border-b-2 border-red-800 pb-2">
        {categoryTitle}
      </h2>
      
      <div className="bg-stone-50 rounded-lg p-4 shadow-sm">
        {items.map((item, index) => (
          <div
            key={index}
            className={`py-4 ${
              index !== items.length - 1 ? "border-b border-stone-200" : ""
            }`}
          >
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-lg font-semibold text-stone-800 uppercase tracking-wide">
                {item.name}
              </h3>
              
              {item.price && (
                <span className="text-red-800 font-bold whitespace-nowrap">
                  {item.price}
                </span>
              )}
            </div>
            
            {item.description && (
              <p className="text-stone-600 text-sm mt-1 leading-relaxed">
                {item.description}
              </p>
            )}
            
            {item.prices && item.prices.length > 0 && (
              <div className="mt-2 space-y-1">
                {item.prices.map((priceOption, priceIndex) => (
                  <div
                    key={priceIndex}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-stone-600 italic">
                      {priceOption.size}
                    </span>
                    <span className="text-red-800 font-semibold">
                      {priceOption.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            {item.servingNote && (
              <p className="text-stone-500 text-xs mt-2 italic">
                {item.servingNote}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCategoryBlockwithMainTitle;