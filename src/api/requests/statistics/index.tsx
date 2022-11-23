import { axiosInstance } from 'api';
import { Certification, Group, HelpCategory } from 'interfaces';
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

export type SocialStatisticsByUser = {
  userId: number;
};

export const statistics = {
  getCategories(): Promise<CategoryListResponse> {
    return axiosInstance.get(`${routes.CATEGORIES_URL}`);
  },
  getStatisticsForHelpRequestsByUserForQuantity({
    userId,
    category,
  }: StatForHelpRequestsByUser): Promise<HelpRequestStatResponse> {
    let catEnding = "";
    if (category) {
      catEnding = `&categoryId=${category}`
    }
    return axiosInstance.get(
      `${routes.STATISTICS_URL}/${userId}/help-requests?by=category` + catEnding,
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
  }: SocialStatisticsByUser): Promise<UserSocialStatisticsResponse> {
    return axiosInstance.get(`${routes.STATISTICS_URL}/${userId}/social-stats`);
  },
};
