import {styled} from 'styled-components';
import {WarningWrap} from '../LectureList/Filters';

function InfoContent() {
  return (
    <>
      <Container>
        <SubTitle>2025-1학기 수강신청 연습 안내</SubTitle>
        <p>
          <span>1. 관심과목 담기:</span> 1.24.(금) 16:00 ~ 1.31.(금) 16:00
        </p>
        <p>
          <span>2. 수강신청 주요일정</span>
        </p>
        <Table>
          <thead>
            <tr>
              <th>구분</th>
              <th>대상</th>
              <th>일정</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={6}>수강신청</td>
              <td>
                4학년(7~8학기 등록 예정자), <br /> 건축학 5학년, 수업연한초과자
              </td>
              <td>2.11.(화) 10:00 ~ 17:00</td>
              <Note rowSpan={4}>
                소속학부(과)의 주·복수·
                <br />
                부전공과목과 교양과목만
                <br /> 수강신청 가능
              </Note>
            </tr>
            <tr>
              <td>3학년(5~6학기 등록 예정자)</td>
              <td>2.12.(수) 10:00 ~ 17:00</td>
            </tr>
            <tr>
              <td>2학년(3~4학기 등록 예정자)</td>
              <td rowSpan={2}>2.13.(목) 10:00 ~ 17:00</td>
            </tr>
            <tr>
              <td>1학년(1~2학기 등록 예정자)</td>
            </tr>
            <tr>
              <td>전학년</td>
              <td>2.14.(금) 10:00 ~ 17:00</td>
              <Note>
                다른 학과 전공과목도 수강
                <br />
                신청 가능
              </Note>
            </tr>
            <tr>
              <td>신입생, 편입생</td>
              <td>2.28.(금) 10:00 ~ 17:00</td>
              <Note>※ 변경가능</Note>
            </tr>
            <tr>
              <td>
                수강신청과목 <br /> 확인 및 변경
              </td>
              <td>전학년</td>
              <td>3. 5.(수) ~ 3.10.(월) 10:00 ~ 17:00</td>
              <Note>
                다른 학과 전공과목도 수강
                <br />
                신청 가능
              </Note>
            </tr>
          </tbody>
        </Table>
        <br />
        <p>
          <span>3. 수강신청 연습 방법 &nbsp; ※날짜 설정 모드※</span>
        </p>
        <p>본인의 학과를 선택하고, 수강신청 날짜를 지정합니다.</p>
        <p>
          - 본인 학년 선택: 본인 소속학부(과)의 주·복수·부전공과목과 교양과목만
          수강신청 가능
        </p>
        <p>- 전학년 선택: 다른 학과 전공과목도 수강신청가능</p>
        <p>
          학과를 선택하지 않을 경우, 학과 제한이 없는 전학년 수강신청 날짜로
          자동 설정됩니다.
        </p>
        <br />
        <WarningWrap>
          <p>
            ※ 본 수강신청 연습 사이트는 학사정보시스템의 실제 수강신청과 다를 수
            있습니다. 수강 대상 및 유의사항을 반드시 확인하시고, 수강편람을
            숙지하여 주시기 바랍니다.
          </p>
        </WarningWrap>
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
    margin-bottom: 0.8rem;
    line-height: 1.6;
    letter-spacing: 0.01em;

    > span {
      font-weight: bold;
      font-size: 1.4rem;
      color: #333;
    }
  }
`;

const SubTitle = styled.div`
  ${props => props.theme.texts.subtitle};
  font-size: 1.6rem;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 70%;
  height: auto;
  max-width: 60rem;
  border-collapse: collapse;
  border: 1.6px solid #000;

  th {
    ${props => props.theme.texts.tableTitle};
    background-color: #e5e5e5;
    border: 1px solid #c3c3c3;
    padding: 0.8rem;
    text-align: center;
  }

  td {
    ${props => props.theme.texts.content};
    border: 1px solid #c3c3c3;
    padding: 0.8rem;
    text-align: center;
    vertical-align: middle;
    line-height: 1.4;
    letter-spacing: 0.01em;
    word-break: break-all;
    background-color: white;
  }
`;

const Note = styled.td`
  text-align: start !important;
`;

export default InfoContent;
