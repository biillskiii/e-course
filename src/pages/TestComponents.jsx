import { Home } from "iconsax-react";
import Button from "../components/Button";

function App() {
  return (
    <div className="space-y-5">
      <p>Regular button</p>
      <Button label="Button" variant="primary" />
      <Button label={"Button"} variant="secondary" />
      <Button label={"Button"} variant="tertiary" />
      <Button label={"Button"} variant="disable" />

      <p>Submenu Button</p>
      <Button label={"Button"} variant="submenu" />
      <Button label={"Button"} variant="submenu-active" />
      <Button label={"Button"} variant="submenu-disable" />

      <p>Regular button with Icon</p>
      <Button
        label="Button"
        variant="primary"
        leftIcon={<Home />}
        rightIcon={<Home />}
      />
      <Button
        label={"Button"}
        variant="secondary"
        leftIcon={<Home />}
        rightIcon={<Home />}
      />
      <Button
        label={"Button"}
        variant="tertiary"
        leftIcon={<Home />}
        rightIcon={<Home />}
      />
      <Button
        label={"Button"}
        variant="disable"
        leftIcon={<Home />}
        rightIcon={<Home />}
      />

      <p>Submenu Button with Icon</p>
      <Button
        label={"Button"}
        variant="submenu"
        leftIcon={<Home />}
        rightIcon={<Home />}
      />
      <Button
        label={"Button"}
        variant="submenu-active"
        leftIcon={<Home />}
        rightIcon={<Home />}
      />
      <Button
        label={"Button"}
        variant="submenu-disable"
        leftIcon={<Home />}
        rightIcon={<Home />}
      />
      <p>Sidebar Button</p>
      <Button label="Button" variant="side-primary" leftIcon={<Home />} />
    </div>
  );
}

export default App;
0;
