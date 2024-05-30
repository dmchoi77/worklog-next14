import React from 'react';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <div style={{ width: '100%' }}>{children}</div>;
}
