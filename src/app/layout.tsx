
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import { TicketProvider } from '@/context/TicketContext';
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
              <TicketProvider>
                <ToastProvider>
                  {children}
                </ToastProvider>
              </TicketProvider>
            </NProgressWrapper>
          </NextAuthWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
