import React from 'react';

import Add from './Add';
import Archive from './Archive';
import ArrowDown from './ArrowDown';
import ArrowLeft from './ArrowLeft';
import ArrowLeftDown from './ArrowLeftDown';
import ArrowLeftUp from './ArrowLeftUp';
import ArrowRight from './ArrowRight';
import ArrowRightDown from './ArrowRightDown';
import ArrowRightUp from './ArrowRightUp';
import ArrowUp from './ArrowUp';
import Attachment from './Attachment';
import Ban from './Ban';
import BarChart from './BarChart';
import BarChartAlt from './BarChartAlt';
import Board from './Board';
import Book from './Book';
import Bookmark from './Bookmark';
import Calendar from './Calendar';
import Call from './Call';
import Camera from './Camera';
import CaretDown from './CaretDown';
import CaretLeft from './CaretLeft';
import CaretRight from './CaretRight';
import CaretUp from './CaretUp';
import Check from './Check';
import ChevronDoubleDown from './ChevronDoubleDown';
import ChevronDoubleLeft from './ChevronDoubleLeft';
import ChevronDoubleRight from './ChevronDoubleRight';
import ChevronDoubleUp from './ChevronDoubleUp';
import ChevronDown from './ChevronDown';
import ChevronLeft from './ChevronLeft';
import ChevronRight from './ChevronRight';
import ChevronUp from './ChevronUp';
import CircleAdd from './CircleAdd';
import CircleArrowDown from './CircleArrowDown';
import CircleArrowLeft from './CircleArrowLeft';
import CircleArrowRight from './CircleArrowRight';
import CircleArrowUp from './CircleArrowUp';
import CircleCheck from './CircleCheck';
import CircleError from './CircleError';
import CircleHelp from './CircleHelp';
import CircleInformation from './CircleInformation';
import CircleRemove from './CircleRemove';
import CircleWarning from './CircleWarning';
import Clipboard from './Clipboard';
import ClipboardCheck from './ClipboardCheck';
import ClipboardList from './ClipboardList';
import Clock from './Clock';
import Close from './Close';
import Cloud from './Cloud';
import CloudDownload from './CloudDownload';
import CloudUpload from './CloudUpload';
import Computer from './Computer';
import Copy from './Copy';
import CreditCard from './CreditCard';
import Delete from './Delete';
import Document from './Document';
import DocumentAdd from './DocumentAdd';
import DocumentCheck from './DocumentCheck';
import DocumentDownload from './DocumentDownload';
import DocumentEmpty from './DocumentEmpty';
import DocumentRemove from './DocumentRemove';
import Download from './Download';
import Drag from './Drag';
import Edit from './Edit';
import EditAlt from './EditAlt';
import Email from './Email';
import Expand from './Expand';
import Export from './Export';
import ExternalLink from './ExternalLink';
import Eye from './Eye';
import EyeOff from './EyeOff';
import Favorite from './Favorite';
import Filter from './Filter';
import FilterAlt from './FilterAlt';
import Folder from './Folder';
import FolderAdd from './FolderAdd';
import FolderCheck from './FolderCheck';
import FolderDownload from './FolderDownload';
import FolderRemove from './FolderRemove';
import Grid from './Grid';
import Heart from './Heart';
import Home from './Home';
import Image from './Image';
import Inbox from './Inbox';
import Laptop from './Laptop';
import Link from './Link';
import LinkAlt from './LinkAlt';
import List from './List';
import Location from './Location';
import Lock from './Lock';
import LogOut from './LogOut';
import Map from './Map';
import Megaphone from './Megaphone';
import Menu from './Menu';
import Message from './Message';
import MessageAlt from './MessageAlt';
import Mobile from './Mobile';
import Moon from './Moon';
import Notification from './Notification';
import NotificationOff from './NotificationOff';
import OptionsHorizontal from './OptionsHorizontal';
import OptionsVertical from './OptionsVertical';
import Pause from './Pause';
import Percentage from './Percentage';
import Pin from './Pin';
import Play from './Play';
import Refresh from './Refresh';
import Remove from './Remove';
import Search from './Search';
import Select from './Select';
import Send from './Send';
import Settings from './Settings';
import Share from './Share';
import ShoppingCart from './ShoppingCart';
import ShoppingCartAdd from './ShoppingCartAdd';
import Sort from './Sort';
import Speakers from './Speakers';
import Stop from './Stop';
import Sun from './Sun';
import Switch from './Switch';
import Table from './Table';
import Tablet from './Tablet';
import Tag from './Tag';
import Undo from './Undo';
import Unlock from './Unlock';
import User from './User';
import UserAdd from './UserAdd';
import UserCheck from './UserCheck';
import UserRemove from './UserRemove';
import Users from './Users';
import VolumeOff from './VolumeOff';
import VolumeUp from './VolumeUp';
import Warning from './Warning';
import ZoomIn from './ZoomIn';
import ZoomOut from './ZoomOut';

