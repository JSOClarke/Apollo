export default function PageNavBar() {
  return (
    <nav className="bg-purple-500 flex md:flex-col gap-2 text-white p-2">
      <div className="logo w-20 flex-shrink-0 flex items-center justify-center border-r md:border-b md:border-r-0 border-white md:w-full">
        LOGO
      </div>
      <ul className="flex md:flex-col items-center justify-evenly w-full">
        <li>Home</li>
        <li>Dashboard</li>
      </ul>
    </nav>
  );
}
