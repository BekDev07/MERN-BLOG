import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
function UsersList() {
  const {
    data: users,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>...Loading</p>;
  if (isError) content = <p className="errmsg">{error?.data?.message}</p>;
  if (isSuccess) {
    const { ids } = users;
    const tableContent = ids?.length
      ? ids.map((userId) => <User userId={userId} key={userId} />)
      : null;
    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Username
            </th>
            <th scope="col" className="table__th user__roles">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
    return content;
  }
}

export default UsersList;
