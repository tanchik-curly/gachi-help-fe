import React from 'react';
import { Typography } from '@mui/material';

export enum EStatus {
  Approved = 'Approved',
  Canceled = 'Canceled',
  Pending = 'Pending',
}

const statusMapping: Record<Partial<EStatus>, Record<'en' | 'ua', string>> = {
  Approved: {
    en: 'Approved',
    ua: 'Підтверджено',
  },
  Pending: {
    en: 'Approved',
    ua: 'Очікується підтвердження',
  },
  Canceled: {
    en: 'Approved',
    ua: 'Скасовано',
  },
};

export const Status = ({ status }: { status: `${EStatus}` }) => {
  let color;
  switch (status) {
    case EStatus.Canceled: {
      color = '#ef5350';
      break;
    }
    case EStatus.Pending: {
      color = '#ab47bc';
      break;
    }
    case EStatus.Approved: {
      color = '#26a69a';
      break;
    }
    default:
  }
  return (
    <Typography sx={{ color, fontWeight: 500 }}>
      {statusMapping[status].ua}
    </Typography>
  );
};
