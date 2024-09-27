import { Home } from "iconsax-react";
import Button from "../components/Button";
import Label from "../components/Label";
import InputBase from "../components/InputForm";
function App() {
  return (
    <div className="space-y-5 px-10">
      {/* Button */}
      <p>Regular button</p>
      <Button label="Button" variant="primary" />
      <Button label={"Button"} variant="secondary" />
      <Button label={"Button"} variant="tertiary" />
      <Button label={"Button"} variant="disable" />
      {/* Submenu button */}
      <p>Submenu Button</p>
      <Button label={"Button"} variant="submenu" />
      <Button label={"Button"} variant="submenu-active" />
      <Button label={"Button"} variant="submenu-disable" />
      {/* Icon Button */}
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
      {/* Submenu */}
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
      {/* Label */}
      <p>Label</p>
      <Label label="Label" variant={"failed"} size="very-big" />
      <p>Checkbox</p>
      <InputBase type={"checkbox"} />
      <InputBase type={"checkbox"} disabled={true} />
      {/* Sidebar */}
      <div className="w-60 min-h-screen bg-white shadow-lg flex flex-col items-center">
        <h1 className="mango text-center text-secondary-500 text-[40px]">
          PIXEL<span className="text-primary-500">CODE.</span>
        </h1>
        <div className="mt-10 space-y-6">
          <Button
            label="Dashboard"
            variant="side-primary"
            leftIcon={<Home />}
            size="very-big"
          />
          <Button
            label="Dashboard"
            variant="side-primary"
            leftIcon={<Home />}
            size="very-big"
          />
          <Button
            label="Dashboard"
            variant="side-primary"
            leftIcon={<Home />}
            size="very-big"
          />
          <Button
            label="Dashboard"
            variant="side-primary"
            leftIcon={<Home />}
            size="very-big"
          />
          <Button
            label="Dashboard"
            variant="side-primary"
            leftIcon={<Home />}
            size="very-big"
          />
          <Button
            label="Dashboard"
            variant="side-primary"
            leftIcon={<Home />}
            size="very-big"
          />
          <Button
            label="Dashboard"
            variant="side-primary"
            leftIcon={<Home />}
            size="very-big"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
