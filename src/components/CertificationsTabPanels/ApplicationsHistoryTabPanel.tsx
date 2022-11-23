import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getProposedJobApplicationsByUserId } from 'store/slices/userSlice';
import Filters from 'components/ApplicationsTabPanelFilters/ApplicationHistoryTabPanelFilters';
import { AppliedLineChart } from 'components/Charts/AppliedLineChart';

export const ApplicationsHistoryTabPanel = () => {
  const { proposedJobApplicationList, userId, filters } = useAppSelector(
    state => ({
      proposedJobApplicationList: state.user.proposedJobApplications.list,
      userId: state.user.id,
      filters: state.user.proposedJobApplications.filters,
    }),
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(
        getProposedJobApplicationsByUserId({
          userId: +userId,
          dateFrom: filters.dateFrom || '',
          dateTo: filters.dateTo || '',
        }),
      );
    }
  }, [dispatch, userId, filters]);

  const types = [{
    id: 1,
    name: "Кухар"
  }, {
    id: 2,
    name: "Поліцейський"
  }, {
    id: 3,
    name: "Сушист"
  }, {
    id: 4,
    name: "Далекобійник"
  }, {
    id: 5,
    name: "Продавець-консультант"
  }, {
    id: 6,
    name: "Дизайнер"
  },{
    id: 7,
    name: "Програміст"
  }]

  return (
    <div>
      <Filters />
      <AppliedLineChart applicationData={proposedJobApplicationList.items} applicationTypes={types}/>
    </div>
  );
};
