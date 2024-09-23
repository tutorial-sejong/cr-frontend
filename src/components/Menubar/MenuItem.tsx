import styled from 'styled-components';
import Search from '@assets/img/search-line.svg?react';
import BookMark from '@assets/img/bookmark-3-line.svg?react';
import Study from '@assets/img/edit-line.svg?react';

interface DetailProps {
  id: number;
  type: string;
  name: string;
  isActive: boolean;
  onClick: (id: number) => void;
}

function MenuItem({id, type, name, isActive, onClick}: DetailProps) {
  return (
    <DetailWrap $isactive={isActive} onClick={() => onClick(id)}>
      {type === 'search' ? (
        <Search style={{width: '18px', height: '18px'}} />
      ) : type === 'bookmark' ? (
        <BookMark style={{width: '18px', height: '18px'}} />
      ) : (
        <Study style={{width: '18px', height: '18px'}} />
      )}
      {name}
    </DetailWrap>
  );
}

const DetailWrap = styled.button<{$isactive: boolean}>`
  ${props => props.theme.texts.tableTitle};
  width: 90%;
  height: 2.8rem;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  padding-left: 10px;
  border-radius: 5px;
  margin-top: 5px;
  background-color: ${props =>
    props.$isactive ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$isactive && props.theme.colors.white};
`;

export default MenuItem;
