export class MenuNavItem {
  title!: string;
  icon?: string;
  route?: string;
  children?: MenuNavItem[] = [];
  action?: () => void;
  disabled?: boolean = false
  visible?: boolean = true;
}