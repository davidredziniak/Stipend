import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';
import Nav from './Nav';

test('click on the Home button', () => {
  const result = render(<Nav/>);
  const joinButtonElement = screen.getByText('Home');
  expect(joinButtonElement).toBeInTheDocument();
  const joinButtonElement2 = screen.getByText('Home');
  fireEvent.click(joinButtonElement);
  expect(joinButtonElement2).not.toBeInTheDocument();
});
