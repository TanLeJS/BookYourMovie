import AppHeader from '@/components/header/app.header';



export default function MovieLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
