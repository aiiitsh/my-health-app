
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyC1_u4dvcs5HqJFYuqCGAcIFmabJuS0dTg",
  authDomain: "my-health-app-616d1.firebaseapp.com",
  projectId: "my-health-app-616d1",
  storageBucket: "my-health-app-616d1.firebasestorage.app",
  messagingSenderId: "81053020504",
  appId: "1:81053020504:web:a128051e101e9ba663352d",
  measurementId: "G-KNBH4K0CWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const analytics = getAnalytics(app);

export { app, auth, analytics }; 