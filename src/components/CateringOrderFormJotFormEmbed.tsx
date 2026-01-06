import SmartImage from "./SmartImage";

interface FormField {
  type: "text" | "tel" | "email" | "checkbox" | "textarea" | "select";
  name: string;
  label: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  validation?: string;
}

interface FormSection {
  title?: string;
  subtitle?: string;
  fields: FormField[];
}

interface CateringFormProps {
  formId: string;
  formTitle: string;
  sections: FormSection[];
  deliveryFee?: string;
  submitButtonText?: string;
}

const CateringOrderFormJotFormEmbed: React.FC<CateringFormProps> = ({
  formId,
  formTitle,
  sections,
  deliveryFee,
  submitButtonText = "Submit Order",
}) => {
  const renderField = (field: FormField, index: number) => {
    const baseInputClasses =
      "w-full px-4 py-3 bg-white border border-stone-300 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent transition-all duration-200";

    switch (field.type) {
      case "text":
      case "tel":
      case "email":
        return (
          <div key={`${field.name}-${index}`} className="form-input-wide mb-4">
            <label className="block text-stone-800 font-medium mb-2">
              {field.label}
              {field.required && <span className="text-red-800 ml-1">*</span>}
            </label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              className={baseInputClasses}
            />
          </div>
        );

      case "textarea":
        return (
          <div key={`${field.name}-${index}`} className="form-input-wide mb-4">
            <label className="block text-stone-800 font-medium mb-2">
              {field.label}
              {field.required && <span className="text-red-800 ml-1">*</span>}
            </label>
            <textarea
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              rows={4}
              className={`${baseInputClasses} resize-none`}
            />
          </div>
        );

      case "select":
        return (
          <div key={`${field.name}-${index}`} className="form-input-wide mb-4">
            <label className="block text-stone-800 font-medium mb-2">
              {field.label}
              {field.required && <span className="text-red-800 ml-1">*</span>}
            </label>
            <select
              name={field.name}
              required={field.required}
              className={`${baseInputClasses} cursor-pointer`}
            >
              {field.placeholder && (
                <option value="" disabled selected>
                  {field.placeholder}
                </option>
              )}
              {field.options &&
                field.options.map((option, optIndex) => (
                  <option key={`${option}-${optIndex}`} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
        );

      case "checkbox":
        return (
          <div key={`${field.name}-${index}`} className="form-input-wide mb-4">
            <label className="block text-stone-800 font-medium mb-3">
              {field.label}
              {field.required && <span className="text-red-800 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {field.options &&
                field.options.map((option, optIndex) => (
                  <label
                    key={`${option}-${optIndex}`}
                    className="form-checkbox-item flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      name={field.name}
                      value={option}
                      className="w-5 h-5 text-red-800 border-stone-300 rounded focus:ring-red-800 focus:ring-2 cursor-pointer"
                    />
                    <span className="text-stone-700 group-hover:text-stone-900 transition-colors">
                      {option}
                    </span>
                  </label>
                ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="form-header-group bg-red-800 px-8 py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">
              {formTitle}
            </h1>
            {deliveryFee && (
              <p className="text-red-100 text-center mt-2">
                Delivery Fee: {deliveryFee}
              </p>
            )}
          </div>

          <form className="p-8">
            <div
              id={`jotform-embed-${formId}`}
              data-form-id={formId}
              className="space-y-8"
            >
              {sections.map((section, sectionIndex) => (
                <div
                  key={`section-${sectionIndex}`}
                  className="border-b border-stone-200 pb-8 last:border-b-0 last:pb-0"
                >
                  {section.title && (
                    <h2 className="text-xl font-semibold text-stone-800 mb-2">
                      {section.title}
                    </h2>
                  )}
                  {section.subtitle && (
                    <p className="text-stone-600 mb-6">{section.subtitle}</p>
                  )}
                  <div className="space-y-4">
                    {section.fields.map((field, fieldIndex) =>
                      renderField(field, fieldIndex)
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200">
              <button
                type="submit"
                className="w-full bg-red-800 hover:bg-red-900 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2"
              >
                {submitButtonText}
              </button>
            </div>

            <p className="text-stone-500 text-sm text-center mt-4">
              By submitting this form, you agree to our catering terms and
              conditions.
            </p>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-stone-600 text-sm">
            Powered by JotForm • Form ID: {formId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CateringOrderFormJotFormEmbed;