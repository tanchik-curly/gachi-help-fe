import React, { useEffect, useState } from 'react';
import { DateRangePicker as DateRangeSelector } from 'rsuite';
import { Paper } from '@mui/material';

export const locale = {
  sunday: 'Нд',
  monday: 'Пн',
  tuesday: 'Вт',
  wednesday: 'Ср',
  thursday: 'Чт',
  friday: 'Пт',
  saturday: 'Сб',
  ok: 'Підтвердити',
  today: 'Сьогодні',
  yesterday: 'Вчора',
  last7Days: 'Останні 7 днів',
};

export const DateRangePickerFilter = ({
  dateFrom,
  dateTo,
  handler,
}: {
  dateFrom: string;
  dateTo: string;
  handler: (...args: any) => any;
}) => {
  const [value, setValue] = useState<[Date?, Date?]>([]);

  const { afterToday } = DateRangeSelector;

  useEffect(() => {
    if (dateFrom && dateTo) {
      setValue([new Date(dateFrom), new Date(dateTo)]);
    }
    if (dateFrom === '' && dateTo === '') setValue([]);
  }, [dateFrom, dateTo]);

  const setDateHandler = (e: any) => {
    handler(e);
  };

  return (
    <Paper
      sx={{
        '&.MuiPaper-root': {
          backgroundColor: 'inherit',
        },
        '& .rs-picker-date .rs-picker-toggle.rs-btn-sm, .rs-picker-daterange .rs-picker-toggle.rs-btn-sm:hover':
          {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            transition:
              'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          },
        '& .rs-picker-toolbar': {
          background: 'black',
        },
        width: 290,
        height: '36px',
        '& div': {
          width: '100%',
        },
      }}
    >
      <DateRangeSelector
        menuStyle={{
          width: 290,
        }}
        appearance="subtle"
        isoWeek
        locale={locale}
        size="sm"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value={value}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        disabledDate={afterToday()}
        onChange={setDateHandler}
        showOneCalendar
      />
    </Paper>
  );
};
