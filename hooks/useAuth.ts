import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUserState } from "../redux/slices/userSlice";
import { useRouter } from "next/router";
import { auth, db } from "../firebase/firebase";

const useAuth = ({ children }: any) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;
  const router = useRouter();

  useEffect(() => {
    if (router.pathname != "/signup") {
      if (
        !user.isSignedIn /*reduxのStateがfalseならば (今のところ、Reduxは更新するとfalseになるので、更新すると下記を通る)*/
      ) {
        // updateStateUser(user);
        /* firebaseでログインしているかどうか調べてして,いなければsigninに返す関数 */
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const uid = user.uid;
            await db
              .collection("users")
              .doc(uid)
              .get()
              .then((snapshot) => {
                const data: any = snapshot.data();
                dispatch(
                  updateUserState({
                    uid: uid,
                    username: data.username,
                    isSignedIn: true,
                    email: data.email,
                    countries: data.countries,
                    image: {
                      id: data.image.id,
                      path: data.image.path,
                    },
                    chatRooms: data.chatRooms,
                  })
                );
              });
          } else {
            router.push("/signin");
          }
        });
      }
      // reduxのstateがリロードされてfalseになったのをもとに戻す。
    }
  }, [user]);
  return children;
};
export default useAuth;
