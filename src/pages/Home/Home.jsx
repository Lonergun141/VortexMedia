/* eslint-disable no-unused-vars */
import Footer from '../../components/footer/footer';
import { getNews } from '../../api/getNews';
import { useEffect, useState } from 'react';
import NewsCard from '../../components/Card/NewsCard';
import styles from './styles/Home.module.css';

const Home = () => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		const fetchNewsData = async () => {
			try {
				const newsArticles = await getNews();
				setArticles(newsArticles);
			} catch (error) {
				console.error('Error fetching news:', error);
			}
		};

		fetchNewsData();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.headlines}>
					
				</div>

				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-start',
						alignItems: 'flex-start',
						paddingTop: '3%',
						flexDirection: 'row',
					}}>
					<div style={{ backgroundColor: '#63a7ff', height: '20px', width: '140px' }}></div>
					<div style={{ backgroundColor: '#000', height: '1px', width: '90%' }}></div>
				</div>
				<div>
					<h3 style={{ color: 'black', fontSize: '4rem', fontFamily: 'inter' }}>DISCOVER</h3>
				</div>

				<div className={styles.discover}>
					{articles.map((article) => (
						<NewsCard key={article.url} article={article} />
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
