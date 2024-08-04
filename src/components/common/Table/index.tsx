import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import TableHead from './TableHead';
import {CourseTypes, TableHeadTypes} from '@assets/types/tableType';

interface TableProps {
  colData: TableHeadTypes[];
  data: CourseTypes[];
  width: string;
  height: string;
  onAction?: (
    action: string,
    scheduleId: number | undefined,
    curiNm: string | undefined,
  ) => void;
}

function Table({data, colData, width, height, onAction}: TableProps) {
  const widthRef = useRef<HTMLTableElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [tableWidth, setTableWidth] = useState(0);
  const [columnWidths, setColumnWidths] = useState<number[]>([]);
  let uniqueOptions: string[] = [];
  const [filters, setFilters] = useState<string[][]>(
    colData.map(col => {
      if (col.name !== 'action') {
        uniqueOptions = Array.from(
          new Set(data?.map(row => row[col.name as keyof CourseTypes])),
        ).filter(option => option !== null) as string[];
      }

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

    if (widthRef.current) {
      setTableWidth(widthRef.current.offsetWidth);
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
    if (col.name !== 'action') {
      uniqueOptions = Array.from(
        new Set(data?.map(row => row[col.name as keyof CourseTypes])),
      ).filter(option => option !== null) as string[];
    }
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
        filters[index].includes(
          String(
            col.name !== 'action' && (row[col.name as keyof CourseTypes] ?? ''),
          ),
        ),
    ),
  );

  const handleActionClick = (row: CourseTypes, action: string) => {
    if (onAction) {
      onAction(action, row.scheduleId, row.curiNm);
    } else {
      console.log(`${action} action for scheduleId: ${row.scheduleId}`);
    }
  };

  const renderCell = (row: CourseTypes, col: TableHeadTypes) => {
    if (col.name === 'action') {
      return (
        <ActionButton onClick={() => handleActionClick(row, col.value)}>
          {col.value}
        </ActionButton>
      );
    }
    return row[col.name as keyof CourseTypes];
  };

  return (
    <TableBox width={width} height={height} ref={widthRef}>
      <TableWrap ref={tableRef}>
        <colgroup>
          <col style={{width: 'auto'}} />
          {colData.map((item, index) => (
            <col
              key={index}
              style={{
                minWidth: item.initialWidth ? `${item.initialWidth}px` : 'auto',
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
                type={item.name}
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

        {filteredData?.length === 0 ? (
          <NoresultWrap width={tableWidth} height={height}>
            <Noresult>조회된 내역이 없습니다.</Noresult>
          </NoresultWrap>
        ) : (
          <tbody>
            {filteredData?.map((row, rowIdx) => (
              <ContentWrap key={rowIdx} $isEven={rowIdx % 2 !== 0}>
                <IndexWrap>{rowIdx + 1}</IndexWrap>
                {colData.map((col, colIdx) => (
                  <td key={colIdx}>{renderCell(row, col)}</td>
                ))}
              </ContentWrap>
            ))}
          </tbody>
        )}
      </TableWrap>
    </TableBox>
  );
}

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

const ActionButton = styled.button`
  ${props => props.theme.texts.content};
  width: 4rem;
  height: 2.4rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;

const NoresultWrap = styled.div<{width: number; height: string}>`
  width: ${props => props.width}px;
  height: calc(${props => props.height} - 5rem);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Noresult = styled.div`
  ${props => props.theme.texts.content};
  background-color: ${props => props.theme.colors.neutral6};
  border: 1px solid #c3c3c3;
  text-align: center;
  padding: 0.7rem 0;
  width: 30rem;
`;

export default Table;
