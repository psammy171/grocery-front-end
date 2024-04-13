import { useSession } from "next-auth/react";

const SessionLoader = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default SessionLoader;
