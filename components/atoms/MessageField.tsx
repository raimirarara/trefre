import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

type Props = {
  roomId: string;
  uid: string;
  sendText: (roomId: string, uid: string, content: string) => Promise<void>;
};

export default function MessageField(props: Props) {
  const [value, setValue] = React.useState<string>("");

  const inputText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    props.sendText(props.roomId, props.uid, value);
    setValue("");
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="flex">
        <TextField
          id="filled-basic"
          label="メッセージを入力"
          variant="filled"
          fullWidth
          multiline
          value={value}
          onChange={(e) => inputText(e)}
        />
        <IconButton color={"primary"} onClick={handleClick}>
          <SendIcon />
        </IconButton>
      </div>
    </Box>
  );
}
