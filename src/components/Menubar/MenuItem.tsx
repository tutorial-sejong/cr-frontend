import styled from 'styled-components';
import View from '@assets/img/view.svg?react';
import Study from '@assets/img/study.svg?react';

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
      {type === 'view' ? <View /> : <Study />}
      {name}
    </DetailWrap>
  );
}

const DetailWrap = styled.button<{$isactive: boolean}>`
  ${props => props.theme.texts.tableTitle};
  width: 17.5rem;
  height: 2.8rem;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  padding-left: 10px;

  background-color: ${props =>
    props.$isactive ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$isactive && props.theme.colors.white};
`;

export default MenuItem;
