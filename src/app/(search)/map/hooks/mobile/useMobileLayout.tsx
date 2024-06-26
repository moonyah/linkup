'use client';
import {
  minDeskLayoutState,
  mobileReservationLayoutState,
} from '@/app/(search)/atom/media';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSetRecoilState } from 'recoil';

export const useMobileLayout = () => {
  const setMobileLayout = useSetRecoilState(mobileReservationLayoutState);
  const setMinDesk = useSetRecoilState(minDeskLayoutState);
  const isMobile = useMediaQuery({ minWidth: 360 });
  // const isMobile = useMediaQuery({ minWidth: 360 });
  const minDesk = useMediaQuery({ minWidth: 376, maxWidth: 767 });

  useEffect(() => {
    setMobileLayout(isMobile);
    setMinDesk(minDesk);
  }, [isMobile, setMobileLayout, setMinDesk, minDesk]);
};
