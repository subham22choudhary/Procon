import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";


import { getFirestore } from "firebase/firestore";
// export const db = getFirestore(app);


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);


// import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// async function ensureUserDoc(uid: string, phone: string) {
//     const ref = doc(db, "users", uid);
//     const snap = await getDoc(ref);
//     if (!snap.exists()) {
//         await setDoc(ref, {
//             phone,
//             plan: "free",          // "free" | "pro" | "enterprise"
//             createdAt: serverTimestamp(),
//         });
//     }
//     return (await getDoc(ref)).data();
// }