import { screen, render } from '@testing-library/react';
import { Profile } from '../../components/Profile';
import { AllProviders } from '../../contexts/AllProviders';
import { theme } from '../../theme/default';

let wrapper;

describe("Profile component", () => {
  beforeEach(() => {
    wrapper = ({ children }): JSX.Element => (
      <AllProviders resetCSS theme={theme}>
        {children}
      </AllProviders>
    );
  });

  it("should be able to render the profile with the info of an user", async() => {
    const user: User = { 
      avatar: "https://avatars.githubusercontent.com/u/62476762?v=4", 
      email: "example@gmail.com", 
      username: "example",
      createdAt: new Date() 
    };

    render(<Profile user={user}/>, { wrapper });

    let avatar = await screen.findByTestId("avatar");
    let username = await screen.findByTestId("username");
    let email = await screen.findByTestId("email");

    expect(avatar).toBeInTheDocument();

    expect(username).toBeInTheDocument();
    expect(username).toHaveTextContent(user.username);

    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent(user.email);
  });
});