import { screen, render } from '@testing-library/react';
import { AllProviders } from '../../contexts/AllProviders';
import Home from '../../pages';
import { theme } from '../../theme/default';

let wrapper;

describe("Template default test", () => {
  beforeEach(() => {
    wrapper = ({ children }): JSX.Element => (
      <AllProviders resetCSS theme={theme}>
        {children}
      </AllProviders>
    );
  });

  it("should be able to load default page template", async() => {
    render(<Home/>, { wrapper });
    expect(
      await screen.findByText("Hello World")
    ).toBeInTheDocument();
  });
});