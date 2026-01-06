import SmartImage from "./SmartImage";

interface SocialLink {
  platform: string;
  url: string;
}

interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  socialLinks?: SocialLink[];
}

interface ColumnContent {
  type: "text" | "image" | "embed" | "form";
  html?: string;
  imageSrc?: string;
  imageAlt?: string;
  embedSrc?: string;
}

interface Column {
  width: "col-md-4" | "col-md-6" | "col-md-8" | "col-md-12";
  content: ColumnContent;
}

interface GridContentBlockFlexibleCMSContentProps {
  containerClass: string;
  heading?: string;
  headingLevel?: 1 | 2 | 3;
  headingAlignment?: "left" | "center" | "right";
  columns: Column[];
  contactInfo?: ContactInfo;
}

const getColumnWidthClass = (width: string): string => {
  const widthMap: Record<string, string> = {
    "col-md-4": "w-full md:w-1/3",
    "col-md-6": "w-full md:w-1/2",
    "col-md-8": "w-full md:w-2/3",
    "col-md-12": "w-full",
  };
  return widthMap[width] || "w-full";
};

const getAlignmentClass = (alignment?: "left" | "center" | "right"): string => {
  const alignmentMap: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  return alignment ? alignmentMap[alignment] : "text-left";
};

const renderHeading = (
  heading: string,
  level: 1 | 2 | 3 = 2,
  alignment?: "left" | "center" | "right"
): JSX.Element => {
  const alignmentClass = getAlignmentClass(alignment);
  const baseClasses = `font-serif text-stone-800 mb-6 ${alignmentClass}`;

  switch (level) {
    case 1:
      return (
        <h1 className={`${baseClasses} text-4xl md:text-5xl lg:text-6xl font-bold`}>
          {heading}
        </h1>
      );
    case 2:
      return (
        <h2 className={`${baseClasses} text-3xl md:text-4xl font-semibold`}>
          {heading}
        </h2>
      );
    case 3:
      return (
        <h3 className={`${baseClasses} text-2xl md:text-3xl font-medium`}>
          {heading}
        </h3>
      );
    default:
      return (
        <h2 className={`${baseClasses} text-3xl md:text-4xl font-semibold`}>
          {heading}
        </h2>
      );
  }
};

const renderColumnContent = (content: ColumnContent): JSX.Element | null => {
  switch (content.type) {
    case "text":
      return content.html ? (
        <div
          className="prose prose-stone max-w-none prose-headings:text-stone-800 prose-p:text-stone-700 prose-a:text-red-800 prose-a:no-underline hover:prose-a:underline prose-strong:text-stone-800"
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
      ) : null;

    case "image":
      return content.imageSrc ? (
        <div className="relative w-full overflow-hidden rounded-lg shadow-md">
          <SmartImage
            src={content.imageSrc}
            alt={content.imageAlt || "Image"}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ) : null;

    case "embed":
      return content.embedSrc ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
          <iframe
            src={content.embedSrc}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            title="Embedded content"
          />
        </div>
      ) : null;

    case "form":
      return (
        <div className="w-full bg-stone-100 rounded-lg p-6 shadow-inner">
          <div className="text-stone-600 text-center py-8">
            Form content will be loaded here
          </div>
        </div>
      );

    default:
      return null;
  }
};

const renderContactInfo = (contactInfo: ContactInfo): JSX.Element => {
  return (
    <div className="bg-stone-100 rounded-lg p-6 md:p-8 shadow-sm">
      <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-6">
        Contact Information
      </h3>

      <div className="space-y-4">
        {contactInfo.address && (
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-800 mt-1 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-stone-700">{contactInfo.address}</p>
          </div>
        )}

        {contactInfo.phone && (
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-red-800 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              className="text-red-800 hover:text-red-900 transition-colors font-medium"
            >
              {contactInfo.phone}
            </a>
          </div>
        )}

        {contactInfo.email && (
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-red-800 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-red-800 hover:text-red-900 transition-colors font-medium"
            >
              {contactInfo.email}
            </a>
          </div>
        )}

        {contactInfo.socialLinks && contactInfo.socialLinks.length > 0 && (
          <div className="pt-4 border-t border-stone-200">
            <p className="text-sm text-stone-600 mb-3">Follow Us</p>
            <div className="flex gap-4">
              {contactInfo.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-600 hover:text-red-800 transition-colors"
                  aria-label={social.platform}
                >
                  {social.platform.toLowerCase() === "facebook" && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  {social.platform.toLowerCase() === "instagram" && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  )}
                  {social.platform.toLowerCase() === "twitter" && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function GridContentBlockFlexibleCMSContent({
  containerClass,
  heading,
  headingLevel,
  headingAlignment,
  columns,
  contactInfo,
}: GridContentBlockFlexibleCMSContentProps): JSX.Element {
  const isHomepage = containerClass.includes("homecont");
  const containerPadding = isHomepage ? "py-12 md:py-20" : "py-8 md:py-12";

  return (
    <section className={`bg-stone-50 ${containerPadding}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {heading && renderHeading(heading, headingLevel, headingAlignment)}

        <div className="flex flex-wrap -mx-4">
          {columns.map((column, index) => (
            <div
              key={index}
              className={`${getColumnWidthClass(column.width)} px-4 mb-8 md:mb-0`}
            >
              {renderColumnContent(column.content)}
            </div>
          ))}
        </div>

        {contactInfo && (
          <div className="mt-8 md:mt-12">
            {renderContactInfo(contactInfo)}
          </div>
        )}
      </div>
    </section>
  );
}