"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getUserCredits } from "./actions/getcredites";
import CreditButton from "./usecredites";

export default function Credites() {
  const { data: session } = useSession();
  const [totalCredits, setTotalCredits] = useState<number | null>(null);
  const [creditDetails, setCreditDetails] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalAllocatedCredits, setTotalAllocatedCredits] = useState<
    number | null
  >(null);

  useEffect(() => {
    async function fetchCredits() {
      if (session?.user?.email) {
        try {
          const { totalCredits } = await getUserCredits(session.user.email);
          setTotalCredits(totalCredits);
          setCreditDetails(creditDetails);
          setTotalAllocatedCredits(totalAllocatedCredits);
          setError(null);
        } catch (error) {
          console.error("Failed to fetch user credits:", error);
          setError("Failed to fetch user credits. Please try again later.");
        }
      }
    }

    if (session?.user?.email) {
      fetchCredits();
    }
  }, [session]);
  if (!session) {
    return <></>;
  }

  if (!session.user?.email) {
    return <p>Unable to retrieve user email information</p>;
  }

  return (
    <div className="flex items-center justify-center  h-full mt-2">
      {error ? (
        <p className="text-red-500">Credits: 0 </p>
      ) : totalCredits !== null ? (
        <p className=" font-semibold">Credits: {totalCredits}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
