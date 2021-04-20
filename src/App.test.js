import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';
import JoinTrip from './JoinTrip';

test('click on the Home button', () => {
  const result = render(<JoinTrip isAuth={true}/>);
  const joinButtonElement = screen.getByText('Enter');
  expect(joinButtonElement).toBeInTheDocument();
  const joinButtonElement2 = screen.getByText('Welcome to your Join Page!');
  fireEvent.click(joinButtonElement);
  expect(joinButtonElement2).toBeInTheDocument();
});

