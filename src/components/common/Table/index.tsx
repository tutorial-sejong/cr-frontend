import {useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import {VariableSizeGrid as Grid} from 'react-window';
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
    schDeptAlias: string | undefined,
    curiTypeCdNm: string | undefined,
  ) => void;
}

function Table({data, colData, width, height, onAction}: TableProps) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [tableWidth, setTableWidth] = useState(
    tableRef.current?.offsetWidth || 1000,
  );
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
    if (!tableRef.current) return;

    const observer = new ResizeObserver(entries => {
      setTableWidth(entries[0].contentRect.width);
    });

    observer.observe(tableRef.current);

    return () => observer.disconnect();
  }, []);

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

  const filteredData = useMemo(
    () =>
      Array.isArray(data)
        ? data?.filter(row =>
            colData.every(
              (col, index) =>
                filters[index].includes('빈값') ||
                filters[index].includes(
                  String(
                    col.name !== 'action' &&
                      (row[col.name as keyof CourseTypes] ?? ''),
                  ),
                ),
            ),
          )
        : [],
    [data, filters, colData],
  );

  const handleActionClick = (row: CourseTypes, action: string) => {
    if (onAction) {
      onAction(
        action,
        row.scheduleId,
        row.curiNm,
        row.schDeptAlias,
        row.curiTypeCdNm,
      );
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

  const getColumnWidth = (index: number) => {
    if (index === 0) return 40;
    else return colData[index - 1]?.initialWidth || 80;
  };

  const CellContent = ({
    content,
  }: {
    content: React.ReactNode | string | number | boolean;
  }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
      const checkTruncation = () => {
        if (contentRef.current) {
          const {offsetWidth, scrollWidth} = contentRef.current;
          setIsTruncated(scrollWidth > offsetWidth);
        }
      };

      checkTruncation();
      window.addEventListener('resize', checkTruncation);
      return () => window.removeEventListener('resize', checkTruncation);
    }, [content]);

    return (
      <ContentText
        ref={contentRef}
        $isTruncated={isTruncated}
        data-full-content={isTruncated ? String(content) : undefined}
      >
        {content}
      </ContentText>
    );
  };

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
  }) => {
    if (rowIndex === 0) {
      return (
        <RowWrap style={{...style, width: getColumnWidth(columnIndex)}}>
          {columnIndex === 0 ? (
            <div style={{width: '4rem'}}>순번</div>
          ) : (
            <TableHead
              label={colData[columnIndex - 1].value}
              type={colData[columnIndex - 1].name}
              width={getColumnWidth(columnIndex)}
              tableHeight={height}
              index={columnIndex - 1}
              options={getOptions[columnIndex - 1]}
              selectedOptions={filters[columnIndex - 1]}
              onFilterChange={handleFilterChange}
            />
          )}
        </RowWrap>
      );
    }
    if (filteredData.length === 0) {
      if (rowIndex === 1 && columnIndex === 0) {
        return (
          <NoresultWrap
            width={tableRef.current?.offsetWidth || tableWidth}
            height={height}
            aria-colspan={colData.length + 1}
          >
            <Noresult>조회된 내역이 없습니다.</Noresult>
          </NoresultWrap>
        );
      }
    } else {
      const row = filteredData[rowIndex - 1];
      const column = colData[columnIndex - 1];

      return (
        <ContentWrap
          $isEven={rowIndex % 2 !== 0}
          style={{...style, width: getColumnWidth(columnIndex)}}
        >
          {columnIndex === 0 ? (
            <IndexWrap>{rowIndex}</IndexWrap>
          ) : columnIndex === 1 ? (
            renderCell(row, column)
          ) : (
            <CellContent content={renderCell(row, column)} />
          )}
        </ContentWrap>
      );
    }
  };

  return (
    <TableBox width={width} height={height} ref={tableRef}>
      <Grid
        columnCount={colData.length + 1}
        columnWidth={getColumnWidth}
        rowCount={filteredData.length === 0 ? 2 : filteredData.length + 1}
        rowHeight={() => 30}
        height={tableRef.current?.offsetHeight || 500}
        width={tableWidth}
      >
        {Cell}
      </Grid>
    </TableBox>
  );
}

const TableBox = styled.div<{width: string; height: string}>`
  ${props => props.theme.texts.content};
  width: ${props => props.width};
  height: ${props => props.height};
  border-left: 1px solid #c3c3c3;
  border-bottom: 1px solid #c3c3c3;
  border-top: 1px solid ${props => props.theme.colors.black};
  white-space: nowrap;
`;

const RowWrap = styled.div`
  ${props => props.theme.texts.tableTitle};
  background-color: ${props => props.theme.colors.neutral5};
  text-align: center;
  box-shadow: 0 0 0 1px #c3c3c3;
  border-top: none;
  display: flex;
  align-items: center;
`;

const IndexWrap = styled.div`
  background-color: ${props => props.theme.colors.blue};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrap = styled.div<{$isEven: boolean}>`
  background-color: ${props =>
    props.$isEven ? 'rgb(252, 252, 252)' : props.theme.colors.white};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 0 0.5px #c3c3c3;

  &:hover {
    background-color: rgb(250, 235, 238);
  }

  &:focus {
    background-color: rgb(252, 248, 227);
  }
`;

const ContentText = styled.div<{
  $isTruncated: boolean;
}>`
  padding: 0 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${props =>
    props.$isTruncated &&
    `
    &:hover::after {
      content: attr(data-full-content);
      position: absolute;
      left: 0;
      top: 0;
      width: auto;
      height: 2.8rem;
      padding: 0 0.5rem;
      background-color: white;
      border: 1px solid #ddd;
      z-index: 1000;
      display: flex;
      align-items: center;
    }
  `}
`;

const ActionButton = styled.button`
  ${props => props.theme.texts.content};
  width: 40px;
  height: 24px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;

const NoresultWrap = styled.div<{width: number; height: string}>`
  width: ${props => props.width}px;
  height: ${props => props.height};
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${props => props.theme.device.mobile} {
    max-width: auto;
  }
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
