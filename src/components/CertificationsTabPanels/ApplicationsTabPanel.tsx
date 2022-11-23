import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getJobApplicationsbyUserId } from 'store/slices/userSlice';
import Filters from 'components/ApplicationsTabPanelFilters/ApplicationsTabPanelFilters';

export const ApplicationsTabPanel = () => {
  const { jobApplicationsList, userId, filters } = useAppSelector(state => ({
    jobApplicationsList: state.user.jobApplications.list,
    userId: state.user.id,
    filters: state.user.jobApplications.filters,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getJobApplicationsbyUserId({
        userId: +userId,
        dateFrom: filters.dateFrom || '',
        dateTo: filters.dateTo || '',
      }),
    );
  }, [dispatch, filters]);

  return (
    <div>
      <Filters />
    </div>
  );
};
