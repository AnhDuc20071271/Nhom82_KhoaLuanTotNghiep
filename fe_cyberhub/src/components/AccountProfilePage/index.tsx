import React, { useEffect, useState } from 'react';
import { fetchProfile } from '@api/profileApi';

const AccountProfilePage: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        // const profileData = await fetchProfile();
        // setProfiles(profileData);
      } catch (error) {
        console.error('Error loading profiles:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfiles();
  }, []);

  if (loading) {
    return <p>Loading profiles...</p>;
  }

  return (
    <div>
      <h2>Account Profiles</h2>
      {profiles.map((profile, index) => (
        <div key={index}>
          <h3>{profile.name}</h3>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default AccountProfilePage;
