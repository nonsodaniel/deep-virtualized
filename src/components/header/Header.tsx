import Button from "../views/Button";
import Switch from "../views/Switch";
import SubHeader from "./SubHeader";

interface IHeaderProps {
  openModal: (action: string) => void;
}
const Header = ({ openModal }: IHeaderProps) => {
  return (
    <header className="header" data-testid="header">
      <div className="header-wrap text-center">
        <h1 className="title">Virtualized list</h1>
        <div className="btn-wrap">
          <Switch />
          <Button
            type={"button"}
            className="btn btn-add"
            onClick={() => openModal("add")}
            text="Add new item"
          />
        </div>
      </div>
      <SubHeader />
    </header>
  );
};

export default Header;
