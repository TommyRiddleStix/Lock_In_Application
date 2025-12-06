import React, { createContext, useState, useContext } from 'react';

const AssignmentsContext = createContext();

export const AssignmentsProvider = ({ children }) => {
  const [assignments, setAssignments] = useState([
  ]);

  // Updated to accept icon
  const addAssignment = (name, dueDate, length, priority, icon) => {
    const newAssignment = {
      id: Date.now(),
      name,
      dueDate: dueDate instanceof Date ? dueDate.toDateString() : dueDate,
      length,
      priority,
      icon: icon || '💼', // Fallback to briefcase if empty
    };
    setAssignments((prev) => [...prev, newAssignment]);
  };

  return (
    <AssignmentsContext.Provider value={{ assignments, addAssignment }}>
      {children}
    </AssignmentsContext.Provider>
  );
};

export const useAssignments = () => useContext(AssignmentsContext);