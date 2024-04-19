import { Metadata } from "next";

import Users from "@/components/shared/Users";

export const metadata: Metadata = {
  title: "Creator It Festival | Users",
  description: "Users page",
};


const UsersPage = async () => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users`);
  const { users } = await response.json();

  return <div>

    <Users users={users} />
  </div>;
};

export default UsersPage;
