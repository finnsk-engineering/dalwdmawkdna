import SmartImage from "./SmartImage";

interface BreadcrumbItem {
  label: string;
  href: string;
  gaEventLabel?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  currentPage: string;
}

export default function BreadcrumbNavigation({ items, currentPage }: BreadcrumbProps) {
  const handleClick = (gaEventLabel?: string) => {
    if (gaEventLabel && typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "breadcrumb_click", {
        event_label: gaEventLabel,
      });
    }
  };

  return (
    <nav aria-label="Breadcrumb" className="pt-4 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-row">
          <div className="w-full">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-stone-800">
              {items && items.length > 0 && items.map((item, index) => (
                <li key={index} className="flex items-center">
                  <a
                    href={item.href}
                    onClick={() => handleClick(item.gaEventLabel)}
                    className="text-red-800 hover:text-red-900 hover:underline transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </a>
                  <span className="mx-2 text-stone-400" aria-hidden="true">
                    /
                  </span>
                </li>
              ))}
              {currentPage && (
                <li className="flex items-center">
                  <span className="text-stone-600 font-normal" aria-current="page">
                    {currentPage}
                  </span>
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </nav>
  );
}