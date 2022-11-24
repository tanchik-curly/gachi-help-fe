import { axiosInstance } from 'api';
import { Certification, Group, HelpCategory, JobApplication } from 'interfaces';
import routes from '../../apiRoutes';

export type HelpRequestStatResponse = Array<{ group: Group; quantity: number }>;
export type CategoryListResponse = Array<HelpCategory>;

export type CertificationHistoryResponse = {
  items: Array<Certification>;
  itemCount: number;
};

export type UserSocialStatisticsResponse = {
  votesCount: number;
  closedDiscussionsCount: number;
  answearsCount: number;
  carma: number;
};

export type JobApplicationResponse = JobApplication[];

export type StatForHelpRequestsByUser = {
  userId: number;
  dateFrom?: Date;
  dateTo?: Date;
  category?: number;
};

export type CertificationsByUser = {
  userId: number;
  dateFrom?: Date;
  dateTo?: Date;
  skip: number;
  limit: number;
};

export type StatByUser = {
  userId: number;
};

export type StatByUserAndDate = {
  userId: number;
  dateFrom?: string;
  dateTo?: string;
};

export const statistics = {
  getCategories(): Promise<CategoryListResponse> {
    return axiosInstance.get(`${routes.CATEGORIES_URL}`);
  },
  getStatisticsForHelpRequestsByUserForQuantity({
    userId,
    category,
  }: StatForHelpRequestsByUser): Promise<HelpRequestStatResponse> {
    let catEnding = '';
    if (category) {
      catEnding = `&categoryId=${category}`;
    }
    return axiosInstance.get(
      `${routes.STATISTICS_URL}/${userId}/help-requests?by=category` +
        catEnding,
    );
  },
  getStatisticsForHelpRequestsByUserForPeriod({
    userId,
    dateFrom,
    dateTo,
  }: Required<
    Pick<StatForHelpRequestsByUser, 'userId' | 'dateFrom' | 'dateTo'>
  >): Promise<HelpRequestStatResponse> {
    return axiosInstance.get(
      `${routes.STATISTICS_URL}/${userId}/help-requests?by=period&from=${dateFrom}&to=${dateTo}`,
    );
  },
  getCertificationsHistoryByUserId({
    userId,
    skip,
    limit,
  }: CertificationsByUser): Promise<CertificationHistoryResponse> {
    return axiosInstance.get(
      `${routes.STATISTICS_URL}/${userId}/certifications?skip=${skip}&limit=${limit}`,
    );
  },
  getSocialStatisticsByUserId({
    userId,
  }: StatByUser): Promise<UserSocialStatisticsResponse> {
    return axiosInstance.get(`${routes.STATISTICS_URL}/${userId}/social-stats`);
  },
  getJobApplicationStatByUserId({
    userId,
    dateFrom,
    dateTo,
  }: StatByUserAndDate): Promise<JobApplicationResponse> {
    const dateParams = new URLSearchParams({
      from: dateFrom || '',
      to: dateTo || '',
    }).toString();

    return axiosInstance.get(
      `${routes.STATISTICS_URL}/${userId}/job-applications?${
        dateFrom || dateTo ? dateParams : ''
      }`,
    );
  },
  getProposedJobApplications({
    userId,
    dateFrom,
    dateTo,
  }: StatByUserAndDate): Promise<JobApplicationResponse> {
    const dateParams = new URLSearchParams({
      from: dateFrom || '',
      to: dateTo || '',
    }).toString();

    return axiosInstance.get(
      `${routes.STATISTICS_URL}/${userId}/proposed-job-applications?${
        dateFrom || dateTo ? dateParams : ''
      }`,
    );
  },
};
