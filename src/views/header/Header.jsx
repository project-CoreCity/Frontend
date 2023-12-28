import Authentication from "./Authentication";

function Header() {
  return (
    <div className="flex items-center justify-end h-16">
      <Authentication />
    </div>
  );
}

export default Header;
