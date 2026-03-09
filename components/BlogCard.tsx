import Link from "next/link";

interface BlogCardProps {
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  slug: string;
  featured?: boolean;
}

export function BlogCard({
  title,
  date,
  tag,
  excerpt,
  slug,
  featured = false,
}: BlogCardProps) {
  return (
    <article
      className={`group flex flex-col rounded-btn border border-light-slate bg-white p-6 ${
        featured
          ? "border-t-4 border-t-cyan"
          : "border-t-4 border-t-white hover:border-t-mid-blue"
      }`}
    >
      <div className="flex items-center gap-3 text-xs">
        <span className="rounded-btn bg-off-white px-2 py-1 font-medium text-deep-blue">
          {tag}
        </span>
        <time dateTime={date} className="text-slate">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
        {excerpt}
      </p>
      <Link
        href={`/insights/${slug}`}
        className="mt-4 inline-block text-sm font-medium text-mid-blue transition-colors group-hover:text-deep-blue"
      >
        Read →
      </Link>
    </article>
  );
}