type Icon =
  | 'Add'
  | 'Archive'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowLeftDown'
  | 'ArrowLeftUp'
  | 'ArrowRight'
  | 'ArrowRightDown'
  | 'ArrowRightUp'
  | 'ArrowUp'
  | 'Attachment'
  | 'Ban'
  | 'BarChart'
  | 'BarChartAlt'
  | 'Board'
  | 'Book'
  | 'Bookmark'
  | 'Calendar'
  | 'Call'
  | 'Camera'
  | 'CaretDown'
  | 'CaretLeft'
  | 'CaretRight'
  | 'CaretUp'
  | 'Check'
  | 'ChevronDoubleDown'
  | 'ChevronDoubleLeft'
  | 'ChevronDoubleRight'
  | 'ChevronDoubleUp'
  | 'ChevronDown'
  | 'ChevronLeft'
  | 'ChevronRight'
  | 'ChevronUp'
  | 'CircleAdd'
  | 'CircleArrowDown'
  | 'CircleArrowLeft'
  | 'CircleArrowRight'
  | 'CircleArrowUp'
  | 'CircleCheck'
  | 'CircleError'
  | 'CircleHelp'
  | 'CircleInformation'
  | 'CircleRemove'
  | 'CircleWarning'
  | 'Clipboard'
  | 'ClipboardCheck'
  | 'ClipboardList'
  | 'Clock'
  | 'Close'
  | 'Cloud'
  | 'CloudDownload'
  | 'CloudUpload'
  | 'Computer'
  | 'Copy'
  | 'CreditCard'
  | 'Delete'
  | 'Document'
  | 'DocumentAdd'
  | 'DocumentCheck'
  | 'DocumentDownload'
  | 'DocumentEmpty'
  | 'DocumentRemove'
  | 'Download'
  | 'Drag'
  | 'Edit'
  | 'EditAlt'
  | 'Email'
  | 'Expand'
  | 'Export'
  | 'ExternalLink'
  | 'Eye'
  | 'EyeOff'
  | 'Favorite'
  | 'Filter'
  | 'FilterAlt'
  | 'Folder'
  | 'FolderAdd'
  | 'FolderCheck'
  | 'FolderDownload'
  | 'FolderRemove'
  | 'Grid'
  | 'Heart'
  | 'Home'
  | 'Image'
  | 'Inbox'
  | 'Laptop'
  | 'Link'
  | 'LinkAlt'
  | 'List'
  | 'Location'
  | 'Lock'
  | 'LogOut'
  | 'Map'
  | 'Megaphone'
  | 'Menu'
  | 'Message'
  | 'MessageAlt'
  | 'Mobile'
  | 'Moon'
  | 'Notification'
  | 'NotificationOff'
  | 'OptionsHorizontal'
  | 'OptionsVertical'
  | 'Pause'
  | 'Percentage'
  | 'Pin'
  | 'Play'
  | 'Refresh'
  | 'Remove'
  | 'Search'
  | 'Select'
  | 'Send'
  | 'Settings'
  | 'Share'
  | 'ShoppingCart'
  | 'ShoppingCartAdd'
  | 'Sort'
  | 'Speakers'
  | 'Stop'
  | 'Sun'
  | 'Switch'
  | 'Table'
  | 'Tablet'
  | 'Tag'
  | 'Undo'
  | 'Unlock'
  | 'User'
  | 'UserAdd'
  | 'UserCheck'
  | 'UserRemove'
  | 'Users'
  | 'VolumeOff'
  | 'VolumeUp'
  | 'Warning'
  | 'ZoomIn'
  | 'ZoomOut';

export type IMonoIcon = {
  [key in Icon]: ({ className }: { className?: string }) => JSX.Element;
};

export const MonoIcon: IMonoIcon = {
  Add,
  Archive,
  ArrowDown,
  ArrowLeft,
  ArrowLeftDown,
  ArrowLeftUp,
  ArrowRight,
  ArrowRightDown,
  ArrowRightUp,
  ArrowUp,
  Attachment,
  Ban,
  BarChart,
  BarChartAlt,
  Board,
  Book,
  Bookmark,
  Calendar,
  Call,
  Camera,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  Check,
  ChevronDoubleDown,
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronDoubleUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAdd,
  CircleArrowDown,
  CircleArrowLeft,
  CircleArrowRight,
  CircleArrowUp,
  CircleCheck,
  CircleError,
  CircleHelp,
  CircleInformation,
  CircleRemove,
  CircleWarning,
  Clipboard,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Close,
  Cloud,
  CloudDownload,
  CloudUpload,
  Computer,
  Copy,
  CreditCard,
  Delete,
  Document,
  DocumentAdd,
  DocumentCheck,
  DocumentDownload,
  DocumentEmpty,
  DocumentRemove,
  Download,
  Drag,
  Edit,
  EditAlt,
  Email,
  Expand,
  Export,
  ExternalLink,
  Eye,
  EyeOff,
  Favorite,
  Filter,
  FilterAlt,
  Folder,
  FolderAdd,
  FolderCheck,
  FolderDownload,
  FolderRemove,
  Grid,
  Heart,
  Home,
  Image,
  Inbox,
  Laptop,
  Link,
  LinkAlt,
  List,
  Location,
  Lock,
  LogOut,
  Map,
  Megaphone,
  Menu,
  Message,
  MessageAlt,
  Mobile,
  Moon,
  Notification,
  NotificationOff,
  OptionsHorizontal,
  OptionsVertical,
  Pause,
  Percentage,
  Pin,
  Play,
  Refresh,
  Remove,
  Search,
  Select,
  Send,
  Settings,
  Share,
  ShoppingCart,
  ShoppingCartAdd,
  Sort,
  Speakers,
  Stop,
  Sun,
  Switch,
  Table,
  Tablet,
  Tag,
  Undo,
  Unlock,
  User,
  UserAdd,
  UserCheck,
  UserRemove,
  Users,
  VolumeOff,
  VolumeUp,
  Warning,
  ZoomIn,
  ZoomOut,
};
