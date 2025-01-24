import {useState} from 'react';
import styled from 'styled-components';
import {CourseTypes} from '@/assets/types/tableType';
import FilterButton from '../common/FilterButton';
import FilterInput from '../common/FilterInput';
import SelectBox from '../common/SelectBox';
import {term, searchOptions} from '@assets/data/filter';
import {FilterBox, FilterContainer, FilterWrap} from '@/styles/FilterLayout';

interface FiltersProps {
  isRegistrationStarted: boolean;
  onSearch: (
    newList: CourseTypes[],
    filter: CourseTypes,
    searchOption: string,
  ) => Promise<void>;
}

function RegisterFilters({onSearch, isRegistrationStarted}: FiltersProps) {
  const [filter, setFilter] = useState<CourseTypes>({});
  const [searchOption, setSearchOption] = useState<string>('관심과목');

  const handleSelect = (name: keyof CourseTypes, value: string | undefined) => {
    setFilter(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchOptions = (name: string) => {
    const label = name.split(' ')[0];
    setSearchOption(label);
    setFilter({});
  };

  const handleInput = (value: string | undefined) => {
    switch (searchOption) {
      case '관심과목':
        setFilter({});
        break;
      case '교과목명':
        setFilter({curiNm: value});
        break;
      case '강의교수':
        setFilter({lesnEmp: value});
        break;
      case '학수번호':
        setFilter(prevState => ({...prevState, curiNo: value}));
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
      return (
        <FilterInput
          disabled={searchOption === '관심과목'}
          sizes='l'
          onChange={value => handleInput(value)}
        />
      );
    }
  };

  return (
    <RegisterFilterContainer>
      <div>
        <FilterBox>
          <FilterWrap>
            <span>조직분류</span>
            <SelectBox
              options={[{id: 0, value: '학부'}]}
              disabled={true}
              sizes='m'
              onSelect={value => handleInput(value)}
            />
          </FilterWrap>
          <FilterWrap>
            <span>년도/학기</span>
            <SelectBox
              options={term}
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
                sizes='s'
                onSelect={value => handleSearchOptions(value)}
              />
            </FilterWrap>
            <SearchWrap>
              <span>{searchOption}</span>
              <SelectBox
                options={[{id: 0, value: '학부'}]}
                disabled={true}
                sizes='s'
                onSelect={value => handleSelect('curiTypeCdNm', value)}
              />
              {renderSearchForm()}
            </SearchWrap>
          </SearchBox>
        </FilterBox>
      </div>
      <FilterButton
        label='검색'
        filter={filter}
        onSearch={onSearch}
        searchOption={searchOption}
        isRegistrationStarted={isRegistrationStarted}
        isRegister={true}
      />
    </RegisterFilterContainer>
  );
}

const RegisterFilterContainer = styled(FilterContainer)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.7rem 0;

  @media ${props => props.theme.device.mobile} {
    flex-wrap: wrap;
  }
`;

const SearchBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 3rem;
`;

const SearchWrap = styled(FilterWrap)`
  > div {
    margin-right: 0.7rem;
  }
  align-items: center;
`;

const CuriNoWrap = styled(FilterBox)`
  align-items: center;
`;

export default RegisterFilters;
