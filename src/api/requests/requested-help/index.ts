import { axiosInstance } from 'api';
import { Comment, HelpCategory, Status, User } from 'interfaces';
import routes from '../../apiRoutes';

export type RequestedHelpResponse = {
  items: Array<{
    id: number;
    status: Status;
    createdAt: Date;
    helpCategory: HelpCategory;
    author: Partial<User>;
  }>;
  itemCount: number;
};

export type CommentsResponse = {
  items: Array<Comment>;
  itemCount: number;
};

export type UserIdentity = {
  userId: number;
};

export type Filters = {
  skip: number;
  limit: number;
};

export const helpRequests = {
  requestHelpByUserId({
    userId,
    skip,
    limit,
  }: UserIdentity & Filters): Promise<RequestedHelpResponse> {
    return axiosInstance.get(
      `${routes.REQUESTED_HELP_URL}/${userId}?skip=${skip}&limit=${limit}`,
    );
  },
  requestHelp(): Promise<any> {
    return axiosInstance.get(`${routes.REQUESTED_HELP_URL}`);
  },
  requestHelpCategories(): Promise<RequestedHelpResponse> {
    return axiosInstance.get(routes.REQUESTED_HELP_CATEGORIES);
  },
  commentsByUserId({
    userId,
    skip,
    limit,
  }: UserIdentity & Filters): Promise<CommentsResponse> {
    return axiosInstance.get(
      `${routes.COMMENT_URL}/${userId}/comments?skip=${skip}&limit=${limit}`,
    );
  },
};
