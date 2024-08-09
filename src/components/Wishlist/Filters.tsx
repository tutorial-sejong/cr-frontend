import {useState} from 'react';
import styled from 'styled-components';
import SelectBox from '@components/common/SelectBox';
import FilterInput from '@components/common/FilterInput';
import {getCourseList} from '@/apis/api/course';
import {CourseTypes} from '@/assets/types/tableType';
import {openModalHandler} from '../common/Modal/handlers/handler';
import {useDispatch} from 'react-redux';
import {setField, setType} from '@/store/modules/errorSlice';

const searchOptions = [
  {id: 0, value: '학수번호 검색'},
  {id: 1, value: '교과목명 검색'},
  {id: 2, value: '강의교수 검색'},
];

interface SearchParams {
  searchType: string;
  curiNo: string;
  classNo: string;
  curiNm: string;
  lesnEmp: string;
}

interface FilterParams {
  curiNo?: string;
  classNo?: string;
  curiNm?: string;
  lesnEmp?: string;
}

interface FiltersProps {
  setSearchResults: React.Dispatch<React.SetStateAction<CourseTypes[]>>;
}

function Filters({setSearchResults}: FiltersProps) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState({
    searchType: '학수번호 검색',
    curiNo: '',
    classNo: '',
    curiNm: '',
    lesnEmp: '',
  });

  const setError = (option: string) => {
    openModalHandler(dispatch, 'fail');
    dispatch(setType(422));
    dispatch(setField(option));
  };

  const handleSearch = async () => {
    const filter: FilterParams = {};
    switch (searchParams.searchType) {
      case '학수번호 검색':
        if (!searchParams.curiNo || searchParams.curiNo.length < 2) {
          setError('학수번호');
          return;
        } else {
          // filter.curiNm = searchParams.curiNm;
          filter.curiNo = searchParams.curiNo;
        }
        if (!searchParams.classNo || searchParams.classNo.length < 2) {
          setError('분반');
          return;
        } else {
          filter.classNo = searchParams.classNo;
        }
        break;
      case '교과목명 검색':
        if (!searchParams.curiNm || searchParams.curiNm.length < 2) {
          setError('교과목명');
          return;
        } else {
          filter.curiNm = searchParams.curiNm;
        }
        break;
      case '강의교수 검색':
        if (!searchParams.lesnEmp || searchParams.lesnEmp.length < 2) {
          setError('강의교수');
          return;
        } else {
          filter.lesnEmp = searchParams.lesnEmp;
        }
        break;
    }

    try {
      const data = await getCourseList(filter);
      setSearchResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      setSearchResults([]);
    }
  };

  const handleInputChange = (name: keyof SearchParams, value: string) => {
    setSearchParams(prev => ({...prev, [name]: value}));
  };

  const renderSearchForm = () => {
    switch (searchParams.searchType) {
      case '학수번호 검색':
        return (
          <>
            <FilterWrap>
              <span>학수번호</span>
              <FilterInput
                sizes='m'
                onChange={value => handleInputChange('curiNo', value)}
              />
            </FilterWrap>
            <FilterWrap>
              <span>분반</span>
              <FilterInput
                sizes='s'
                onChange={value => handleInputChange('classNo', value)}
              />
            </FilterWrap>
          </>
        );
      case '교과목명 검색':
        return (
          <FilterWrap>
            <span>교과목명</span>
            <FilterInput
              sizes='l'
              onChange={value => handleInputChange('curiNm', value)}
            />
          </FilterWrap>
        );
      case '강의교수 검색':
        return (
          <FilterWrap>
            <span>교수명</span>
            <FilterInput
              sizes='l'
              onChange={value => handleInputChange('lesnEmp', value)}
            />
          </FilterWrap>
        );
      default:
        return null;
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
              onSelect={() => {}}
            />
          </FilterWrap>
          <FilterWrap>
            <span>년도/학기</span>
            <SelectBox
              options={[{id: 0, value: '2024/2학기'}]}
              disabled={true}
              sizes='m'
              onSelect={() => {}}
            />
          </FilterWrap>
          <FilterBreak />
          <FilterWrap>
            <span>검색구분</span>
            <SelectBox
              options={searchOptions}
              sizes='s'
              onSelect={value => handleInputChange('searchType', value || '')}
            />
          </FilterWrap>
          {renderSearchForm()}
        </FilterBox>
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </FilterArea>
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

const FilterBreak = styled.div`
  flex-basis: 100%;
  height: 0;
`;

const FilterWrap = styled.div`
  ${props => props.theme.texts.tableTitle};
  display: flex;
  align-items: center;
  > span {
    display: inline-block;
    margin-right: 1rem;
    text-align: right;
    min-width: 4.5rem;
  }
`;

const SearchButton = styled.button`
  ${props => props.theme.texts.content};
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  min-width: 6.5rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  border: none;
  cursor: pointer;
`;

export default Filters;
