import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  reload
} from 'firebase/auth';
import { auth } from '../config/firebase.config';

// Sign up function
export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update the user's profile with display name
    await updateProfile(userCredential.user, {
      displayName: displayName
    });
    // Send verification email
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign in function with verification check
export const signIn = async (email, password) => {
  try {
    // First attempt to sign in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Reload user to get latest verification status
    await reload(user);

    // Check if email is verified
    if (!user.emailVerified) {
      // Sign out the user since they're not verified
      await signOut(auth);
      
      // Throw a custom error that we can handle in the UI
      throw {
        code: 'auth/unverified-email',
        message: 'Please verify your email before signing in'
      };
    }

    return {
      user,
      isVerified: true
    };
  } catch (error) {
    // Handle specific Firebase error codes
    // console.log(error);
    switch (error.code) {
      case 'auth/user-not-found':
        throw {
          code: error.code,
          message: 'No account found with this email. Please sign up first.'
        };
      case 'auth/wrong-password':
        throw {
          code: error.code,
          message: 'Incorrect password. Please try again.'
        };
      case 'auth/too-many-requests':
        throw {
          code: error.code,
          message: 'Too many failed attempts. Please try again later.'
        };
      case 'auth/invalid-credential':
        throw {
          code: error.code,
          message: 'Invalid email or password. Please check your credentials.'
        };
      case 'auth/user-disabled':
        throw {
          code: error.code,
          message: 'This account has been disabled. Please contact support.'
        };
      case 'auth/unverified-email':
        throw {
          code: error.code,
          message: 'Please verify your email before signing in.'
        };
      default:
        throw {
          code: 'auth/unknown',
          message: 'An error occurred during sign in. Please try again.'
        };
    }
  }
};

// Sign out function
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Password reset function
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Password reset email has been sent. Please check your inbox.'
    };
  } catch (error) {
    // Handle specific Firebase error codes
    switch (error.code) {
      case 'auth/user-not-found':
        throw {
          code: error.code,
          message: 'No account found with this email address.'
        };
      case 'auth/invalid-email':
        throw {
          code: error.code,
          message: 'Please enter a valid email address.'
        };
      case 'auth/too-many-requests':
        throw {
          code: error.code,
          message: 'Too many attempts. Please try again later.'
        };
      default:
        throw {
          code: 'auth/unknown',
          message: 'An error occurred while sending reset email. Please try again.'
        };
    }
  }
};

// Helper function to resend verification email
export const resendVerificationEmail = async (email, password) => {
  try {
    // First sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if email is already verified
    if (user.emailVerified) {
      throw {
        code: 'auth/email-already-verified',
        message: 'Email is already verified. Please sign in.'
      };
    }

    // Send verification email
    await sendEmailVerification(user);

    // Sign out the user after sending verification email
    await signOut(auth);

    return {
      success: true,
      message: 'Verification email has been sent. Please check your inbox.'
    };
  } catch (error) {
    // Handle specific Firebase error codes
    switch (error.code) {
      case 'auth/too-many-requests':
        throw {
          code: error.code,
          message: 'Too many attempts. Please wait a few minutes before trying again.'
        };
      case 'auth/user-not-found':
        throw {
          code: error.code,
          message: 'No account found with this email. Please sign up first.'
        };
      case 'auth/wrong-password':
        throw {
          code: error.code,
          message: 'Incorrect password. Please try again.'
        };
      default:
        throw {
          code: 'auth/unknown',
          message: 'An error occurred while sending verification email. Please try again.'
        };
    }
  }
};

// Check email verification status
export const checkEmailVerification = async () => {
  try {
    if (!auth.currentUser) {
      throw new Error('No user is currently signed in');
    }

    // Reload the user to get the latest verification status
    await reload(auth.currentUser);

    // Check if email is verified
    if (auth.currentUser.emailVerified) {
      return {
        verified: true,
        message: 'Email is verified'
      };
    } else {
      return {
        verified: false,
        message: 'Email is not verified'
      };
    }
  } catch (error) {
    throw error;
  }
}; 