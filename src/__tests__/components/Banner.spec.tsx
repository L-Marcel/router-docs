import { screen, render } from '@testing-library/react';
import { Banner } from '../../components/Banner';
import { AllProviders } from '../../contexts/AllProviders';
import { theme } from '../../theme/default';

let wrapper;

describe("Banner component", () => {
  beforeEach(() => {
    wrapper = ({ children }): JSX.Element => (
      <AllProviders resetCSS theme={theme}>
        {children}
      </AllProviders>
    );
  });

  it("should be able to render the title and description", async() => {
    render(<Banner
      title="Example"
      description="It's simple"
    />, { wrapper });

    const title = await screen.findByTestId("title");
    const description = await screen.findByTestId("description");

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    expect(title).toHaveTextContent("Example");
    expect(description).toHaveTextContent("It's simple");
  });

  it("should be able to render the title and description with default values", async() => {
    render(<Banner/>, { wrapper });

    const title = await screen.findByTestId("title");
    const description = await screen.findByTestId("description");

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    expect(title).toHaveTextContent("");
    expect(description).toHaveTextContent("");
  });
});