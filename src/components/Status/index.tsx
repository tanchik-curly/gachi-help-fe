import React from 'react';
import { Typography } from '@mui/material';

export enum EStatus {
  Approved = 'Approved',
  Declined = 'Declined',
  Pending = 'Pending',
}

const statusMapping: Record<Partial<EStatus>, Record<'en' | 'ua', string>> = {
  Approved: {
    en: 'Approved',
    ua: 'Підтверджено',
  },
  Pending: {
    en: 'Pending',
    ua: 'Очікується підтвердження',
  },
  Declined: {
    en: 'Declined',
    ua: 'Скасовано',
  },
};

export const Status = ({ status }: { status: `${EStatus}` }) => {
  let color;
  switch (status) {
    case EStatus.Declined: {
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
