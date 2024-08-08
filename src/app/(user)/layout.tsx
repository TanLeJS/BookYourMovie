import AppHeader from '@/components/header/app.header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book your Movie',
  description: 'Just a description',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
