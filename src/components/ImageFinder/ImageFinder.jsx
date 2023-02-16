import { useState, useEffect, useRef } from 'react';
import { Wrapper } from './ImageFinder.styled';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { Notify } from 'notiflix';
import getImages from 'api/api';

export const ImageFinder = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalPages, setTotalPages] = useState(0);
  const per_page = useRef(12);

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    setStatus('pending');
    try {
      getImages(searchValue, page, per_page.current).then(
        ({ hits, totalHits }) => {
          setImages(images => [...images, ...hits]);
          const pageCount = Math.ceil(totalHits / per_page.current);
          setTotalPages(pageCount);
          setStatus('resolved');

          if (page === 1) {
            Notify.info(`We found ${totalHits} images`);
          }

          if (page === pageCount && page > 1) {
            Notify.info(`We're sorry, but you've reached the end of search`);
            setStatus('idle');
          }
        }
      );
    } catch (error) {
      console.log(error);
      Notify.failure('Sorry, try again');
      setStatus('rejected');
    }
  }, [searchValue, page]);

  const onSearchClick = value => {
    if (value === '') {
      Notify.info('Please, write a request');
      return;
    }
    if (value !== searchValue) {
      setSearchValue(value);
      setImages([]);
      setPage(1);
    }
  };

  const onLoadMoreClick = () => setPage(page => page + 1);
  return (
    <Wrapper>
      <SearchBar onSubmitForm={onSearchClick} />
      <ImageGallery images={images} />
      {status === 'resolved' && totalPages > 1 && (
        <Button onClick={onLoadMoreClick} />
      )}
      {status === 'pending' && <Loader />}
    </Wrapper>
  );
};
