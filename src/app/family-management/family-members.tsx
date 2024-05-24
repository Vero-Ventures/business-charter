'use client';
import { useState, useEffect } from 'react';
import FamilyMember from './family-member';
import { loadFamilyMembers } from './actions';

interface FamilyMembersProps {
  familyId: number;
}

const FamilyMembers: React.FC<FamilyMembersProps> = ({ familyId }) => {
  const [members, setFamilyMembers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTable() {
      try {
        const familyMembers = await loadFamilyMembers(familyId);
        setFamilyMembers(familyMembers);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unexpected error occurred');
        }
      }
    }

    if (familyId) {
      loadTable();
    }
  }, [familyId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="prose mt-8">
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.length > 0 ? (
            members.map(member => (
              <FamilyMember key={member.email} member={member} />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">You have no family members yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FamilyMembers;
