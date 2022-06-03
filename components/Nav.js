import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/album">
            <a>Album</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
