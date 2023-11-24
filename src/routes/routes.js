import AdminDashboardPage from 'pages/AdminDashboardPage';
import HomePage from 'pages/HomePage';
import RoomDetailPage from 'pages/RoomDetailPage';
import RoomListPage from 'pages/RoomListPage';
import SignupPage from 'pages/SignupPage';
import React from 'react';

const Menu = React.lazy(() => import('pages/MenuPage'));
const Booking = React.lazy(() => import('pages/BookingPage'));
const Orders = React.lazy(() => import('pages/Orders'));
const OrderDetail = React.lazy(() => import('pages/OrderDetail'));
const Table = React.lazy(() => import('pages/TablePage'));
const TableDetail = React.lazy(() => import('pages/TableDetail'));

const { default: Login } = require('Validate/Login');
const { default: Logout } = require('Validate/Logout');

const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/home', component: HomePage },
  { path: '/menu', component: Menu },
  { path: '/booking', component: Booking },
  { path: '/orders', component: Orders },
  { path: '/orders/:id', component: OrderDetail },
  { path: '/table-overview', component: Table },
  { path: '/table-overview/:id', component: TableDetail }
];

const authRoutes = [
  { path: 'login', component: Login },
  { path: '/logout', component: Logout }
];

const adminRoutes = [
  { path: '/admin', component: AdminDashboardPage },
  { path: '/admin/student/signup', component: SignupPage },
  { path: '/admin/room/list', component: RoomListPage },
  { path: '/admin/room/:id', component: RoomDetailPage }
];

export { authRoutes, publicRoutes, adminRoutes };
