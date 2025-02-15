import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; 

const Index = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 left-0 w-full h-[60px] lg:h-[80px] bg-green-500 shadow-md z-50">
      <div className="w-[90%] flex m-auto items-center h-full justify-between">
        <div>
          <Link to={"/"}  className="text-[28px] font-medium text-white lg:text-[34px]">Logo</Link>
        </div>

        <div className="hidden sm:flex">
          <ul className="flex items-center gap-[40px] lg:gap-[70px] text-white font-medium lg:text-[20px]">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/banks">Banklar</Link>
            </li>
            <li>
              <Link to="/archive">Arxiv</Link>
            </li>
          </ul>
        </div>

        <div className="hidden sm:flex">
          <Link
            className="bg-blue-500 rounded-lg border-2 border-[white] py-1 px-3 text-white font-medium lg:text-[20px] lg:py-1 lg:px-4 "
            to="#"
          >
            Login
          </Link>
        </div>

        <div className="sm:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <AiOutlineClose size={28} className="text-white" />
            ) : (
              <AiOutlineMenu size={28} className="text-white" />
            )}
          </button>
        </div>

        <div
          className={`fixed top-0 left-0 w-[60%] h-full bg-green-500 shadow-lg p-5 transform ${
            open ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 sm:hidden`}
        >
          <div className="flex justify-between">
            <h1 className="text-[28px] text-white font-medium">Logo</h1>
            <button onClick={() => setOpen(false)}>
              <AiOutlineClose size={28} className="text-white" />
            </button>
          </div>

          <ul className="flex flex-col gap-5 mt-10 text-white font-medium">
            <li>
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/banks" onClick={() => setOpen(false)}>
                Banklar
              </Link>
            </li>
            <li>
              <Link to="/archive" onClick={() => setOpen(false)}>
                Arxiv
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="bg-blue-500 border-2 border-[white] text-white py-1 px-3 rounded-lg"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
