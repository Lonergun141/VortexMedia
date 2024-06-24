import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import styles from './savednews.module.css';
import NavigationBar from '../../components/navBar/navBar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import placeholder from '../../assets/images/newsnull.jpg';

const SavedNewsList = () => {
    const [savedArticles, setSavedArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [note, setNote] = useState('');
    const [isLoadingAction, setIsLoadingAction] = useState(false);

    const accessToken = useSelector((state) => (state.auth.user ? state.auth.user.access : null));
    const userId = useSelector((state) => (state.auth.user ? state.auth.user.id : null));

    useEffect(() => {
        const fetchSavedArticles = async () => {
            try {
                const response = await axios.get('https://d4ngk.pythonanywhere.com/api/saved-news/list', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setSavedArticles(response.data.reverse()); 
            } catch (error) {
                console.error('Error fetching saved articles:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (accessToken) {
            fetchSavedArticles();
        } else {
            setIsLoading(false);
        }
    }, [accessToken]);

    const handleEditNote = (article) => {
        setSelectedArticle(article);
        setNote(article.user_note);
        setIsModalOpen(true);
    };

    const handleDeleteArticle = async (articleId) => {
        setIsLoadingAction(true);
        try {
            const response = await axios.delete(`https://d4ngk.pythonanywhere.com/api/saved-news/${articleId}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.status === 204) {
                setSavedArticles(savedArticles.filter((article) => article.id !== articleId));
            }
        } catch (error) {
            console.error('Error deleting article:', error);
        } finally {
            setIsLoadingAction(false);
            handleClose();
        }
    };

    const handleClose = () => {
        setSelectedArticle(null);
        setNote('');
        setIsModalOpen(false);
    };

    const handleSaveNote = async () => {
        setIsLoadingAction(true);

        try {
            const requestData = {
                ...selectedArticle,
                user_note: note,
            };

            const response = await axios.put(
                `https://d4ngk.pythonanywhere.com/api/saved-news/${selectedArticle.id}/`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                setSavedArticles(
                    savedArticles.map((article) => (article.id === selectedArticle.id ? { ...article, user_note: note } : article))
                );
                handleClose();
            }
        } catch (error) {
            console.error('Error updating note:', error);
        } finally {
            setIsLoadingAction(false);
        }
    };

    const handleBookmarkClick = (event, article) => {
        event.stopPropagation();
        setSelectedArticle(article);
        setNote(article.user_note || '');
        setIsModalOpen(true);
    };

    const handleSaveNews = async () => {
        setIsLoadingAction(true);

        const requestData = {
            title: selectedArticle.title,
            description: selectedArticle.description,
            url: selectedArticle.url,
            image_url: selectedArticle.image_url || placeholder,
            user_note: note,
            user: userId,
        };

        try {
            const response = await axios.post('https://d4ngk.pythonanywhere.com/api/saved-news/', requestData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 201) {
                setSavedArticles([response.data, ...savedArticles]); 
                handleClose();
            }
        } catch (error) {
            console.error('Error saving article:', error);
        } finally {
            setIsLoadingAction(false);
        }
    };

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <CircularProgress />
            </div>
        );
    }

    if (!accessToken) {
        return <p>Please log in to view your saved news.</p>;
    }

    return (
        <div className={styles.savedNewsListContainer}>
            <NavigationBar />

            <div className={styles.sectionDivider}>
                <div className={styles.blueBar}></div>
                <div className={styles.blackBar}></div>
            </div>
            <div>
                <h3 style={{fontSize:'40px'}}>Saved News</h3>
            </div>
            <div className={styles.newsContainer}>
                {savedArticles.length === 0 ? (
                    <p>No saved news articles found.</p>
                ) : (
                    savedArticles.map((article) => (
                        <div key={article.id} className={styles.cardContainer}>
                            <div className={styles.img}>
                                {article.user_note && (
                                    <div className={styles.noteContainer}>
                                        <h2 className={styles.noteTitle}>Note:</h2>
                                        <p className={styles.noteText}>{article.user_note}</p>
                                    </div>
                                )}
                                <img src={article.image_url || placeholder} alt="News" className={styles.image} />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.source}>
                                    <p>{article.source}</p>
                                </div>
                                <div className={styles.title}>
                                    <a href={article.url} target="_blank" className={styles.titleLink}>
                                        <p>{article.title}</p>
                                    </a>
                                </div>
                                <div className={styles.description}>
                                    <p>{article.description}</p>
                                </div>
                                <div className={styles.actions}>
                                    <BookmarkIcon className={styles.bookmarkIcon} onClick={(e) => handleBookmarkClick(e, article)} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Modal open={isModalOpen} onClose={handleClose} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Box className={styles.modalBox}>
                    <h2 style={{ color: 'black' }}>{selectedArticle ? 'Edit Note' : 'Save News'}</h2>
                    <TextField
                        label="Note"
                        multiline
                        rows={2}
                        variant="outlined"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        fullWidth
                        className={styles.modalTextField}
                    />

                    <div className={styles.buttonContainer}>
                        <button className={`${styles.button} ${styles.cancelButton}`} onClick={handleClose}>
                            Cancel
                        </button>
                        {selectedArticle && (
                            <button
                                className={`${styles.button} ${styles.removeButton}`}
                                onClick={() => handleDeleteArticle(selectedArticle.id)}
                                disabled={isLoadingAction}>
                                Delete Article
                            </button>
                        )}
                        <button
                            className={`${styles.button} ${styles.saveButton}`}
                            onClick={() => {
                                if (selectedArticle) {
                                    handleSaveNote();
                                } else {
                                    handleSaveNews();
                                }
                            }}
                            disabled={isLoadingAction}>
                            {selectedArticle ? 'Save Changes' : 'Save'}
                        </button>
                    </div>
                    {isLoadingAction && (
                        <div className={styles.loadingContainer}>
                            <CircularProgress />
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default SavedNewsList;
