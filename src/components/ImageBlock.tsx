import SmartImage from "./SmartImage";

interface ImageBlockProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  aspectRatio?: string;
  priority?: boolean;
}

const ImageBlock: React.FC<ImageBlockProps> = ({
  src,
  alt,
  width,
  height,
  className,
  containerClassName,
  objectFit = "cover",
  aspectRatio,
  priority = false,
}) => {
  return (
    <div
      className={`wixui-image h1DYhE relative overflow-hidden ${containerClassName || ""}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <div className="JdNFxG lyNaha wow-image w-full h-full">
        <SmartImage
          src={src}
          alt={alt || "Image"}
          width={width}
          height={height}
          className={`w-full h-full ${className || ""}`}
          style={{ objectFit }}
          priority={priority}
        />
      </div>
    </div>
  );
};

export default ImageBlock;