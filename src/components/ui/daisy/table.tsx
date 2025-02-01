// File: src/components/TableDaisyUI.tsx

import { supabase } from '@/lib/supabase';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

// Define the User type
interface User {
  id: string;
  email: string;
  nome: string;
}

const TableDaisyUI = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle real-time updates
  const handleRealtimeUpdate = (
    payload: RealtimePostgresChangesPayload<{ [key: string]: any }>
  ) => {
    if (!payload) return;

    console.log('Processing payload:', payload); // Debug log

    switch (payload.eventType) {
      case 'INSERT':
        if (payload.new) {
          setUsers((prevUsers) => [...prevUsers, payload.new as User]);
        }
        break;

      case 'UPDATE':
        if (payload.new) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === payload.new?.id ? (payload.new as User) : user
            )
          );
        }
        break;

      case 'DELETE':
        if (payload.old) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== payload.old?.id)
          );
        }
        break;
    }
  };

  // Fetch initial data and set up real-time subscription
  useEffect(() => {
    fetchUsers();

    const channel = supabase
      .channel('table_db_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players',
        },
        handleRealtimeUpdate
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      channel.unsubscribe();
    };
  }, []);

  // Initial data fetch
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('players').select('*');

      if (error) throw error;

      setUsers(data as User[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.nome}</div>
                  </div>
                </div>
              </td>
              <td>{user.email}</td>
              <td>Purple</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDaisyUI;
