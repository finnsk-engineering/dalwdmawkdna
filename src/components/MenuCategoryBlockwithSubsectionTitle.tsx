import SmartImage from "./SmartImage";

interface MenuItemPrice {
  size: string;
  price: string;
}

interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  prices?: MenuItemPrice[];
}

interface MenuCategorySubsectionProps {
  categoryTitle: string;
  categoryTitleClass?: "menutopsubsection";
  items: MenuItem[];
}

const MenuCategoryBlockwithSubsectionTitle: React.FC<MenuCategorySubsectionProps> = ({
  categoryTitle,
  categoryTitleClass = "menutopsubsection",
  items,
}) => {
  return (
    <div className="w-full sm:w-1/3 px-4">
      <h2 className="text-2xl font-semibold text-red-800 mb-6 uppercase tracking-wide border-b border-stone-300 pb-2">
        {categoryTitle}
      </h2>
      
      <div className="space-y-6">
        {items.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="bg-stone-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-lg font-medium text-stone-800 uppercase tracking-wide">
                {item.name}
              </h3>
              
              {item.price && (
                <span className="text-red-800 font-semibold whitespace-nowrap">
                  {item.price}
                </span>
              )}
            </div>
            
            {item.description && (
              <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                {item.description}
              </p>
            )}
            
            {item.prices && item.prices.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {item.prices.map((priceOption, priceIndex) => (
                  <div
                    key={`${priceOption.size}-${priceIndex}`}
                    className="flex items-center gap-2 bg-stone-100 px-3 py-1 rounded-full"
                  >
                    <span className="text-stone-600 text-sm">
                      {priceOption.size}
                    </span>
                    <span className="text-red-800 font-medium text-sm">
                      {priceOption.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCategoryBlockwithSubsectionTitle;