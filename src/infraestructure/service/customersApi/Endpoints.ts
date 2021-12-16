export const Endpoints = {
  getUsers: (limit: number): any => ({
    url: `/?results=${limit}`,
    method: 'get',
  }),
};
