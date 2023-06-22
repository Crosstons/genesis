import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../Main/Dashboard'
import Minting from '../Main/Minting'

function Sidebar() {
  return (
    <div className="h-screen bg-background text-primary w-64 space-y-6 px-2 py-7">
      <h1 className="text-2xl font-semibold">Genesis NFTs</h1>

      <nav>
        <ul>
          <li>
            <Link to="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-accent hover:text-background">
              <Dashboard />
            </Link>
          </li>
          <li>
            <Link to="/minting" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-accent hover:text-background">
              <Minting />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
