import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/round", label: "Start" },
  { href: "/history", label: "History" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
      <ul className="flex justify-around h-16 items-center">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm font-medium text-gray-700"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
