import "firebase/compat/auth";

//Auth context
import { updateProfile } from "firebase/auth";

//Firebase
import { storage, db } from "./Firebase";

//Firestore
import { doc, setDoc } from "firebase/firestore";

//Storage
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

//Profile picture
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, "users/" + currentUser.uid);

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const photoUrl = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL: photoUrl });

  const userRef = doc(db, "users", currentUser.uid);
  await setDoc(userRef, { profilePictureUrl: photoUrl }, { merge: true });
  setLoading(false);
}
