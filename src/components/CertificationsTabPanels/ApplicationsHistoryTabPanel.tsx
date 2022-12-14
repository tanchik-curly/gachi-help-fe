import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getJobApplicationsbyUserId, getProposedJobApplicationsByUserId } from 'store/slices/userSlice';
import Filters from 'components/ApplicationsTabPanelFilters/ApplicationHistoryTabPanelFilters';
import { JobsLineChart } from 'components/Charts/JobsLineChart';

export const ApplicationsHistoryTabPanel = () => {
  const { proposedJobApplicationList, appliedJobList, userId, filters } = useAppSelector(
    state => ({
      proposedJobApplicationList: state.user.proposedJobApplications.list,
      appliedJobList: state.user.jobApplications.list,
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

      dispatch(
        getJobApplicationsbyUserId({
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
      <JobsLineChart applicationData={proposedJobApplicationList.items} applicationTypes={types} title={"Графік пропонованих вакансій"}/>
      <JobsLineChart applicationData={appliedJobList.items} applicationTypes={types} title={"Графік поданих вакансій"}/>
    </div>
  );
};
