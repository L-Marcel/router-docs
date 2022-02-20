import { screen, render } from '@testing-library/react';
import { AppInfo } from '../../components/AppInfo';
import { AllProviders } from '../../contexts/AllProviders';
import { theme } from '../../theme/default';
import pk from "../../../package.json";

let wrapper;

describe("AppInfo component", () => {
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

    jest.mock("../../components/Button");
  });

  beforeEach(() => {
    wrapper = ({ children }): JSX.Element => (
      <AllProviders resetCSS theme={theme}>
        {children}
      </AllProviders>
    );
  });

  it("should be able to render buttons with app information", async() => {
    render(<AppInfo/>, { wrapper });

    let github = await screen.findByTestId("rd-github");
    let lmarcel = await screen.findByTestId("l-marcel");

    expect(github).toBeInTheDocument();
    expect(github).toHaveTextContent(`V${pk.version}`);

    expect(lmarcel).toBeInTheDocument();
    expect(lmarcel).toHaveTextContent("l-marcel");
  });
});