import React, { useEffect } from 'react';
import uuid from 'react-uuid';

import * as S from './ArticleList.styled';
import useInfiniteGetArticle from '../../../hooks/useInfiniteGetArticle';
import { modalStore } from '../../../store/modalStore';
import { scrapStore } from '../../../store/scrapStore';
import Loading from '../../common/loading/Loading';
import Modal from '../../header/modal/Modal';
import Article from '../article/Article';

const ArticleList = () => {
  const { isOpen } = modalStore();

  const { checkScrap, toggleScrap, setScrap } = scrapStore((state) => state);

  const { data, ref, isLoading, isFetchingNextPage } =
    useInfiniteGetArticle('home');

  useEffect(() => {
    setScrap();
  }, []);

  if (isLoading) return <Loading />;

  console.log(data);

  return (
    <S.ArticleListContainer>
      <h2>기사 리스트</h2>
      {data?.map((article) => {
        const isScrap = checkScrap(article._id);

        return (
          <Article
            key={uuid()}
            article={article}
            isScrap={isScrap}
            toggleScrap={toggleScrap}
          />
        );
      })}
      <S.ObseverBox ref={ref}>{isFetchingNextPage && <Loading />}</S.ObseverBox>
      {isOpen && <Modal />}
    </S.ArticleListContainer>
  );
};

export default ArticleList;
