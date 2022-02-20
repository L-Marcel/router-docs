import { screen, render } from '@testing-library/react';
import { Layout } from '../../components/Layout';
import { AllProviders } from '../../contexts/AllProviders';
import { theme } from '../../theme/default';

let wrapper;

describe("Layout component", () => {
  beforeEach(() => {
    wrapper = ({ children }): JSX.Element => (
      <AllProviders resetCSS theme={theme}>
        {children}
      </AllProviders>
    );
  });

  it("should be able to render layout of the page", async() => {
    render(<Layout/>, { wrapper });

    let layout = await screen.findByTestId("layout");

    expect(layout).toBeInTheDocument();
  });
});