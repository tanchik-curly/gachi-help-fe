import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getProposedJobApplicationsByUserId } from 'store/slices/userSlice';
import Filters from 'components/ApplicationsTabPanelFilters/ApplicationHistoryTabPanelFilters';

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
    dispatch(
      getProposedJobApplicationsByUserId({
        userId: +userId,
        dateFrom: filters.dateFrom || '',
        dateTo: filters.dateTo || '',
      }),
    );
  }, [dispatch, userId, filters]);

  return (
    <div>
      <Filters />
    </div>
  );
};
