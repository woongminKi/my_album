import Link from "next/link";
import navStyles from "../styles/Nav.module.css";

export default function Nav() {
  return (
    <nav className={navStyles.nav}>
      <ul className={navStyles.ul}>
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
