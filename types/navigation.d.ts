export type NavigationItem = {
  name: string;
  href: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export type INavigation = {
  solutions: NavigationItem[];
  support: NavigationItem[];
  company: NavigationItem[];
  legal: NavigationItem[];
  social: NavigationItem[];
};
