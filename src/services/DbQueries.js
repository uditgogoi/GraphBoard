import { useFirestore, useCollection } from "vuefire";
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
  getFirestore
} from "firebase/firestore";

const storeUserProfile = async (user) => {
  try {
    let dbObject = {
      email: user.email,
      name: user.displayName,
      profilePicture: user.photoURL,
      emailVerified: user.emailVerified,
      userID: user.uid,
    };

    const db = useFirestore();
    const userProfileRef = doc(db, "Profiles", user.uid);
    const docSnapshot = await getDoc(userProfileRef);
    if (!docSnapshot.exists()) {
      await setDoc(userProfileRef, {
        ...dbObject,
      });
    }
    return { success: true, ...dbObject };
  } catch (e) {
    return { error: e };
  }
};

const fetchUserData = async (user) => {
  try {
    const db = getFirestore();
    const userProfileRef = collection(db, "Profiles");
    const filteredQuery = query(userProfileRef, where("userID", "==", user.uid));
    const querySnapshot = await getDocs(filteredQuery);
    const queryData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return queryData;
    return []
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { storeUserProfile, fetchUserData };
