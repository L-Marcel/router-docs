import { screen, render } from '@testing-library/react';
import { AllProviders } from '../../contexts/AllProviders';
import Me from '../../pages/me';
import { theme } from '../../theme/default';

let wrapper;

describe("Me page", () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    wrapper = ({ children }): JSX.Element => (
      <AllProviders resetCSS theme={theme}>
        {children}
      </AllProviders>
    );
  });

  it("should be able to render the page content", async() => {
    const user: User = { 
      avatar: "https://avatars.githubusercontent.com/u/62476762?v=4", 
      email: "example@gmail.com", 
      username: "example",
      createdAt: new Date() 
    };

    render(<Me user={user}/>, { wrapper });
    expect(await screen.findByTestId("profile")).toBeInTheDocument();
    expect(await screen.findByTestId("menu-group")).toBeInTheDocument();
    expect(await screen.findByTestId("layout")).toBeInTheDocument();
    expect(await screen.findAllByRole("icon-button")).toHaveLength(1);
  });
});