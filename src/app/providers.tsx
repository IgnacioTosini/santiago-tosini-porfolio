'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

type ProvidersProps = {
    children: React.ReactNode;
};

const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

export function Providers({ children }: ProvidersProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: TWELVE_HOURS_MS,
                        gcTime: TWENTY_FOUR_HOURS_MS,
                        refetchOnWindowFocus: false,
                        refetchOnReconnect: false,
                        retry: 1,
                    },
                },
            })
    );

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
