// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Collection from './pages/Collection';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Product from './pages/Product';
// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import PlaceOrder from './pages/PlaceOrder';
// import Orders from './pages/Orders';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import SearchBar from './components/SearchBar';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Verify from './pages/Verify';
// import Chatbot from './components/Chatbot'; // Import the chatbot component

// const App = () => {
//   return (
//     <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
//       <ToastContainer />
//       <Navbar />
//       <SearchBar />
      
//       {/* Routes for different pages */}
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/collection' element={<Collection />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/contact' element={<Contact />} />
//         <Route path='/product/:productId' element={<Product />} />
//         <Route path='/cart' element={<Cart />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/place-order' element={<PlaceOrder />} />
//         <Route path='/orders' element={<Orders />} />
//         <Route path='/verify' element={<Verify />} />
//       </Routes>
      
//       <Footer />

//       {/* Chatbot component */}
//       <Chatbot />
//     </div>
//   );
// };

// export default App;






















// // import React from 'react'
// // import { Routes, Route } from 'react-router-dom'
// // import Home from './pages/Home'
// // import Collection from './pages/Collection'
// // import About from './pages/About'
// // import Contact from './pages/Contact'
// // import Product from './pages/Product'
// // import Cart from './pages/Cart'
// // import Login from './pages/Login'
// // import PlaceOrder from './pages/PlaceOrder'
// // import Orders from './pages/Orders'
// // import Navbar from './components/Navbar'
// // import Footer from './components/Footer'
// // import SearchBar from './components/SearchBar'
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import Verify from './pages/Verify'

// // const App = () => {
// //   return (
// //     <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
// //       <ToastContainer />
// //       <Navbar />
// //       <SearchBar />
// //       <Routes>
// //         <Route path='/' element={<Home />} />
// //         <Route path='/collection' element={<Collection />} />
// //         <Route path='/about' element={<About />} />
// //         <Route path='/contact' element={<Contact />} />
// //         <Route path='/product/:productId' element={<Product />} />
// //         <Route path='/cart' element={<Cart />} />
// //         <Route path='/login' element={<Login />} />
// //         <Route path='/place-order' element={<PlaceOrder />} />
// //         <Route path='/orders' element={<Orders />} />
// //         <Route path='/verify' element={<Verify />} />
// //       </Routes>
// //       <Footer />
// //     </div>
// //   )
// // }

// // export default App


import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import Chatbot from './components/Chatbot';
import TryVirtually from './pages/TryVirtually';
import { ShopContext } from './context/ShopContext';
import { useContext } from 'react';

const pagesOrder = [
  '/',               // Home
  '/collection',     // Collection
  '/about',          // About
  '/contact',        // Contact
  '/product',        // Product
  '/cart',           // Cart
  '/login',          // Login
  '/place-order',    // Place Order
  '/orders',         // Orders
  '/verify',         // Verify
  '/try-virtually'   // Try Virtually
];

const App = () => {
  const location = useLocation();
  const { showSearch } = useContext(ShopContext);

  // Get the index of current and previous pages
  const currentIndex = pagesOrder.indexOf(location.pathname);
  const previousIndex = React.useRef(currentIndex);

  // Determine slide direction
  const direction = currentIndex > previousIndex.current ? 'left' : 'right';
  previousIndex.current = currentIndex;

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      {showSearch && <SearchBar />}

      {/* Page transitions */}
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<PageWrapper direction={direction}><Home /></PageWrapper>} />
          <Route path='/collection' element={<PageWrapper direction={direction}><Collection /></PageWrapper>} />
          <Route path='/about' element={<PageWrapper direction={direction}><About /></PageWrapper>} />
          <Route path='/contact' element={<PageWrapper direction={direction}><Contact /></PageWrapper>} />
          <Route path='/product/:productId' element={<PageWrapper direction={direction}><Product /></PageWrapper>} />
          <Route path='/cart' element={<PageWrapper direction={direction}><Cart /></PageWrapper>} />
          <Route path='/login' element={<PageWrapper direction={direction}><Login /></PageWrapper>} />
          <Route path='/place-order' element={<PageWrapper direction={direction}><PlaceOrder /></PageWrapper>} />
          <Route path='/orders' element={<PageWrapper direction={direction}><Orders /></PageWrapper>} />
          <Route path='/verify' element={<PageWrapper direction={direction}><Verify /></PageWrapper>} />
          <Route path='/try-virtually' element={<PageWrapper direction={direction}><TryVirtually /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

      <Footer />
      <Chatbot />
    </div>
  );
};

// Animation wrapper for left-right transitions
const PageWrapper = ({ children, direction }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      x: direction === 'left' ? 100 : -100, // Faster slide in
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' }, // Faster and smoother
    },
    exit: {
      opacity: 0,
      x: direction === 'left' ? -100 : 100, // Slide out opposite
      transition: { duration: 0.25, ease: 'easeIn' },
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      {children}
    </motion.div>
  );
};

export default App;

