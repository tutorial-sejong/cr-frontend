import {useState} from 'react';
import {styled} from 'styled-components';
import TimetableBody from './TimetableBody';

interface WishlistData {
  curiNm: string | undefined;
  lesnTime: string | undefined;
}

export interface Schedule {
  subject: string;
  start: number;
  end: number;
  overlaps?: string[];
  showSubject?: boolean;
  hasPartialOverlap?: boolean;
  isEarlierOverlap?: boolean;
}

function WishTimetable({wishlistData}: {wishlistData: WishlistData[]}) {
  const days = ['월', '화', '수', '목', '금'];
  const [hoveredSubjects, setHoveredSubjects] = useState<string[]>([]);
  const [hoveredPosition, setHoveredPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const timetable: Schedule[][] = Array.from({length: days.length}, () => []);

  wishlistData.forEach(data => {
    const timeInfo = data.lesnTime?.split(' ');
    if (!timeInfo) return;

    const times = timeInfo.filter(segment => segment.includes('~'));
    const daysList = timeInfo.filter(segment => !segment.includes('~'));

    daysList.forEach(day => {
      times.forEach(timeRange => {
        const [start, end] = timeRange.split('~');
        const dayIndex = days.indexOf(day);

        const [startHour, startMinute] = start.split(':').map(Number);
        const [endHour, endMinute] = end.split(':').map(Number);

        const startIndex = (startHour - 8) * 2 + (startMinute === 30 ? 1 : 0);
        const endIndex = (endHour - 8) * 2 + (endMinute === 30 ? 1 : 0);

        timetable[dayIndex].push({
          subject: data.curiNm || '',
          start: startIndex,
          end: endIndex,
        });
      });
    });
  });

  const sortSchedules = (
    schedules: {subject: string; start: number; end: number}[],
  ) => {
    return schedules.sort((a, b) => {
      if (a.start !== b.start) {
        return a.start - b.start;
      } else {
        return b.end - b.start - (a.end - a.start);
      }
    });
  };

  const groupOverlappingSchedules = (schedules: Schedule[]): Schedule[] => {
    const groups: Schedule[] = [];

    schedules.forEach(schedule => {
      const existingGroup = groups.find(
        group => group.start === schedule.start && group.end === schedule.end,
      );

      if (existingGroup) {
        existingGroup.overlaps = existingGroup.overlaps || [
          existingGroup.subject,
        ];
        existingGroup.overlaps.push(schedule.subject);
      } else {
        const partialOverlaps = groups.filter(
          group => group.start === schedule.start && group.end !== schedule.end,
        );

        if (partialOverlaps.length > 0) {
          const allOverlaps = [...partialOverlaps, schedule].sort(
            (a, b) => a.end - b.end,
          );

          allOverlaps.forEach((overlap, index) => {
            overlap.showSubject = index === 0;
            overlap.hasPartialOverlap = true;
            overlap.isEarlierOverlap = index < allOverlaps.length - 1;
          });
        }

        groups.push({...schedule, overlaps: [schedule.subject]});
      }
    });

    return groups;
  };

  timetable.forEach((daySchedule, index) => {
    const sortedSchedules = sortSchedules(daySchedule);
    timetable[index] = groupOverlappingSchedules(sortedSchedules);
  });

  return (
    <GridContainer>
      <GridHeader>
        <p>구분</p>
        {days.map(day => (
          <p key={day}>{day}</p>
        ))}
      </GridHeader>
      <GridBody>
        <TimetableBody
          days={days}
          timetable={timetable}
          setHoveredSubjects={setHoveredSubjects}
          setHoveredPosition={setHoveredPosition}
        />
      </GridBody>
      {hoveredSubjects.length > 0 && hoveredPosition && (
        <Tooltip style={{top: hoveredPosition.y + 30, left: hoveredPosition.x}}>
          {hoveredSubjects.map((subject, index) => (
            <p key={index}>{subject}</p>
          ))}
        </Tooltip>
      )}
    </GridContainer>
  );
}

const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 90rem;
  max-width: 80rem;
  border-collapse: collapse;
  border: 1.6px solid #000;
  display: grid;
  grid-template-columns: 100px repeat(5, 1fr);
  grid-template-rows: repeat(28, 1fr);
  border: 1px solid #000;
`;

const GridHeader = styled.div`
  display: contents;

  p {
    ${props => props.theme.texts.tableTitle};
    text-align: center;
    font-weight: bold;
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #e5e5e5;
  }
`;

const GridBody = styled.div`
  display: contents;
`;

const Tooltip = styled.div`
  position: fixed;
  background: #fff;
  border: 1px solid #ccc;
  padding: 0.5rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
  max-width: 300px;
  word-wrap: break-word;
  opacity: 1;

  p {
    ${props => props.theme.texts.content};
    padding: 0.4rem;
  }
`;

export default WishTimetable;
