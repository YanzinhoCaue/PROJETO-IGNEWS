import { FaGithub } from 'react-icons/fa'
import styles from './styles.module.scss'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react';


export function SignInButton() {
  const { data: session }= useSession();
  return session ? (
    <button 
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub />
      {session.user?.name}
      <FiX className={styles.closeIcon}/>
    </button>
  ) : (
    <button 
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub />
      Sign in with Github
    </button>
  );
}