import {TableTitle, TableTitleWrap} from '../LectureList';
import styled from 'styled-components';
import SelectBox from '../common/SelectBox';
import {major} from '@/assets/data/filter';
import {useAppSelector} from '@/store/hooks';
import {useDispatch} from 'react-redux';
import {setSelectedDate, setUserMajor} from '@/store/modules/dateModeSlice';
import InfoContent from './InfoContent';

interface RegisterInfoProps {
  onClickNext: () => void;
}

function RegisterInfo({onClickNext}: RegisterInfoProps) {
  const userMajor = useAppSelector(state => state.dateMode.userMajor);
  const dispatch = useDispatch();

  const handleSelectMajor = (value: string | undefined) => {
    dispatch(setUserMajor(value!.split('【')[0]));
    if (value === '-전체-') {
      dispatch(setSelectedDate('전학년 (학과 제한 없음)'));
    }
  };

  const handleSelectDate = (value: string | undefined) => {
    dispatch(setSelectedDate(value!));
  };

  return (
    <>
      <TableTitleWrap>
        <TableTitle>안내문</TableTitle>
      </TableTitleWrap>
      <InfoContent />
      <Container>
        <SelectArea>
          <SelectBoxWrap>
            <SelectWrap>
              <span>학과전공</span>
              <SelectBox
                options={major}
                sizes='xl'
                onSelect={value => handleSelectMajor(value)}
              />
            </SelectWrap>
            <SelectWrap>
              <span>수강신청 날짜</span>
              <SelectBox
                options={[
                  {id: 0, value: '전학년 (학과 제한 없음)'},
                  {id: 1, value: '본인학년 (학과 제한 있음)'},
                ]}
                disabled={userMajor === '-전체-' ? true : false}
                sizes='m'
                onSelect={value => handleSelectDate(value)}
                restricted={userMajor === '-전체-'}
              />
            </SelectWrap>
          </SelectBoxWrap>
          <ButtonWrap onClick={onClickNext}>저장/NEXT</ButtonWrap>
        </SelectArea>
      </Container>
    </>
  );
}

const Container = styled.div`
  border: 0.1rem solid #714656;
  border-radius: 2px;
  padding: 1.5rem 1.5rem;
  margin-bottom: 2rem;
`;

export const SelectArea = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.7rem 3rem;

  @media ${props => props.theme.device.mobile} {
    flex-wrap: wrap;
  }
`;

export const SelectBoxWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 3rem;
`;

export const SelectWrap = styled.div`
  ${props => props.theme.texts.tableTitle};
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 0;
  align-items: center;

  > span {
    margin-right: 1rem;
    text-align: right;
    min-width: 7rem;
    flex-basis: 7rem;
  }
`;

const ButtonWrap = styled.button`
  ${props => props.theme.texts.content};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  min-width: 8rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  &:hover {
    filter: grayscale(15%);
  }
`;

export default RegisterInfo;
