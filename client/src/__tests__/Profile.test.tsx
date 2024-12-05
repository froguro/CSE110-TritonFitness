import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../profileFolder/profile';
import '@testing-library/jest-dom';

describe('Profile Component', () => {
  const mockProps = {
    backgroundColor: '#ffffff',
    onChangeBackgroundColor: jest.fn(),
    onChangeBoxBackgroundColor: jest.fn(),
    onChangeButtonBackgroundColor: jest.fn(),
  };

  test('renders no user message when user is null', () => {
    render(
      <BrowserRouter>
        <Profile 
          user={null}
          {...mockProps}
        />
      </BrowserRouter>
    );

    expect(screen.getByText(/No user data available/)).toBeInTheDocument();
  });

  test('renders user profile when user is provided', () => {
    const mockUser = {
      id: 1,
      email: 'test@test.com',
      name: 'Test User',
      picture: 'https://example.com/picture.jpg',
    };

    render(
      <BrowserRouter>
        <Profile 
          user={mockUser}
          {...mockProps}
        />
      </BrowserRouter>
    );

    // Check for user information
    expect(screen.getByText(/Test User/)).toBeInTheDocument();
    expect(screen.getByText(/Email: test@test.com/)).toBeInTheDocument();
    expect(screen.getByText(/Points: 1000/)).toBeInTheDocument();
    // Removed Streak as it's commented out in the component

    // Check for buttons
    expect(screen.getByText(/User Settings \(Not Functional\)/)).toBeInTheDocument();
    expect(screen.getByText(/Back to Home/)).toBeInTheDocument();
  });

  test('renders UI customization and StreakPopup components', () => {
    const mockUser = {
      id: 1,
      email: 'test@test.com',
      name: 'Test User',
      picture: 'https://example.com/picture.jpg',
    };

    render(
      <BrowserRouter>
        <Profile 
          user={mockUser}
          {...mockProps}
        />
      </BrowserRouter>
    );

    // Check if UI customization button is rendered
    expect(screen.getByText(/Open UI Customization/)).toBeInTheDocument();

    // Check if StreakPopup component renders properly
    expect(screen.getByText(/day streak!/i)).toBeInTheDocument();
    expect(screen.getByText(/You have logged in your exercises/i)).toBeInTheDocument();
  });
});