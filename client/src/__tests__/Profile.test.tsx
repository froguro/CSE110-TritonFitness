import { render, screen } from '@testing-library/react';
import Profile from '../profileFolder/profile';
import { BrowserRouter } from 'react-router-dom';

describe('Profile Component', () => {
  test('renders profile component', () => {
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
          backgroundColor="#ffffff"
          onChangeBackgroundColor={() => {}}
          onChangeBoxBackgroundColor={() => {}}
          onChangeButtonBackgroundColor={() => {}}
        />
      </BrowserRouter>
    );

    expect(screen.getByText(/Test User/)).toBeInTheDocument();
  });
}); 