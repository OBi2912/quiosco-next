'use client';

import { useStore } from '@/src/store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect } from 'react';

export default function OrderPage() {
  const order = useStore((state) => state.order);
  const router = useRouter();
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (order.length === 0) {
      router.replace('/');
    } else if (pathname === '/order') {
      router.replace('/order/cafe');
    }
  }, [order, router, pathname]);

  return null;
}
