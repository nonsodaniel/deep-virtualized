interface IHeaderProps {
  openModal: (action: string) => void;
}
const Header = ({ openModal }: IHeaderProps) => {
  return (
    <header className="header" data-testid="header">
      <div className="header-wrap text-center">
        <h1 className="title">Virtualized list</h1>
        <div className="btn-wrap">
          <button className="btn btn-add" onClick={() => openModal("add")}>
            Add new item
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
