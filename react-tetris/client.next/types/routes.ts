export type RouteBase = {
  name: string;
  title: string;
  path?: string;
  component?: React.ComponentType;
  isPublic?: boolean;
  hasSiderLink?: boolean;
};

export type RouteGroup = RouteBase & {
  routes?: RouteBase[];
};

export type RoutesConfig = {
  layout: React.ComponentType;
  routes: RouteGroup[];
}[];
