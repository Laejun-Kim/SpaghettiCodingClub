import Header from '@/components/user/Header';
import Footer from '@/components/ui/Footer';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex'>
      <Header />
      <div className='flex flex-col justify-between grow'>
        <div className='w-full py-10 flex justify-center '>
          <div className='w-full max-w-[800px]'>{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
