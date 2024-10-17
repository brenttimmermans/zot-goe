import styles from "./page.module.css";

const PHOTOS_BY_BRENT_LINK = "https://photos.brenttimmermans.com";

const Home = () => (
  <main className={styles.main}>
    <Construction />
  </main>
);

const Construction = () => (
  <div className={styles.construction}>
    <h2>🚧 Something Zot goe (👀) is coming 🚧</h2>
    <p className={styles.subtle}>
      While you&apos;re here, you can always check out some of my photo&apos;s
      over
      <br />
      at{" "}
      <a href={PHOTOS_BY_BRENT_LINK} className={styles.link}>
        photos.brenttimmermans.com
      </a>
    </p>
  </div>
);

export default Home;
