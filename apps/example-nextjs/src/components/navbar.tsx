import { useNextPathname } from "../../../../packages/react-next-pathname-nextjs/dist/index.mjs";
import Link from "next/link";

const tabs = [
  { name: "Home", pathname: "/" },
  { name: "Slow Page", pathname: "/slow-page" },
  { name: "Very Slow Page", pathname: "/very-slow-page" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { nextPathname } = useNextPathname();

  function isActive(pathname: string) {
    return nextPathname === pathname;
  }

  return (
    <div className="border-b border-gray-200">
      <nav aria-label="Tabs" className="-mb-px flex">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.pathname}
            aria-current={isActive(tab.pathname) ? "page" : undefined}
            className={classNames(
              isActive(tab.pathname)
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
              "w-1/3 border-b-2 px-1 py-4 text-center text-sm font-medium"
            )}>
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
