import SmartImage from "./SmartImage";

interface OpeningHoursDay {
  day: string;
  hours: string;
  isClosed?: boolean;
}

interface CtaButton {
  label: string;
  href: string;
  class?: string;
}

interface OpeningHoursProps {
  title: string;
  days: OpeningHoursDay[];
  ctaButton?: CtaButton;
  additionalNote?: string;
}

export default function OpeningHoursWidget({
  title,
  days,
  ctaButton,
  additionalNote,
}: OpeningHoursProps) {
  return (
    <div className="bg-stone-50 rounded-lg p-6 md:p-8 shadow-sm">
      <h2 className="text-2xl md:text-3xl font-semibold text-stone-800 mb-6 text-center">
        {title}
      </h2>
      
      <div className="space-y-3">
        {days && days.length > 0 && days.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-stone-200 last:border-b-0"
          >
            <h4 className="text-stone-800 font-medium">{item.day}</h4>
            <span
              className={`text-sm ${
                item.isClosed
                  ? "text-red-800 font-semibold"
                  : "text-stone-600"
              }`}
            >
              {item.isClosed ? "Closed" : item.hours}
            </span>
          </div>
        ))}
      </div>

      {additionalNote && (
        <p className="mt-6 text-sm text-stone-600 text-center italic bg-stone-100 rounded-md p-3">
          {additionalNote}
        </p>
      )}

      {ctaButton && (
        <div className="mt-6 text-center">
          <a
            href={ctaButton.href}
            className={`inline-block px-6 py-3 bg-red-800 text-white font-medium rounded-md hover:bg-red-900 transition-colors duration-200 ${
              ctaButton.class || ""
            }`}
          >
            {ctaButton.label}
          </a>
        </div>
      )}
    </div>
  );
}