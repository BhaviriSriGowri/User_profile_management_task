// LocalStorage utility functions for user management

// Save new user to localStorage
export const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

// Get all users from localStorage
export const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

// Find user by email and password
export const findUser = (email, password) => {
  const users = getUsers();
  return users.find(u => u.email === email && u.password === password);
};

// Check if email already exists
export const emailExists = (email) => {
  const users = getUsers();
  return users.some(u => u.email === email);
};

// Set current logged-in user
export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Get current logged-in user
export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

// Update current user data
export const updateCurrentUser = (updatedData) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  
  const updated = { ...currentUser, ...updatedData };
  setCurrentUser(updated);
  
  // Update in users array
  const users = getUsers();
  const index = users.findIndex(u => u.email === currentUser.email);
  if (index !== -1) {
    users[index] = updated;
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  return updated;
};

// Logout user
export const logout = () => {
  localStorage.removeItem('currentUser');
};