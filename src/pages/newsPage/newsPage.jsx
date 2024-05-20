import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NewsCard from '../../components/Card/NewsCard';
import { fetchSearchedNews, selectSearchedNews, selectIsLoading } from '../../features/newsSlice';
import Footer from '../../components/footer/footer';
import NavigationBar from '../../components/navBar/navBar';
import styles from './styles/newsPage.module.css';

import { CircularProgress,  } from '@mui/material';
const NewsPage = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const searchedNews = useSelector(selectSearchedNews) || [];
	const searchTerm = queryParams.get('query');
	const isLoading = useSelector(selectIsLoading);
	const dispatch = useDispatch();

	const accessToken = useSelector((state) => state.auth.user.access);

	useEffect(() => {
		const category = 'general';
		dispatch(fetchSearchedNews({ query: searchTerm, category, accessToken }));
	}, [dispatch, searchTerm, accessToken]);


	return (
		<div>
			<NavigationBar />

			<div>
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
				<h1 style={{ color: 'black', fontFamily: 'Inter' }}>Search Results for: {searchTerm}</h1>
				{isLoading ? (
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
						<CircularProgress />
					</div>
				) : searchedNews.length === 0 ? (
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
						<p style={{color:'#1C1C1C', fontSize:'2rem'}}>No results found for {searchTerm}</p>
					
					</div>
				) : (
					<div className={styles.discover}>
						{searchedNews.map((result, index) => (
							<NewsCard key={`${result.title}-${result.publishedAt}-${index}`} article={result} />
						))}
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default NewsPage;
