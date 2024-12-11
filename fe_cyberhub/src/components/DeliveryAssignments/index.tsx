import React, { useEffect, useState } from 'react';
import { fetchDeliveryAssignments } from '@api/deliveryAssignmentsApi';

const DeliveryAssignments: React.FC = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDeliveryAssignments();
      setAssignments(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Delivery Assignments</h2>
      <ul>
        {assignments.map((assignment: any) => (
          <li key={assignment.id}>{JSON.stringify(assignment)}</li>
        ))}
      </ul>
    </div>
  );
};

export default DeliveryAssignments;
