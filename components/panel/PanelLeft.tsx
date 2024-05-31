'use client';
import { Divider, List, ListSubheader } from '@mui/material';

import { PanelLeftContainer } from './panelLeft.css';
import SearchInput from '../input/SearchInput';
import YearList from '../list/YearList';

import { useFetchCalendarYears } from '~/queries/calendar';

const PanelLeft = () => {
  const { data: years } = useFetchCalendarYears();

  return (
    <div className={PanelLeftContainer}>
      <div
        style={{
          display: 'flex',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#F5F5F5',
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          오늘의 워크로그
        </span>
      </div>
      <SearchInput />
      <Divider />
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: '#303030', color: '#F5F5F5' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader
            component='div'
            id='nested-list-subheader'
            sx={{
              backgroundColor: '#303030',
              color: '#F5F5F5',
            }}
          >
            worklog
          </ListSubheader>
        }
      >
        {years?.map((year) => <YearList year={year} key={year} />)}
      </List>
    </div>
  );
};

export default PanelLeft;
