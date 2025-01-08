import {TableTitle, TableTitleWrap} from '../LectureList';
import styled from 'styled-components';
import SelectBox from '../common/SelectBox';
import {major} from '@/assets/data/filter';
import {useAppSelector} from '@/store/hooks';
import {useDispatch} from 'react-redux';
import {setSelectedDate, setUserMajor} from '@/store/modules/dateModeSlice';

interface RegisterInfoProps {
  onClickNext: () => void;
}

function RegisterInfo({onClickNext}: RegisterInfoProps) {
  const userMajor = useAppSelector(state => state.dateMode.userMajor);
  const selectedDate = useAppSelector(state => state.dateMode.selectedDate);
  const dispatch = useDispatch();

  const handleSelectMajor = (value: string | undefined) => {
    dispatch(setUserMajor(value!));
    if (value === '-전체-') {
      dispatch(setSelectedDate('전체학년 (학과 제한 없음)'));
    }
    console.log(userMajor);
    console.log(selectedDate);
  };

  const handleSelectDate = (value: string | undefined) => {
    dispatch(setSelectedDate(value!));
  };

  return (
    <>
      <TableTitleWrap>
        <TableTitle>안내문</TableTitle>
      </TableTitleWrap>
      <Container>
        <SubTitle>2025-1학기 수강신청 연습 안내</SubTitle>
        <p>
          <span>시간표 업데이트 일정:</span> &nbsp;1.24 (금)
        </p>
        <p>
          <span>수강신청 일정</span>
        </p>
        <p>- 1학년 수강신청: 2.17 (월) 10:00 ~ 17:00</p>
        <p>- 2학년 수강신청: 2.18 (화) 10:00 ~ 17:00</p>
        <p>- 3학년 수강신청: 2.19 (수) 10:00 ~ 17:00</p>
        <p>- 4학년 수강신청: 2.20 (목) 10:00 ~ 17:00</p>
        <p>- 전체학년 수강신청: 2.21 (금) 10:00 ~ 17:00</p>
        <p>- 수강신청 변경기간: 2. 25 (화) ~ 2.28 (금) 10:00 ~ 17:00</p> <br />
        {/* <p>
          수강신청을 위해 학사정보시스템에 로그인은 수강신청 시작(오전 10시)에
          시도하면 사용자가 많아 로그인이 느리거나 불가할 수 있음. 수강신청
          30분전(오전 9시 30분)에는 미리 로그인하여 수강시스템 접속 상태를
          점검하기를 권장함.
        </p> */}
        <p>
          <span>수강신청 연습 방법 &nbsp; ※날짜 설정 모드※</span>
        </p>
        <p>본인의 학과 선택, 수강신청 날짜 선택</p>
        <p>본인 학년 수강신청 날짜 선택 -&gt; 본인 학과의 과목만 신청 가능</p>
        <p>전체 학년 수강신청 날짜 선택 -&gt; 타과 과목도 신청 가능</p>
        <p>
          학과를 선택하지 않으면 학과 제한이 없는 전체 학년 수강신청 날짜로
          설정됩니다.
        </p>
      </Container>
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
                  {id: 0, value: '전체학년 (학과 제한 없음)'},
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

  > p {
    font-weight: normal;
    font-size: 1.4rem;
    margin-bottom: 8px;
    line-height: 1.6;

    > span {
      font-weight: bold;
      font-size: 1.4rem;
      color: #c30e2e;
    }
  }
`;

const SubTitle = styled.div`
  ${props => props.theme.texts.subtitle};
  margin-bottom: 15px;
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
