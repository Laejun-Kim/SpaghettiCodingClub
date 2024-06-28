import Header from '@/components/admin/Header';
import Footer from '@/components/ui/Footer';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex'>
      <Header />
      <div className='flex flex-col justify-between h-screen grow ml-[200px]'>
        <div className='w-full py-10 flex justify-center'>
          <div className='w-full max-w-[800px]'>{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
