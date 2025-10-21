import { authClient } from "@/lib/auth-client";

export default function useUser() {
  const { useSession } = authClient;
  const { data, isPending, error, refetch } = useSession();
  return { data, isPending, error, refetch };
}
