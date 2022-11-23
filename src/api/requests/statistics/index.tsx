import { axiosInstance } from 'api';
import { Group, HelpCategory, User } from 'interfaces';
import routes from '../../apiRoutes';

export type HelpRequestStatResponse = Array<{ group: Group; quantity: number }>;
export type CategoryListResponse = Array<HelpCategory>;

export type StatForHelpRequestsByUser = {
  userId: number;
  dateFrom?: Date;
  dateTo?: Date;
  category?: number;
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
};
