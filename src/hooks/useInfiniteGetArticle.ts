import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { type InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

import { getArticleList } from '../api/article';
import { filterStore, type PageList } from '../store/filterStore';
import { type ArticleType } from '../types/articleType';
import { changeToQuery } from '../utils/changeToQuery';

interface UseInfiniteGetArticleReturn {
  data: ArticleType[] | undefined;
  ref: (node?: Element | null | undefined) => void;
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  scrollPosY: number;
}

const useInfiniteGetArticle = (
  currentPage: PageList,
): UseInfiniteGetArticleReturn => {
  const { headline, date, countryList } = filterStore(
    (state) => state.page[currentPage],
  );

  const [scrollPosY, setScrollPosY] = useState(0);

  const { headlineQuery, dateQuery, countryQuery } = changeToQuery({
    headline,
    date,
    countryList,
  });

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      ArticleType[],
      AxiosError,
      InfiniteData<ArticleType[]>,
      string[],
      number
    >({
      queryKey: ['infiniteArticle', headline, dateQuery, countryQuery],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await getArticleList({
          headline: headlineQuery,
          date: dateQuery,
          country: countryQuery,
          pageParam,
        });

        return res;
      },
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage !== undefined && lastPage.length > 0) {
          return lastPageParam + 1;
        }
        return undefined;
      },

      initialPageParam: 1,
      refetchOnWindowFocus: false,
      staleTime: 10 * 1000,
    });

  const { ref } = useInView({
    threshold: 0.2,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        setScrollPosY(window.scrollY);
        void fetchNextPage();
      }
    },
  });

  const result = data?.pages.flat();

  return {
    data: result,
    ref,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    scrollPosY,
  };
};

export default useInfiniteGetArticle;
