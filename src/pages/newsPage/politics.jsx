import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewsCard from '../../components/Card/NewsCard';
import styles from './styles/newsPage.module.css';
import Footer from '../../components/footer/footer';
import NavigationBar from '../../components/navBar/navBar';
import { fetchNews, selectNews, selectIsLoading, selectIsError, selectErrorMessage } from '../../features/newsSlice';
import { CircularProgress, Pagination } from '@mui/material';

const Politics = () => {
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
	const accessToken = useSelector((state) => state.auth.user.access);

	useEffect(() => {
		const category = 'technology';
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
							paddingTop: '15%',
							flexDirection: 'row',
						}}>
						<div style={{ backgroundColor: '#63a7ff', height: '20px', width: '140px' }}></div>
						<div style={{ backgroundColor: '#000', height: '1px', width: '90%' }}></div>
					</div>
					<div>
						<h3 style={{ color: 'black', fontSize: '4rem', fontFamily: 'inter' }}>TECHNOLOGY</h3>
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
					<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
						<Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Politics;
