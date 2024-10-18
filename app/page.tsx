import styles from "./page.module.css";

const PHOTOS_BY_BRENT_LINK = "https://photos.brenttimmermans.com";

const Home = () => (
  <main className={styles.main}>
    <Construction />
  </main>
);

const Construction = () => (
  <div className={styles.construction}>
    <h2>
      <span>🚧</span>
      <span className={styles.copy}>Something Zot goe (👀) is coming</span>
      <span>🚧</span>
    </h2>
    <p className={styles.subtle}>
      While you&apos;re here, you can always check out some of my photo&apos;s
      over at{" "}
      <a href={PHOTOS_BY_BRENT_LINK} className={styles.link}>
        photos.brenttimmermans.com
      </a>
    </p>
  </div>
);

export default Home;
