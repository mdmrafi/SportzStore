import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB8ObUfwxACNY6Gzb0k96mIPyD4rc7sQZk",
  authDomain: "sportzstore-1d735.firebaseapp.com",
  projectId: "sportzstore-1d735",
  storageBucket: "sportzstore-1d735.firebasestorage.app",
  messagingSenderId: "208758433602",
  appId: "1:208758433602:web:71cdb48ecf1c4431f7cadb",
  measurementId: "G-DSCH38FTMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;