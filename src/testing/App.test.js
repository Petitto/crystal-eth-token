import { render, screen } from '@testing-library/react';
import App from '../views/App';

test('render login button', () => {
  render(<App />);
  const linkElement = screen.queryByText("login");
  expect(linkElement).toBeInTheDocument();
});
