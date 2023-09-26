import { SignInButton } from '../SigninButton';
import styles from './styles.module.scss'
import { ActiveLink } from '../ActiveLink';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/ig.news.svg" alt="ig.news" />
        <nav>
          <ActiveLink href="/" 
            activeClassName={styles.active}
          >
            <a >Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" 
            prefetch
            activeClassName={styles.active}
          >
            <a >Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}