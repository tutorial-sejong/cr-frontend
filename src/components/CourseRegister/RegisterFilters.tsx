import {useState} from 'react';
import styled from 'styled-components';
import {CourseTypes} from '@/assets/types/tableType';
import FilterButton from '../common/FilterButton';
import FilterInput from '../common/FilterInput';
import SelectBox from '../common/SelectBox';
import {term, searchOptions} from '@assets/data/filter';
import {
  FilterBox,
  FilterContainer,
  FiltersProps,
  FilterWrap,
} from '../LectureList/Filters';

function RegisterFilters({setList}: FiltersProps) {
  const [filter, setFilter] = useState<CourseTypes>();
  const [searchOption, setSearchOption] = useState<string>('관심과목');

  const handleSelect = (name: keyof CourseTypes, value: string | undefined) => {
    if (filter?.curiNm || filter?.lesnEmp) {
      setFilter({});
    }
    setFilter(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchOptions = (name: string) => {
    const label = name.split(' ');
    setSearchOption(label[0]);
  };

  const handleInput = (value: string | undefined) => {
    switch (searchOption) {
      case '관심과목':
        setFilter({
          curiNm: 'wish',
        });
        break;
      case '교과목명':
        setFilter({
          curiNm: value,
        });
        break;
      case '강의교수':
        setFilter({lesnEmp: value});
        break;
      default:
        break;
    }
  };

  const renderSearchForm = () => {
    if (searchOption === '학수번호') {
      return (
        <CuriNoWrap>
          <FilterWrap>
            <FilterInput
              sizes='m'
              onChange={value => handleSelect('curiNo', value)}
            />
          </FilterWrap>
          <FilterWrap>
            <span>분반</span>
            <FilterInput
              sizes='s'
              onChange={value => handleSelect('classNo', value)}
            />
          </FilterWrap>
        </CuriNoWrap>
      );
    } else {
      return <FilterInput disabled={searchOption === '관심과목'} sizes='l' onChange={value => handleInput(value)} />;
    }
  };

  return (
    <RegisterFilterContainer>
      <FilterBox>
        <FilterWrap>
          <span>조직분류</span>
          <SelectBox
            options={[{id: 0, value: '학부'}]}
            tagged={true}
            disabled={true}
            sizes='m'
            onSelect={value => handleInput(value)}
          />
        </FilterWrap>
        <FilterWrap>
          <span>년도/학기</span>
          <SelectBox
            options={term}
            tagged={true}
            disabled={true}
            sizes='m'
            onSelect={value => handleInput(value)}
          />
        </FilterWrap>
        <SearchBox>
          <FilterWrap>
            <span>검색 구분</span>
            <SelectBox
              options={searchOptions}
              tagged={true}
              sizes='s'
              onSelect={value => handleSearchOptions(value)}
            />
          </FilterWrap>
          <SearchWrap>
            <span>{searchOption}</span>
            <SelectBox
              options={[{id: 0, value: '학부'}]}
              tagged={true}
              disabled={true}
              sizes='s'
              onSelect={value => handleSelect('curiTypeCdNm', value)}
            />
            {renderSearchForm()}
          </SearchWrap>
        </SearchBox>
      </FilterBox>
      <FilterButton label='검색' page='수강신청' filter={filter} setList={setList} />
    </RegisterFilterContainer>
  );
}

const RegisterFilterContainer = styled(FilterContainer)`
  display: flex;
  align-items: flex-end;
`;

const SearchBox = styled.div`
  display: flex;
  gap: 0 3rem;
`;

const SearchWrap = styled(FilterWrap)`
  > div {
    margin-right: 0.7rem;
  }
  display: flex;
  align-items: center;
`;

const CuriNoWrap = styled.div`
  display: flex;
  align-items: center;
`;

export default RegisterFilters;
