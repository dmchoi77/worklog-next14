'use client';

import { useFetchMemoList } from '~/queries/memo';

export default function Page() {
  const { data: memoList } = useFetchMemoList({ date: '2024-05-31' });

  return <div>12312</div>;
}
