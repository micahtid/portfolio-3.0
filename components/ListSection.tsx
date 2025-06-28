import ButtonLink from "./ButtonLink";

export interface ListSectionProps<T> {
  title: string;
  items: T[];
  loading?: boolean;
  renderItem: (item: T, idx: number) => React.ReactNode;
  buttonLink?: string;
  buttonText?: string;
}

export default function ListSection<T>({ title, items, loading, renderItem, buttonLink, buttonText }: ListSectionProps<T>) {
  return (
    <section className="max-w-[1200px] w-full mx-auto px-3 py-16 max-lg:py-8">
      <h2 className="default-subheading font-bold text-left mb-8 md:mb-12">{title}</h2>
      <div className="flex flex-col gap-5">
        {loading
          ? [1, 2, 3].map((idx) => (
              <div key={idx} className="w-full py-4 px-3 border-b border-gray-200 rounded-lg mb-2">
                <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4 mb-3"></div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-4">
                    <div className="h-4 bg-gray-100 animate-pulse rounded w-24"></div>
                    <div className="h-4 bg-gray-100 animate-pulse rounded w-24"></div>
                  </div>
                  <div className="h-8 bg-gray-200 animate-pulse rounded w-16"></div>
                </div>
              </div>
            ))
          : items.map(renderItem)}
      </div>
      {buttonLink && buttonText && (
        <ButtonLink link={buttonLink} text={buttonText} className="mt-12" />
      )}
    </section>
  );
}
