"use client";

import { Session, User } from "better-auth";

interface HomeViewProps {
  session?: {
    session: Session;
    user: User;
  };
}

const HomeView = ({ session }: HomeViewProps) => {
  return (
    <div>
      <h1>Hello {session?.user.name}</h1>
    </div>
  );
};

export default HomeView;
