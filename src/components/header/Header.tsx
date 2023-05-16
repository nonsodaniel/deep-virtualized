const Header = () => {
  return (
    <header className="header" data-testid="header">
      <div className="header-wrap text-center">
        <h1 className="title">Virtualized list</h1>
        <div className="btn-wrap">
          <button className="btn btn-add">Add new item</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
