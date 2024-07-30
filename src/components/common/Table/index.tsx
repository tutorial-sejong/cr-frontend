import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import TableHead from './TableHead';
import {CourseTypes, TableHeadTypes} from '@assets/types/tableType';

interface TableProps {
  colData: TableHeadTypes[];
  data: CourseTypes[];
  width: string;
  height: string;
}

function Table({data, colData, width, height}: TableProps) {
  const tableRef = useRef<HTMLTableElement>(null);
  const [columnWidths, setColumnWidths] = useState<number[]>([]);
  const [filters, setFilters] = useState<string[][]>(
    colData.map(col => {
      const uniqueOptions = Array.from(
        new Set(data?.map(row => row[col.name as keyof CourseTypes])),
      ).filter(option => option !== null) as string[];
      return uniqueOptions.length === 0 ? ['빈값'] : uniqueOptions.sort();
    }),
  );

  useEffect(() => {
    if (tableRef.current) {
      const initialWidths = Array.from(
        tableRef.current.querySelectorAll('th'),
      ).map(th => th.getBoundingClientRect().width);
      setColumnWidths(initialWidths);
    }
  }, [tableRef]);

  const handleMouseDown = (index: number) => (event: React.MouseEvent) => {
    const startX = event.clientX;
    const startWidth = columnWidths[index];

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      setColumnWidths(prevWidths =>
        prevWidths.map((width, i) => (i === index ? newWidth : width)),
      );
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const getOptions = colData.map(col => {
    const uniqueOptions = Array.from(
      new Set(data?.map(row => row[col.name as keyof CourseTypes])),
    ).filter(option => option !== null) as string[];
    return uniqueOptions.length === 0 ? ['빈값'] : uniqueOptions.sort();
  });

  const handleFilterChange = (index: number, selectedOptions: string[]) => {
    setFilters(prevFilters => {
      const newFilters = [...prevFilters];
      newFilters[index] = selectedOptions;
      return newFilters;
    });
  };

  const filteredData = data?.filter(row =>
    colData.every(
      (col, index) =>
        filters[index].includes('빈값') ||
        filters[index].includes(row[col.name as keyof CourseTypes] ?? ''),
    ),
  );

  return (
    <TableContainer>
      <TableTitleWrap>
        <TableTitle>개설강좌</TableTitle>
      </TableTitleWrap>
      <TableBox width={width} height={height}>
        <TableWrap ref={tableRef}>
          <colgroup>
            <col style={{width: 'auto'}} />
            {colData.map((item, index) => (
              <col
                key={index}
                style={{
                  minWidth: item.initialWidth ? item.initialWidth : 'auto',
                }}
              />
            ))}
          </colgroup>
          <thead>
            <RowWrap>
              <th style={{minWidth: columnWidths[0]}}>순번</th>
              {colData.map((item, index) => (
                <TableHead
                  key={index}
                  label={item.value}
                  width={columnWidths[index + 1]}
                  index={index}
                  options={getOptions[index]}
                  selectedOptions={filters[index]}
                  onFilterChange={handleFilterChange}
                  handleMouseDown={handleMouseDown}
                />
              ))}
            </RowWrap>
          </thead>
          <tbody>
            {filteredData?.map((row, rowIdx) => (
              <ContentWrap key={rowIdx} $isEven={rowIdx % 2 !== 0}>
                <IndexWrap>{rowIdx + 1}</IndexWrap>
                {colData.map((col, colIdx) => (
                  <td key={colIdx}>{row[col.name as keyof CourseTypes]}</td>
                ))}
              </ContentWrap>
            ))}
          </tbody>
        </TableWrap>
      </TableBox>
    </TableContainer>
  );
}

const TableContainer = styled.div``;

const TableTitleWrap = styled.div`
  margin-bottom: 1rem;
`;

const TableTitle = styled.div`
  ${props => props.theme.texts.subtitle};
  border-left: 4px solid ${props => props.theme.colors.primary};
  padding-left: 0.5rem;
`;

const TableBox = styled.div<{width: string; height: string}>`
  width: ${props => props.width};
  height: ${props => props.height};
  overflow: scroll;
  border-left: 1px solid #c3c3c3;
  border-bottom: 1px solid #c3c3c3;
  border-top: 1px solid ${props => props.theme.colors.black};
`;

const TableWrap = styled.table`
  ${props => props.theme.texts.content};
  white-space: nowrap;
  border-collapse: collapse;

  > thead > tr > th {
    ${props => props.theme.texts.tableTitle};
    position: relative;
    background-color: ${props => props.theme.colors.neutral5};
  }
`;

const RowWrap = styled.tr`
  height: 3rem;
  > th,
  td {
    border: 1px solid #c3c3c3;
    border-left: none;
    padding: 0 0.5rem;
    vertical-align: middle;
  }
`;

const IndexWrap = styled.td`
  background-color: ${props => props.theme.colors.blue};
  text-align: center;
`;

const ContentWrap = styled(RowWrap)<{$isEven: boolean}>`
  background-color: ${props =>
    props.$isEven ? 'rgb(252, 252, 252)' : props.theme.colors.white};
  text-align: center;
  &:hover {
    background-color: rgb(250, 235, 238);
  }

  &:focus {
    background-color: rgb(252, 248, 227);
  }
`;

export default Table;
