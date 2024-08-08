import {useState} from 'react';
import styled from 'styled-components';
import FilterButton from '@components/common/FilterButton';
import FilterInput from '@components/common/FilterInput';
import SelectBox from '@components/common/SelectBox';
import {completion, major, optional, term} from '@assets/data/filter';
import {CourseTypes} from '@/assets/types/tableType';

interface FiltersProps {
  onSearch: (newList: CourseTypes[]) => Promise<void>;
}

function Filters({onSearch}: FiltersProps) {
  const [filter, setFilter] = useState<CourseTypes>({});

  const handleSelect = (name: keyof CourseTypes, value: string | undefined) => {
    let dept = '';
    let colledge = '';

    if (name === 'schDeptAlias') {
      dept = value!.substring(0, value!.indexOf('【'));
      colledge = value!.substring(value!.indexOf('】') + 1);

      setFilter(prevState => ({
        ...prevState,
        schDeptAlias: dept,
        schCollegeAlias: colledge,
      }));
    } else {
      setFilter(prevState => ({
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
              disabled={true}
              sizes='m'
              onSelect={value => handleSelect('curiTypeCdNm', value)}
            />
          </FilterWrap>
          <FilterWrap>
            <span>년도/학기</span>
            <SelectBox
              options={term}
              disabled={true}
              sizes='m'
              onSelect={value => handleSelect('curiTypeCdNm', value)}
            />
          </FilterWrap>
          <FilterWrap>
            <span>이수구분</span>
            <SelectBox
              options={completion}
              sizes='m'
              onSelect={value => handleSelect('curiTypeCdNm', value)}
            />
          </FilterWrap>
          <FilterWrap>
            <span>선택영역</span>
            <SelectBox
              options={optional}
              sizes='m'
              onSelect={value => handleSelect('sltDomainCdNm', value)}
            />
          </FilterWrap>
          <FilterWrap>
            <span>학과전공</span>
            <SelectBox
              options={major}
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
        <FilterButton
          label='조회'
          filter={filter}
          onSearch={onSearch}
          searchOption='강좌조회'
        />
      </FilterArea>
      <WarningWrap>
        <p>
          ※ 교양과목(중필, 중선, 전공기초교양, 자유선택교양), 교직과목,
          ROTC과목은 개설학과전공을 대양휴머니티칼리지(또는 교양학부)로 하여
          조회하시기 바랍니다.
        </p>
      </WarningWrap>
    </FilterContainer>
  );
}

export const FilterContainer = styled.div`
  border: 0.1rem solid #714656;
  border-radius: 2px;
  padding: 0.5rem 1.5rem;
  margin-bottom: 2rem;
`;

const FilterArea = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 1rem;
`;

export const FilterBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 3rem;
`;

export const FilterWrap = styled.div`
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
