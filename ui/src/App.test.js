import { render, screen, fireEvent } from '@testing-library/react';

import JoinTrip from './JoinTrip';
import CreateTrip from './CreateTrip';

test('click on the Enter button in joinTrip', () => {
  const result = render(<JoinTrip isAuth={true}/>);
  const joinButtonElement = screen.getByText('Enter');
  expect(joinButtonElement).toBeInTheDocument();
  const joinButtonElement2 = screen.getByText('Welcome to your Join Page!');
  fireEvent.click(joinButtonElement);
  expect(joinButtonElement2).toBeInTheDocument();
});

test('click on the CreateTrip button', () => {
  const result = render(<CreateTrip isAuth={true}/>);
  const joinButtonElement = screen.getByText('Submit');
  expect(joinButtonElement).toBeInTheDocument();
  const joinButtonElement2 = screen.getByText('Welcome to your Create Trip!');
  fireEvent.click(joinButtonElement);
  expect(joinButtonElement2).toBeInTheDocument();
});

