// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import LocalMallIcon from '@mui/icons-material/LocalMall';
// import WidgetsIcon from '@mui/icons-material/Widgets';
// import { Link } from 'react-router-dom';
// import { Badge, Button } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
// import TocIcon from '@mui/icons-material/Toc';
// import BookOnlineIcon from '@mui/icons-material/BookOnline';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import './nav.css';
// import { Authenticate } from '../../Validate/AuthContext';

// export default function NavBar() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   //auth value checking
//   const { IsAuth } = React.useContext(Authenticate);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar sx={{ backgroundColor: 'white' }} position="static">
//         <Toolbar>
//           <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#e52b34', fontSize: '30px' }}>
//             <Link to="/">Codx.</Link>
//           </Typography>
//           <div>
//             <Badge color="warning" variant="dot">
//               <Link to="/orders">
//                 <LocalMallIcon color="error" />
//               </Link>
//             </Badge>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleMenu}
//               color="error"
//               sx={{ margin: '0 15px' }}
//             >
//               <WidgetsIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorEl}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right'
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right'
//               }}
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//             >
//               <Link to="/home">
//                 <MenuItem onClick={handleClose}>
//                   <Button startIcon={<HomeIcon />}>Home</Button>
//                 </MenuItem>
//               </Link>
//               <Link to="/menu">
//                 <MenuItem onClick={handleClose}>
//                   <Button startIcon={<RestaurantMenuIcon />}>Menu</Button>
//                 </MenuItem>
//               </Link>
//               <Link to="/table-overview">
//                 <MenuItem onClick={handleClose}>
//                   <Button startIcon={<TocIcon />}>Tables</Button>
//                 </MenuItem>
//               </Link>
//               <Link to="/booking">
//                 <MenuItem onClick={handleClose}>
//                   <Button startIcon={<BookOnlineIcon />}>Bookings</Button>
//                 </MenuItem>
//               </Link>
//               {IsAuth ? (
//                 <Link to="/logout">
//                   <MenuItem onClick={handleClose}>
//                     <Button startIcon={<AdminPanelSettingsIcon />}>Logout</Button>
//                   </MenuItem>
//                 </Link>
//               ) : (
//                 <Link to="/login">
//                   <MenuItem onClick={handleClose}>
//                     <Button startIcon={<AdminPanelSettingsIcon />}>Login</Button>
//                   </MenuItem>
//                 </Link>
//               )}
//             </Menu>
//           </div>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Product', href: '/' },
  { name: 'Features', href: '/' },
  { name: 'Marketplace', href: '/' },
  { name: 'Company', href: '/' }
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-900">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  to="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
