import "firebase/compat/auth";
import { updateProfile } from "firebase/auth";
import { storage, db } from "./Firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function uploadImage(file, currentUser, setLoading) {
  const fileRef = ref(storage, "users/" + currentUser.uid);

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const photoUrl = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL: photoUrl });

  const userRef = doc(db, "users", currentUser.uid);
  await setDoc(userRef, { profilePictureUrl: photoUrl }, { merge: true });
  setLoading(false);
}
