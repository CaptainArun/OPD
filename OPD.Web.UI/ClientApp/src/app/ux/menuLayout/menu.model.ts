export interface MenuItem {
    title?: string;
    icon?: string;
    link?: string;
    color?: string;
    hideFor?: string;
    expanded?: boolean;
    subMenu: MenuItem[] | any;
  }

  export type Menu = MenuItem[];
