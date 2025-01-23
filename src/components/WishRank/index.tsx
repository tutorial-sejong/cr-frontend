import {getWishRank} from '@/apis/api/course';
import {CourseTypes} from '@/assets/types/tableType';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import RankItem from './RankItem';

function WishRank() {
  const [rank, setRank] = useState<CourseTypes[]>([]);

  useEffect(() => {
    const getRank = async () => {
      const res = await getWishRank();
      if (res) {
        setRank(res);
      }
    };

    getRank();
  }, []);

  return (
    <RankContainer>
      <RankTitle>인기 관심 과목 순위</RankTitle>
      <RankBox>
        {rank.map(lect => (
          <RankItem key={lect.scheduleId} courseData={lect} />
        ))}
      </RankBox>
    </RankContainer>
  );
}

const RankContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 23rem;
`;

const RankTitle = styled.div`
  ${props => props.theme.texts.subtitle};
  margin-bottom: 1.5rem;
  padding-left: 1rem;
`;

const RankBox = styled.div`
  margin-bottom: 0.5rem;
`;

export default WishRank;
