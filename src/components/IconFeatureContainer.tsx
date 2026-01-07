import SmartImage from "./SmartImage";

interface IconFeatureBlockProps {
  icon?: string;
  title?: string;
  description?: string;
}

interface IconFeatureContainerProps {
  decorativeIcon?: string;
  decorativeIconAlt?: string;
  features?: IconFeatureBlockProps[];
  className?: string;
}

const IconFeatureBlock: React.FC<IconFeatureBlockProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      {icon && (
        <div className="mb-4 w-16 h-16 flex items-center justify-center">
          <SmartImage
            src={icon}
            alt={title || "Feature icon"}
            className="w-12 h-12 object-contain"
          />
        </div>
      )}
      {title && (
        <h3 className="text-lg font-semibold text-stone-800 mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-stone-600 text-sm leading-relaxed">{description}</p>
      )}
    </div>
  );
};

const IconFeatureContainer: React.FC<IconFeatureContainerProps> = ({
  decorativeIcon,
  decorativeIconAlt = "Decorative icon",
  features,
  className,
}) => {
  return (
    <section
      className={`comp-lyph3irr-container relative bg-stone-50 py-16 px-4 md:px-8 lg:px-16 ${className || ""}`}
    >
      {decorativeIcon && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 opacity-10">
          <SmartImage
            src={decorativeIcon}
            alt={decorativeIconAlt}
            className="w-24 h-24 md:w-32 md:h-32 object-contain"
          />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto">
        {features && features.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <IconFeatureBlock
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-800/20 to-transparent" />
    </section>
  );
};

export default IconFeatureContainer;