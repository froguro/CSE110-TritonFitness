import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../profileFolder/profile';
import '@testing-library/jest-dom';

describe('Profile Component', () => {
  const mockProps = {
    backgroundColor: '#ffffff',
    onChangeBackgroundColor: () => {},
    onChangeBoxBackgroundColor: () => {},
    onChangeButtonBackgroundColor: () => {},
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
      picture: 'https://example.com/picture.jpg'
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
    expect(screen.getByText(/Points:/)).toBeInTheDocument();
    expect(screen.getByText(/Streak:/)).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByText(/User Settings/)).toBeInTheDocument();
  });
}); 