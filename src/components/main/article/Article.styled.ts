import styled from 'styled-components';

export const ArticleContainer = styled.article`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 104px;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #fff;
`;

export const ArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ArticleHeadline = styled.h3`
  display: -webkit-box;
  width: 90%;
  height: 56px;
  font-family: 'AppleSDGothicNeoSemiBold';
  font-size: 18px;
  line-height: 28px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ArticleInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'AppleSDGothicNeoReguler';
  font-size: 13px;
  line-height: 20px;
`;

export const InfoInnerWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 70%;
`;

export const Source = styled.p`
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Reporter = styled.p`
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PubDate = styled.p`
  color: #6d6d6d;
`;
