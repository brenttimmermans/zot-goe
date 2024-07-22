import styles from "./page.module.css";

const Home = () => (
  <main className={styles.main}>
    <Construction />
  </main>
);

const Construction = () => (
  <div className={styles.construction}>
    <h2>🚧 Something Zot goe (👀) is coming 🚧</h2>
    <p className={styles.subtle}>Check back later</p>
  </div>
);

export default Home;
