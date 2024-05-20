import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Pagination } from '@mui/material';
import NewsCard from '../../components/Card/NewsCard';
import Footer from '../../components/footer/footer';
import NavigationBar from '../../components/navBar/navBar';
import { fetchNews, selectNews, selectIsLoading, selectIsError, selectErrorMessage } from '../../features/newsSlice';
import styles from './styles/newsPage.module.css';

const World = () => {
	const dispatch = useDispatch();
	const newsData = useSelector(selectNews) || {};
	const news = Array.isArray(newsData.articles) ? newsData.articles : [];
	const isLoading = useSelector(selectIsLoading);
	const isError = useSelector(selectIsError);
	const errorMessage = useSelector(selectErrorMessage);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const totalPages = Math.ceil(news.length / itemsPerPage);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);

	const accessToken = useSelector((state) => state.auth.user ? state.auth.user.access : null);


	useEffect(() => {
		const category = 'general';
		const country = 'us';

		dispatch(fetchNews({ category, country, accessToken }));
	}, [dispatch, accessToken]);

	const handlePageChange = (event, value) => {
		setCurrentPage(value);
	};

	return (
		<div>
			<NavigationBar />
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.hotnews}>
						{isLoading ? (
							<CircularProgress />
						) : isError ? (
							<p>Error: {errorMessage}</p>
						) : newsData.articles && newsData.articles.length > 0 ? (
							<>
								<div className={styles.uppernews}>
									{(() => {
										const randomIndex = Math.floor(Math.random() * newsData.articles.length);
										const randomArticle = newsData.articles[randomIndex];
										return (
											<div key={randomIndex} className={styles.newscard}>
												{randomArticle.urlToImage ? <img src={randomArticle.urlToImage} alt={randomArticle.title || ''} /> : null}
												<div className={styles.newscontent}>
													{randomArticle.source ? <p>{randomArticle.source}</p> : null}
													{randomArticle.title ? (
														<h2>
															<a href={randomArticle.url} target="_blank" rel="noopener noreferrer">
																{randomArticle.title}
															</a>
														</h2>
													) : null}
													<p>By {randomArticle.author ? randomArticle.author : 'Vortex Media'}</p>
												</div>
											</div>
										);
									})()}
								</div>
								<div className={styles.lowernews}>
									{(() => {
										const randomIndices = [];
										while (randomIndices.length < 2) {
											const index = Math.floor(Math.random() * newsData.articles.length);
											if (!randomIndices.includes(index)) {
												randomIndices.push(index);
											}
										}
										return randomIndices.map((randomIndex) => {
											const randomArticle = newsData.articles[randomIndex];
											return (
												<div key={randomIndex} className={styles.newscard}>
													{randomArticle.urlToImage ? <img src={randomArticle.urlToImage} alt={randomArticle.title || ''} /> : null}
													<div className={styles.newscontent}>
														{randomArticle.source ? <p>{randomArticle.source}</p> : null}
														{randomArticle.title ? (
															<h2>
																<a href={randomArticle.url} target="_blank" rel="noopener noreferrer">
																	{randomArticle.title}
																</a>
															</h2>
														) : null}
														<p>By {randomArticle.author ? randomArticle.author : 'Vortex Media'}</p>
													</div>
												</div>
											);
										});
									})()}
								</div>
							</>
						) : (
							<p>No news articles found.</p>
						)}
					</div>

					<div className={styles.subnews}>
						<div></div>
						<div></div>
					</div>

					<div className={styles.headlines}></div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'flex-start',
							alignItems: 'flex-start',
							paddingTop: '5%',
							flexDirection: 'row',
						}}>
						<div
							style={{
								backgroundColor: '#63a7ff',
								height: '20px',
								width: '140px',
							}}></div>
						<div style={{ backgroundColor: '#000', height: '1px', width: '90%' }}></div>
					</div>
					<div>
						<h3 style={{ color: 'black', fontSize: '4rem', fontFamily: 'inter' }}>WORLD</h3>
					</div>
					<div className={styles.discover}>
						{isLoading ? (
							<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
								<CircularProgress />
							</div>
						) : isError ? (
							<p>Error: {errorMessage}</p>
						) : currentItems.length > 0 ? (
							currentItems.map((article) => <NewsCard key={article.url} article={article} />)
						) : (
							<p>No news articles found.</p>
						)}
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							marginTop: '20px',
						}}>
						<Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default World;
