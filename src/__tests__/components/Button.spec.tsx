import { screen, render, fireEvent } from '@testing-library/react';
import { Button } from '../../components/Button';
import { AllProviders } from '../../contexts/AllProviders';
import { theme } from '../../theme/default';
import { FaQuestion } from "react-icons/fa";

let wrapper;

describe("Button component", () => {
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

  it("should be able to render a simple button", async() => {
    render(<Button>Example</Button>, { wrapper });

    const button = await screen.findByTestId("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Example");
  });

  it("should be able to render a link button", async() => {
    render(<Button href="/link">Example</Button>, { wrapper });

    const button = await screen.findByTestId("button");
    const link = await screen.findByTestId("link");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Example");

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/link");
  });

  it("should be able to render a icon button", async() => {
    render(<Button isIconButton icon={FaQuestion}/>, { wrapper });

    const button = await screen.findByTestId("icon-button");

    expect(button).toBeInTheDocument();
  });

  it("should be able to render an icon button with text on hover", async() => {
    render(<Button isIconButton icon={FaQuestion}>Example</Button>, { wrapper });

    const button = await screen.findByTestId("icon-button");

    expect(button).toBeInTheDocument();
    expect(button).not.toHaveTextContent("Example");

    fireEvent.mouseOver(button);

    const text = await screen.findByTestId("icon-button-text");
  
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent("Example");
    expect(button).not.toHaveTextContent("Example");

    fireEvent.mouseOut(button);

    expect(text).not.toBeInTheDocument();
  });
});