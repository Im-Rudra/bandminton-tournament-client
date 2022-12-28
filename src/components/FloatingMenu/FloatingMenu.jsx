import React from 'react';
import FloatingMenuButton from './FloatingMenuButton';

const FloatingMenu = ({ collapse, menuList }) => {
  return (
    <div
      className={
        (collapse ? '' : 'hidden ') + 'overflow-y-auto p-1 bg-gray-50 rounded dark:bg-gray-800'
      }
    >
      <ul className="space-y-2">
        {menuList?.map((menu, i) => {
          return (
            <li key={i + 1}>
              <FloatingMenuButton config={menu} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FloatingMenu;
