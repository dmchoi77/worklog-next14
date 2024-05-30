'use client';
import dayjs, { extend, locale } from 'dayjs';

import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useFetchMemoList } from '~/queries/memo';

extend(utc);
extend(timezone);
locale('ko');
const todayDate = dayjs().tz().format('YYYY-MM-DD');

export function TestComponent() {
  const { data: memoList } = useFetchMemoList({ date: todayDate });

  return <div>{JSON.stringify(memoList)}</div>;
}
