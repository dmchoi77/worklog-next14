import dayjs from 'dayjs';

import TodayMemo from '../todayMemo/TodayMemo';
import TodayWork from '../todayWork/TodayWork';

import { ICommonProps } from '~/types/components/component.types';

const PanelRightMobile = ({ targetDate, userAgent }: ICommonProps) => {
  return (
    <div
      style={{
        backgroundColor: 'rgb(242, 242, 242)',
        flex: 1,
        width: '100%',
        overflowY: 'scroll',
        padding: 0,
        height: 'calc(100vh - 50px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* <Header /> */}
      <div
        className='today-container'
        style={{
          display: 'flex',
          height: '80px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            padding: 20,
          }}
        >
          {`${dayjs(targetDate).get('year')}년 ${dayjs(targetDate).get('month') + 1}월 ${dayjs(targetDate).get(
            'date',
          )}일의 워크로그`}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          className='today-task-container'
          style={{
            flex: 0.5,
            padding: 20,
            borderRight: '1px solid #d5d5d552',
          }}
        >
          <TodayWork targetDate={targetDate} userAgent={userAgent} />
        </div>
        <div
          style={{
            flex: 0.5,
            padding: 20,
            height: '100%',
          }}
        >
          <TodayMemo targetDate={targetDate} userAgent={userAgent} />
        </div>
      </div>
    </div>
  );
};

export default PanelRightMobile;
