import {useState} from 'react';
import styled from 'styled-components';
import FilterButton from '@components/common/FilterButton';
import FilterInput from '@components/common/FilterInput';
import SelectBox from '@components/common/SelectBox';
import {completion, major, optional, term} from '@assets/data/filter';

export interface LectureProps {
  schCollegeAlias?: string | undefined;
  schDeptAlias?: string | undefined;
  curiTypeCdNm?: string | undefined;
  sltDomainCdNm?: string | undefined;
  curiNm?: string | undefined;
  lesnEmp?: string | undefined;
}

function Filters() {
  const [lecture, setLecture] = useState<LectureProps>();
  const handleSelect = (
    name: keyof LectureProps,
    value: string | undefined,
  ) => {
    let dept = '';
    let colledge = '';

    if (name === 'schDeptAlias') {
      dept = value!.substring(0, value!.indexOf('【'));
      colledge = value!.substring(value!.indexOf('】') + 1);

      setLecture(prevState => ({
        ...prevState,
        schDeptAlias: dept,
        schCollegeAlias: colledge,
      }));
    } else {
      setLecture(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <FilterContainer>
      <FilterArea>
        <FilterBox>
          <FilterWrap>
            <span>조직분류</span>
            <SelectBox
              options={[{id: 0, value: '학부'}]}
              tagged={true}
              disabled={true}
              sizes='m'
              onSelect={value => handleSelect('curiTypeCdNm', value)}
            />
          </FilterWrap>
          <FilterWrap>
            <span>년도/학기</span>
            <SelectBox
              options={term}
              tagged={true}
              disabled={true}
              sizes='m'
              onSelect={value => handleSelect('curiTypeCdNm', value)}
            />
          </FilterWrap>
          <FilterWrap>
            <span>이수구분</span>
            <SelectBox
              options={completion}
              tagged={false}
              sizes='m'
              onSelect={value => handleSelect('curiTypeCdNm', value)}
            />
          </FilterWrap>
          <FilterWrap>
            <span>선택영역</span>
            <SelectBox
              options={optional}
              tagged={false}
              sizes='m'
              onSelect={value => handleSelect('sltDomainCdNm', value)}
            />
          </FilterWrap>
          <FilterWrap>
            <span>학과전공</span>
            <SelectBox
              options={major}
              tagged={false}
              sizes='xl'
              onSelect={value => handleSelect('schDeptAlias', value)}
            />
          </FilterWrap>
          <FilterWrap>
            <span>교과목명</span>
            <FilterInput
              sizes='m'
              onChange={value => handleSelect('curiNm', value)}
            />
          </FilterWrap>
          <FilterWrap>
            <span>교수명</span>
            <FilterInput
              sizes='m'
              onChange={value => handleSelect('lesnEmp', value)}
            />
          </FilterWrap>
        </FilterBox>
        <FilterButton label='조회' lecture={lecture} />
      </FilterArea>
      <WarningWrap>
        <p>
          ※ 교양과목(중필, 중선, 전공기초교양, 자유선택교양), 교직과목,
          ROTC과목은 개설학과전공을 대양휴머니티칼리지(또는 교양학부)로 하여
          조회하시기 바랍니다.
        </p>
        <p>
          ※ 과목에 대한 문의는 개설학과가 아닌 주관학과에 문의하시기 바라며,
          영어과목에 대한 문의는 교양영어실로 문의하시기 바랍니다.
        </p>
      </WarningWrap>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  border: 0.1rem solid #714656;
  border-radius: 2px;
  padding: 0.5rem 1.5rem;
  margin-bottom: 2rem;
`;

const FilterBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 3rem;
`;

const FilterArea = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 1rem;
`;

const FilterWrap = styled.div`
  ${props => props.theme.texts.tableTitle};
  > span {
    display: inline-block;
    margin-right: 1rem;
    text-align: right;
    min-width: 4.5rem;
  }
`;

const WarningWrap = styled.div`
  ${props => props.theme.texts.warning};
  color: #c30e2e;
  margin-bottom: -1.5rem;

  > p {
    margin-bottom: 1.5rem;
  }
`;

export default Filters;
