import { useRouter } from "next/router";
import { Toolbar } from "../../components/toolbar";
import styles from "../../styles/Feed.module.css";

export const Feed = ({ pageNumber, articles }) => {
  const router = useRouter();
  return (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        {articles.map((article, index) => (
          <div key={index} className={styles.post}>
            <h1>{article.author}</h1>
            <p className={styles.publish}>{article.publishedAt}</p>
            <p>{article.content}</p>
            {!!articles && (
              <img src={article.urlToImage} alt={`${article.urlToImage}`} />
            )}
            <a href={article.url}>More detail</a>
          </div>
        ))}
      </div>
      <div className={styles.paginator}>
        <div
          onClick={() => {
            if (pageNumber > 1) {
              router
                .push(`/feed/${pageNumber - 1}`)
                .then(() => window.scrollTo(0, 0));
            }
          }}
          className={pageNumber === 1 ? styles.disabled : styles.active}
        >
          Previous Page
        </div>
        <div>#{pageNumber}</div>
        <div
          onClick={() => {
            if (pageNumber < 3) {
              router
                .push(`/feed/${pageNumber + 1}`)
                .then(() => window.scrollTo(0, 0));
            }
          }}
          className={pageNumber === 3 ? styles.disabled : styles.active}
        >
          Next Page
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (Context) => {
  const pageNumber = Context.query.slug;

  if (!pageNumber || pageNumber < 1 || pageNumber > 3) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const apiResponse = await fetch(
    `http://newsapi.org/v2/everything?q=tesla&from=2021-03-04&sortBy=publishedAt&apiKey=e760c4a35ee0486d9892ee41f0b7deac&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEW_KEY}`,
      },
    }
  );

  const apiJson = await apiResponse.json();

  const { articles } = apiJson;

  return {
    props: {
      articles,
      pageNumber: parseInt(pageNumber),
    },
  };
};

export default Feed;
