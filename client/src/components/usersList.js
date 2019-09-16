import React, { useContext } from "react";

// Components
import usersCard from "./usersCard";

const Users = () => {
  // destructured object
  const { usersArray } = useContext(usersContext);

  return (
    <div className="users-list">
      {usersArray.map(active => (
        <usersCard key={active.id} {...usersArray} active={active} />
      ))}
    </div>
  );
};

export default Users;
