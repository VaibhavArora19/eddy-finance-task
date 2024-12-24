"use client";

function Navbar() {
  return (
    <div className="flex justify-between px-8 py-4">
      <div className="text-2xl font-semibold">
        <h1>Navbar</h1>
      </div>
      <div>
        <appkit-button />
      </div>
    </div>
  );
}

export default Navbar;
