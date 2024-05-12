
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import NextAuthWrapper from '@/lib/next.auth.wrapper';
import NProgressWrapper from '@/lib/nprogress.wrapper';

import { ToastProvider } from '@/utils/toast';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthWrapper>
            <NProgressWrapper>
              <ToastProvider>
                {children}
              </ToastProvider>
            </NProgressWrapper>
          </NextAuthWrapper>
        </ThemeRegistry>


      </body>
    </html>
  );
}
