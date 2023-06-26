import React, { useEffect, useState } from 'react';
import { onConnect } from './Utils';
import { Link } from 'react-router-dom';

function Navbar() {

  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");

  useEffect(() => {
    (async () => {
      const {res, conn} = await onConnect(connected);
      setAccount(res);
      setConnected(conn);
    })();
  }, []);

  return (
    <div className="w-full bg-background text-primary sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to={'/'} className="text-2xl font-semibold">Genesis NFTs</Link>

        <nav className="space-x-4">
          <Link to="/main" className="py-2 px-4 rounded transition duration-200 hover:bg-accent hover:text-background">
            Dashboard
          </Link>
          <Link to="/minting" className="py-2 px-4 rounded transition duration-200 hover:bg-accent hover:text-background">
            Minting
          </Link>

          {/* Connect Wallet button */}
          <button className="bg-accent text-background px-4 py-2 rounded transition duration-200 hover:bg-accentHover">
            { connected ? account : "Connect Wallet" }
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
