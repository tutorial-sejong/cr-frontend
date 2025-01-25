import React, {useCallback, useRef, useState} from 'react';
import {styled} from 'styled-components';
import {Schedule} from './WishTimetable';

interface TimetableBodyProps {
  days: string[];
  timetable: Schedule[][];
  setHoveredSubjects: React.Dispatch<React.SetStateAction<string[]>>;
  setHoveredPosition: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    } | null>
  >;
}

function TimetableBody({
  days,
  timetable,
  setHoveredSubjects,
  setHoveredPosition,
}: TimetableBodyProps) {
  const timeSlots = Array.from({length: 28}, (_, i) => {
    const hourStart = 8 + Math.floor(i / 2);
    const minuteStart = i % 2 === 0 ? '00' : '30';
    const hourEnd = 8 + Math.floor((i + 1) / 2);
    const minuteEnd = (i + 1) % 2 === 0 ? '00' : '30';

    return {
      start: `${hourStart}:${minuteStart}`,
      end: `${hourEnd}:${minuteEnd}`,
      label: `${hourStart}:${minuteStart} ~ ${hourEnd}:${minuteEnd}`,
    };
  });

  const subjectColorsRef = useRef<Record<string, string>>({});
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);

  const handleMouseEnter = useCallback(
    (subjects: string[], event: React.MouseEvent) => {
      setHoveredSubjects(subjects);
      setHoveredPosition({x: event.clientX, y: event.clientY});
    },
    [setHoveredPosition, setHoveredSubjects],
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredSubjects([]);
    setHoveredPosition(null);
  }, [setHoveredPosition, setHoveredSubjects]);

  const getCellColor = (subjects: string[]) => {
    const cellKey = subjects.join(',');
    const getRandomColor = () => {
      const hue = Math.floor(Math.random() * 360);
      const saturation = 70;
      const lightness = 80;

      return `${hue}, ${saturation}%, ${lightness}%`;
    };

    if (!subjectColorsRef.current[cellKey]) {
      subjectColorsRef.current[cellKey] = getRandomColor();
    }

    return subjectColorsRef.current[cellKey];
  };

  const isSlotOccupied = (dayIndex: number, rowIndex: number) => {
    return timetable[dayIndex].some(
      schedule => rowIndex >= schedule.start && rowIndex < schedule.end,
    );
  };

  return (
    <>
      {timeSlots.map((slot, rowIndex) => (
        <GridRow key={slot.start}>
          <GridTimeSlot>{slot.label}</GridTimeSlot>
          {days.map(
            (_, colIndex) =>
              !isSlotOccupied(colIndex, rowIndex) && (
                <EmptyCell
                  key={colIndex}
                  style={{
                    gridRow: `${rowIndex + 2}`,
                    gridColumn: `${colIndex + 2}`,
                  }}
                />
              ),
          )}
        </GridRow>
      ))}
      {timetable.map((daySchedule, dayIndex) =>
        daySchedule.map((schedule, scheduleIndex) => {
          const cellId = `${dayIndex}-${scheduleIndex}`;
          const isHovered = hoveredCell === cellId;
          const isRelated = hoveredSubject === schedule.subject;

          return (
            <GridCell
              key={cellId}
              style={{
                gridRow: `${schedule.start + 2} / span ${schedule.end - schedule.start}`,
                gridColumn: `${dayIndex + 2}`,
                zIndex: scheduleIndex + 1,
              }}
              $backgroundColor={getCellColor(
                schedule.overlaps || [schedule.subject],
              )}
              $isEarlierOverlap={schedule.isEarlierOverlap}
              $isHovered={isHovered}
              $isRelated={isRelated}
              onMouseEnter={e => {
                setHoveredCell(cellId);
                setHoveredSubject(schedule.subject);
                handleMouseEnter(schedule.overlaps || [schedule.subject], e);
              }}
              onMouseLeave={() => {
                setHoveredCell(null);
                setHoveredSubject(null);
                handleMouseLeave();
              }}
            >
              <p>
                {(schedule.showSubject ||
                  !schedule.hasPartialOverlap ||
                  isHovered ||
                  isRelated) &&
                  (schedule.overlaps && schedule.overlaps.length > 1
                    ? `${schedule.overlaps[0]} 외 ${schedule.overlaps.length - 1}*`
                    : schedule.subject)}
              </p>
            </GridCell>
          );
        }),
      )}
    </>
  );
}

const GridRow = styled.div`
  display: contents;
`;

const GridTimeSlot = styled.div`
  ${props => props.theme.texts.tableTitle};
  vertical-align: middle;
  text-align: center;
  padding: 1rem;
  background-color: #f0f0f0;
  border: 1px solid #e5e5e5;
  grid-column: 1;
`;

const GridCell = styled.div<{
  $backgroundColor: string;
  $isEarlierOverlap?: boolean;
  $isHovered: boolean;
  $isRelated: boolean;
}>`
  ${props => props.theme.texts.content};
  text-align: center;
  vertical-align: middle;
  position: relative;
  padding: 0.8rem;
  text-align: center;
  border: 1px solid #f0f0f0;
  cursor: pointer;
  transition:
    transform 0.3s,
    opacity 0.3s;
  background-color: ${props => `hsla(${props.$backgroundColor}, 0.6)`};
  color: #000;

  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }

  ${props =>
    props.$isEarlierOverlap &&
    `
    width: 88%;
    border-radius: 0 1.4rem 1.4rem 0;
    box-shadow: 3px 3px 6px rgba(0,0,0,0.2);
    `}

  ${props =>
    (props.$isHovered || props.$isRelated) &&
    `
    opacity: 1;
    transform: scale(1.05);
    border-radius: 0;
    z-index: 1000 !important;
    background-color: ${`hsla(${props.$backgroundColor}, 1)`};
  `}
`;

const EmptyCell = styled.div`
  border: 1px solid #f0f0f0;
`;

export default TimetableBody;
