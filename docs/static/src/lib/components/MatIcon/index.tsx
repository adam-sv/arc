import { cn } from '@adam-sv/arc';
import './font/style.scss';

export const iconNameMap = {
  Add: 'add',
  Archive: 'inventory_2',
  ArrowDown: 'south',
  ArrowLeft: 'west',
  ArrowLeftDown: 'south_west',
  ArrowLeftUp: 'north_west',
  ArrowRight: 'east',
  ArrowRightDown: 'south_east',
  ArrowRightUp: 'north_east',
  ArrowUp: 'north',
  Attachment: 'attach_file',
  Ban: 'block',
  BarChart: 'insert_chart',
  BarChartAlt: 'bar_chart',
  Board: 'view_column',
  Book: 'import_contacts',
  Bookmark: 'bookmark',
  Briefcase: 'card_travel',
  Calendar: 'calendar_today',
  CalendarAlt: 'calendar_month',
  CalendarCheck: 'event_available',
  Call: 'call',
  Camera: 'photo_camera',
  CaretDown: 'arrow_drop_down',
  CaretLeft: 'arrow_left',
  CaretRight: 'arrow_right',
  CaretUp: 'arrow_drop_up',
  Chart: 'donut_small',
  Check: 'check',
  ChevronDoubleDown: 'keyboard_double_arrow_down',
  ChevronDoubleLeft: 'keyboard_double_arrow_left',
  ChevronDoubleRight: 'keyboard_double_arrow_right',
  ChevronDoubleUp: 'keyboard_double_arrow_up',
  ChevronDown: 'keyboard_arrow_down',
  ChevronLeft: 'chevron_left',
  ChevronRight: 'chevron_right',
  ChevronUp: 'keyboard_arrow_up',
  CircleAdd: 'add_circle',
  CircleArrowDown: 'arrow_circle_down',
  CircleArrowLeft: 'arrow_circle_left',
  CircleArrowRight: 'arrow_circle_right',
  CircleArrowUp: 'arrow_circle_up',
  CircleCheck: 'check_circle',
  CircleError: 'cancel',
  CircleHelp: 'help',
  CircleInformation: 'info',
  CircleRemove: 'do_not_disturb_on',
  CircleWarning: 'error',
  Clipboard: 'content_paste',
  ClipboardCheck: 'inventory',
  ClipboardList: 'list_alt',
  Clock: 'schedule',
  Close: 'close',
  Cloud: 'cloud',
  CloudDownload: 'cloud_download',
  CloudUpload: 'cloud_upload',
  Computer: 'desktop_windows',
  Copy: 'content_copy',
  CreditCard: 'credit_card',
  Delete: 'delete',
  Document: 'docs',
  DocumentAdd: 'docs_add_on',
  DocumentDownload: 'file_save',
  DocumentEmpty: 'draft',
  DocumentRemove: 'scan_delete',
  Download: 'download',
  Drag: 'reorder',
  Edit: 'edit',
  EditAlt: 'edit_square',
  Email: 'mail',
  Expand: 'zoom_out_map',
  Export: 'upload',
  ExternalLink: 'open_in_new',
  Eye: 'visibility',
  EyeOff: 'visibility_off',
  Face: 'face',
  Favorite: 'star',
  Filter: 'tune',
  FilterAlt: 'filter_list',
  Folder: 'folder',
  FolderAdd: 'create_new_folder',
  FolderCheck: 'folder_check',
  FolderRemove: 'folder_delete',
  Grid: 'grid_view',
  Heart: 'favorite',
  Home: 'house',
  Image: 'photo',
  ImageLibrary: 'photo_library',
  Inbox: 'inbox',
  Laptop: 'computer',
  Lightbulb: 'wb_incandescent',
  Link: 'link',
  List: 'list',
  Location: 'location_on',
  Lock: 'lock',
  LogOut: 'exit_to_app',
  Map: 'map',
  Megaphone: 'campaign',
  Menu: 'menu',
  Message: 'chat',
  MessageAlt: 'sms',
  Mobile: 'mobile',
  Moon: 'dark_mode',
  Notification: 'notifications',
  NotificationOff: 'notifications_off',
  NotificationOn: 'notifications_active',
  OptionsHorizontal: 'more_horiz',
  OptionsVertical: 'more_vert',
  Pause: 'pause',
  PauseAlt: 'pause_circle',
  Percentage: 'percent',
  PersonBadge: 'assignment_ind',
  Pin: 'keep',
  Play: 'play_arrow',
  PlayAlt: 'play_circle',
  Puzzle: 'toys_and_games',
  Refresh: 'refresh',
  Remove: 'remove',
  Search: 'search',
  Select: 'swap_vert',
  Send: 'send',
  Settings: 'settings',
  Share: 'ios_share',
  ShoppingCart: 'shopping_cart',
  ShoppingCartAdd: 'add_shopping_cart',
  Sort: 'sort',
  Speakers: 'speaker',
  Stop: 'stop',
  StopAlt: 'stop_circle',
  Sun: 'light_mode',
  Switch: 'swap_horiz',
  Table: 'table',
  Tablet: 'tablet',
  Tag: 'sell',
  Task: 'assignment',
  TaskAdd: 'assignment_add',
  TaskComplete: 'assignment_turned_in',
  TaskLate: 'assignment_late',
  Timeline: 'view_timeline',
  Token: 'token',
  Undo: 'undo',
  Unlock: 'lock_open',
  User: 'person',
  UserAdd: 'person_add',
  UserCheck: 'person_check',
  UserRemove: 'person_remove',
  Users: 'group',
  VolumeOff: 'volume_off',
  VolumeUp: 'volume_up',
  Wallet: 'account_balance_wallet',
  Warning: 'warning',
  Worker: 'accessibility_new',
  ZoomIn: 'zoom_in',
  ZoomOut: 'zoom_out',
};
export interface IMIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  weight?: 'light' | 'lighter';
  filled?: boolean;
}

export type IMatIconKey = keyof typeof iconNameMap;

export type IMatIcon = {
  [key in IMatIconKey]: (props: Omit<IMIconProps, 'name'>) => React.JSX.Element;
};

export const MatIcon: IMatIcon = Object.keys(iconNameMap).reduce((acc, key) => {
  const typedKey = key as IMatIconKey;
  acc[typedKey] = (props: Omit<IMIconProps, 'name'>) => (
    <MIcon
      {...props}
      name={iconNameMap[typedKey]}
      className={cn(props.className, 'ARC', `MatIcon-${key}`)}
    />
  );

  return acc;
}, {} as IMatIcon);

export function MIcon(props: IMIconProps) {
  const { name, className, weight, filled, ...rest } = props;
  return (
    <span
      data-testid='MatIcon'
      className={cn(
        'material-symbols-outlined',
        'MatIcon',
        className,
        weight,
        filled && 'filled'
      )}
      {...rest}
    >
      {name}
    </span>
  );
}
