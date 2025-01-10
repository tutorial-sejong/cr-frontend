import styled from 'styled-components';

export const FilterContainer = styled.div`
  border: 0.1rem solid #714656;
  border-radius: 2px;
  padding: 0.5rem 1.5rem;
  margin-bottom: 2rem;
`;

export const FilterArea = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 1rem;
  gap: 0.7rem 3rem;

  @media ${props => props.theme.device.mobile} {
    flex-wrap: wrap;
  }
`;

export const FilterBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 3rem;
`;

export const FilterWrap = styled.div`
  ${props => props.theme.texts.tableTitle};
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 0;
  align-items: center;

  > span {
    margin-right: 1rem;
    text-align: right;
    min-width: 5rem;
    flex-basis: 5rem;
  }
`;
