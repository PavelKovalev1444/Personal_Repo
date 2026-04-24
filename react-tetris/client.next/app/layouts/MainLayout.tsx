import type {FC} from 'react';
import React, {useState} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import {AsideHeader} from '@gravity-ui/navigation';
import {Row} from '@gravity-ui/uikit';

import {menuItems as baseMenuItems} from './menuItems';

const MainLayout: FC = () => {
  const location = useLocation();
  const menuItems = baseMenuItems.map(item => ({
    ...item,
    current: item.link === location.pathname,
  }));

  const [isCompact, setIsCompact] = useState(false);

  return (
    <Row>
      <AsideHeader
        compact={isCompact}
        menuItems={menuItems}
        renderContent={() => <Outlet />}
        onChangeCompact={setIsCompact}
      />
    </Row>
  );
};

export default MainLayout;
