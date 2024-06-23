import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Card.module.css';
import placeholder from '../../assets/images/newsnull.jpg';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const NewsCard = ({ article }) => {
  const { source, author, title, description, urlToImage, publishedAt, url } = article;
  const imageUrl = urlToImage || placeholder;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [savedArticleId, setSavedArticleId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const accessToken = useSelector((state) => (state.auth.user ? state.auth.user.access : null));
  const userId = useSelector((state) => (state.auth.user ? state.auth.user.id : null));

  useEffect(() => {
    const fetchSavedArticles = async () => {
      if (accessToken && userId) {
        try {
          const response = await axios.get('https://d4ngk.pythonanywhere.com/api/saved-news/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const savedArticles = response.data;
          const savedArticle = savedArticles.find((saved) => saved.url === url);
          if (savedArticle) {
            setIsSaved(true);
            setSavedArticleId(savedArticle.id);
            setNote(savedArticle.user_note);
          } else {
            setIsSaved(false);
            setSavedArticleId(null);
            setNote('');
          }
        } catch (error) {
          console.error('Error fetching saved articles:', error);
        }
      }
    };

    fetchSavedArticles();
  }, [accessToken, userId, url, isSaved]);

  const handleCardClick = () => {
    window.open(url, '_blank');
  };

  const handleBookmarkClick = (event) => {
    event.stopPropagation();
    if (!accessToken) {
      alert('Please log in to save this article.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setNote('');
  };

  const handleSave = async () => {
    if (!accessToken) {
      console.error('User is not logged in');
      return;
    }

    setIsLoading(true);

    const requestData = {
      title,
      description,
      url,
      image_url: urlToImage,
      user_note: note,
      user: userId,
    };

    try {
      if (isSaved && savedArticleId) {
        const response = await axios.put(
          `https://d4ngk.pythonanywhere.com/api/saved-news/${savedArticleId}/`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.status === 200) {
          console.log('Article updated successfully:', response.data);
          setNote(note);
        }
      } else {
        const response = await axios.post('https://d4ngk.pythonanywhere.com/api/saved-news/', requestData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 201) {
          setIsSaved(true);
          setSavedArticleId(response.data.id);
          console.log('Article saved successfully:', response.data);
        }
      }
    } catch (error) {
      console.error('Error saving article:', error);
    }
    setIsLoading(false);
    handleClose();
  };

  const handleUnsave = async () => {
    if (!accessToken || !savedArticleId) {
      console.error('User is not logged in or article is not saved');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.delete(`https://d4ngk.pythonanywhere.com/api/saved-news/${savedArticleId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 204) {
        setIsSaved(false);
        setSavedArticleId(null);
        setNote('');
      }
    } catch (error) {
      console.error('Error unsaving article:', error);
    }
    setIsLoading(false);
    handleClose();
  };

  return (
    <div className={styles.cardContainer} onClick={handleCardClick}>
      <div className={styles.img}>
        {isSaved && note && (
          <div className={styles.noteHeader}>
            <h2>Notes:</h2>
            <p style={{ textAlign: 'left', marginLeft: '20px', fontWeight: '600', fontSize: '16px' }}>{note}</p>
          </div>
        )}
        <img src={imageUrl} alt="News Image" className={styles.logo} />
      </div>
      <div className={styles.newsProvider}>{source}</div>
      <div className={styles.headline}>{title}</div>
      <div className={styles.desc}>{description}</div>
      <div className={styles.auth}>{author}</div>
      <div className={styles.date}>{new Date(publishedAt).toLocaleDateString()}</div>
      <div className={styles.bookmarkContainer}>
        <BookmarkIcon
          className={styles.bookmarkIcon}
          style={{ color: isSaved ? '#63a7ff' : 'gray' }}
          onClick={handleBookmarkClick}
        />
      </div>
      <Modal open={isModalOpen} onClose={handleClose}>
        <Box className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
          <h2 style={{ color: 'black' }}>{isSaved ? 'Edit Note' : 'Save News'}</h2>
          <p style={{ color: 'black' }}>Try to put a note to your saved news</p>
          <TextField
            label="Note"
            multiline
            rows={4}
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
            {isSaved && (
              <button className={`${styles.button} ${styles.removeButton}`} onClick={handleUnsave}>
                <DeleteIcon /> Remove
              </button>
            )}
            <button 
              className={`${styles.button} ${styles.saveButton}`} 
              onClick={handleSave}
            >
              {isSaved ? 'Save Changes' : 'Save'}
            </button>
          </div>
          {isLoading && (
            <div className={styles.loadingContainer}>
              <CircularProgress />
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default NewsCard;
