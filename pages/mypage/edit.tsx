import {
  Box,
  Button,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleBottomNavigation from "../../components/organizms/BottomNavigation";
import MultiSelectCountries from "../../components/organizms/MultiSelectCountries";
import { editCountries, getUser } from "../../redux/slices/userSlice";
import DoneIcon from "@mui/icons-material/Done";

export default function ProfileEdit() {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;
  const router = useRouter();

  const [selectCountries, setSelectCountries] = useState<string[]>([]);

  const handleChange = (countries: string[]) => {
    dispatch(editCountries({ uid: user.uid, countries: countries }));
    router.push("/mypage");
  };

  useEffect(() => {
    console.log(user);
    setSelectCountries(user.countries);
  }, [user]);

  return (
    <div>
      <Box>
        <Typography color={"primary"} align="center" variant="h5" pt={2}>
          Profile Edit
        </Typography>
        <Typography color={"primary"} align="center" variant="h5" mt={4}>
          現在ログインしているユーザー
        </Typography>
        <Typography align="center" variant="h6">
          {user.username}
        </Typography>
        <Typography color={"primary"} align="center" variant="h5" mt={4}>
          登録しているメールアドレス
        </Typography>
        <Typography align="center" variant="h6">
          {user.email}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }} mt={8}>
          <MultiSelectCountries
            selectCountries={selectCountries}
            setSelectCountries={setSelectCountries}
          />
          <IconButton onClick={() => handleChange(selectCountries)}>
            <DoneIcon />
          </IconButton>
        </Box>
      </Box>
      <div className="w-full fixed bottom-0">
        <SimpleBottomNavigation />
      </div>
    </div>
  );
}
