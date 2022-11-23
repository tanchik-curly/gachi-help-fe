import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getJobApplicationsbyUserId, getProposedJobApplicationsByUserId } from 'store/slices/userSlice';
import Filters from 'components/ApplicationsTabPanelFilters/ApplicationsTabPanelFilters';
import { ApplicationPieChart } from 'components/Charts/ApplicationPieChart';

export const ApplicationsTabPanel = () => {
  const { jobApplicationsList, proposedJobList, userId, filters } = useAppSelector(state => ({
    jobApplicationsList: state.user.jobApplications.list,
    proposedJobList: state.user.proposedJobApplications.list,
    userId: state.user.id,
    filters: state.user.jobApplications.filters,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(
        getJobApplicationsbyUserId({
          userId: +userId,
          dateFrom: filters.dateFrom || '',
          dateTo: filters.dateTo || '',
        }),
      );

      dispatch(
        getProposedJobApplicationsByUserId({
          userId: +userId,
          dateFrom: filters.dateFrom || '',
          dateTo: filters.dateTo || '',
        }),
      );
    }
  }, [dispatch, userId, filters]);

  return (
    <div>
      <Filters />
      <ApplicationPieChart appliedJobsData={jobApplicationsList.items} proposedJobData={proposedJobList.items}/>
    </div>
  );
};
