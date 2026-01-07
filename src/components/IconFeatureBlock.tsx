import SmartImage from "./SmartImage";

interface IconFeatureBlockProps {
  iconSrc?: string;
  iconAlt?: string;
  iconWidth?: number;
  iconHeight?: number;
  title?: string;
  description?: string;
  quote?: string;
  quoteAuthor?: string;
  className?: string;
}

const IconFeatureBlock: React.FC<IconFeatureBlockProps> = ({
  iconSrc,
  iconAlt = "Feature icon",
  iconWidth = 48,
  iconHeight = 48,
  title,
  description,
  quote,
  quoteAuthor,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center text-center p-6 bg-stone-50 rounded-lg ${className}`}
    >
      {iconSrc && (
        <div className="wixui-vector-image mb-4">
          <div className="svgRoot">
            <SmartImage
              src={iconSrc}
              alt={iconAlt}
              width={iconWidth}
              height={iconHeight}
              className="text-red-800"
              style={{ preserveAspectRatio: "xMidYMid meet" }}
            />
          </div>
        </div>
      )}

      {title && (
        <h3 className="text-xl font-semibold text-stone-800 mb-3 font-serif">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-stone-600 leading-relaxed mb-4 max-w-xs">
          {description}
        </p>
      )}

      {quote && (
        <div className="wixui-rich-text mt-4">
          <blockquote className="border-l-4 border-red-800 pl-4 italic text-stone-700">
            <p className="mb-2">&ldquo;{quote}&rdquo;</p>
            {quoteAuthor && (
              <footer className="text-sm text-stone-500 font-medium">
                — {quoteAuthor}
              </footer>
            )}
          </blockquote>
        </div>
      )}
    </div>
  );
};

export default IconFeatureBlock;