import type {FC, ReactNode} from 'react';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Breadcrumbs, Text} from '@gravity-ui/uikit';

import './PageLayout.scss';

export type PageBreadcrumb = {
  title: string;
  href?: string;
};

export type PageLayoutProps = {
  title: string;
  breadcrumbs: PageBreadcrumb[];
  children?: ReactNode;
};

const PageLayout: FC<PageLayoutProps> = ({title, breadcrumbs, children}) => {
  const navigate = useNavigate();

  return (
    <div className="page-layout">
      <Breadcrumbs>
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const key = item.href ?? item.title;

          if (isLast || !item.href) {
            return <Breadcrumbs.Item key={key}>{item.title}</Breadcrumbs.Item>;
          }

          return (
            <Breadcrumbs.Item key={key} onClick={() => navigate(item.href!)}>
              {item.title}
            </Breadcrumbs.Item>
          );
        })}
      </Breadcrumbs>
      <Text className="page-layout__title" variant="header-1">
        {title}
      </Text>
      {children ? <div className="page-layout__content">{children}</div> : null}
    </div>
  );
};

export default PageLayout;
