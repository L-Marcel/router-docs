import { screen, render, fireEvent } from '@testing-library/react';
import { AllProviders } from '../../contexts/AllProviders';
import { theme } from '../../theme/default';
import { MenuGroup } from '../../components/MenuGroup';

let wrapper;

describe("MenuGroup component", () => {
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

  it("should be able to render the main button", async() => {
    render(<MenuGroup/>, { wrapper });

    const button = await screen.findByTestId("menu-main-button");

    expect(button).toBeInTheDocument();
  });

  it("should be able to render all buttons on click", async() => {
    render(<MenuGroup/>, { wrapper });

    const button = await screen.findByTestId("menu-main-button");
    let buttons = await screen.findAllByRole("icon-button");

    expect(buttons.length).toEqual(1);

    fireEvent.click(button);

    buttons = await screen.findAllByRole("icon-button");

    expect(buttons.length).toEqual(4);
  });
});