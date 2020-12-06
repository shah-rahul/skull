import React from "react";

export default function Header() {
  return (
    <header>
      <div className='header-inner'>
        <div className='logo'>HELLO</div>
        <nav>
          <ul>
            <li>
              <a href='/'>From</a>
            </li>
            <li>
              <a href='/'>The</a>
            </li>
            <li>
              <a href='/'>Other</a>
            </li>
            <li>
              <a href='/'>side</a>
            </li>
            <li className='btn'>
              <a href='/'>.....</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
