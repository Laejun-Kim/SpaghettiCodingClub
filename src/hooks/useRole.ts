import { getLoggedInUserData } from '@/apis/auth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

type Role = 'ROLE' | 'ADMIN';

const useRole = (): Role | null => {
  const queryClient = useQueryClient();
  const [role, setRole] = useState<Role | null>(null);

  const { data } = useQuery({
    queryKey: ['loggedInUser'],
    queryFn: getLoggedInUserData,
    select: (data) => data.payload,
    enabled: !!queryClient.getQueryData(['loggedInUser']), // 쿼리가 존재하는 경우에만 실행
    staleTime: 0,
  });

  useEffect(() => {
    if (data) {
      setRole(data.role as Role);
    }
  }, [data]);

  return role;
};

export default useRole;
