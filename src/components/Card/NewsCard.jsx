/* eslint-disable react/prop-types */
import styles from './Card.module.css';
import placeholder from '../../assets/images/newsnull.jpg';

const NewsCard = ({ article }) => {
  const { source, author, title, description, urlToImage, publishedAt, url } = article;

  const imageUrl = urlToImage || placeholder;

  const handleCardClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div className={styles.cardContainer} onClick={handleCardClick}>
      <div className={styles.img}>
        <img src={imageUrl} alt="News Image" className={styles.logo} />
      </div>
      <div className={styles.newsProvider}>{source}</div>
      <div className={styles.headline}>{title}</div>
      <div className={styles.desc}>{description}</div>
      <div className={styles.auth}>{author}</div>
      <div className={styles.date}>{new Date(publishedAt).toLocaleDateString()}</div>
    </div>
  );
};

export default NewsCard;