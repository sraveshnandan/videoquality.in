import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="items-center  flex  justify-center h-screen ">
      <SignIn />
    </div>
  );
}
