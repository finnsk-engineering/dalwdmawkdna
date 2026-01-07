import SmartImage from "./SmartImage";

interface RichTextBlockProps {
  content?: string;
  htmlContent?: string;
  variant?: "paragraph" | "blockquote" | "heading";
  alignment?: "left" | "center" | "right";
  fontSize?: "sm" | "base" | "lg" | "xl" | "2xl";
  fontWeight?: "normal" | "medium" | "semibold" | "bold";
  lineHeight?: "tight" | "normal" | "relaxed" | "loose";
  className?: string;
  accentColor?: boolean;
}

const RichTextBlock: React.FC<RichTextBlockProps> = ({
  content,
  htmlContent,
  variant = "paragraph",
  alignment = "left",
  fontSize = "base",
  fontWeight = "normal",
  lineHeight = "relaxed",
  className = "",
  accentColor = false,
}) => {
  const alignmentClasses: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const fontSizeClasses: Record<string, string> = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  };

  const fontWeightClasses: Record<string, string> = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const lineHeightClasses: Record<string, string> = {
    tight: "leading-tight",
    normal: "leading-normal",
    relaxed: "leading-relaxed",
    loose: "leading-loose",
  };

  const baseClasses = `
    wixui-rich-text font_7
    ${alignmentClasses[alignment]}
    ${fontSizeClasses[fontSize]}
    ${fontWeightClasses[fontWeight]}
    ${lineHeightClasses[lineHeight]}
    ${accentColor ? "text-red-800" : "text-stone-800"}
    ${className}
  `.trim();

  const renderContent = () => {
    if (htmlContent) {
      return (
        <div
          className={`${baseClasses} prose prose-stone max-w-none prose-headings:text-stone-800 prose-a:text-red-800 prose-strong:text-stone-800 prose-blockquote:border-red-800 prose-blockquote:text-stone-600`}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      );
    }

    if (!content) {
      return null;
    }

    const paragraphs = content.split("\n").filter((line) => line.trim() !== "");

    if (variant === "blockquote") {
      return (
        <blockquote
          className={`${baseClasses} border-l-4 border-red-800 pl-6 py-2 italic bg-stone-100/50`}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={index > 0 ? "mt-4" : ""}>
              {paragraph}
            </p>
          ))}
        </blockquote>
      );
    }

    if (variant === "heading") {
      return (
        <h2 className={`${baseClasses} font-semibold tracking-tight`}>
          {content}
        </h2>
      );
    }

    return (
      <>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={`${baseClasses} ${index > 0 ? "mt-4" : ""}`}>
            {paragraph}
          </p>
        ))}
      </>
    );
  };

  return (
    <div className="rich-text-block bg-stone-50">
      {renderContent()}
    </div>
  );
};

export default RichTextBlock;