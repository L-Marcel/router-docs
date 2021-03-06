import { screen, render } from '@testing-library/react';
import { AllProviders } from '../../contexts/AllProviders';
import Main from '../../pages';
import { theme } from '../../theme/default';

let wrapper;


describe("Index page", () => {
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
    render(<Main/>, { wrapper });
    expect(await screen.findByTestId("title")).toBeInTheDocument();
    expect(await screen.findByTestId("description")).toBeInTheDocument();
    expect(await screen.findByTestId("layout")).toBeInTheDocument();
    expect(await screen.findByTestId("app-info")).toBeInTheDocument();
    expect(await screen.findAllByTestId("button")).toHaveLength(2);
  });
});