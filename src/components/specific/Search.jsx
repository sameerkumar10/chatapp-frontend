import {
  Dialog,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  List,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
//import { sampleUsers } from "../../constants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { setisSearch } from "../../redux/reducers/misc";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { toast } from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hook";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFreindRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const dispatch = useDispatch();
  const search = useInputValidation("");

  const [users, setUsers] = useState([]);
  const addFreindHandler = async (id) => {
    await sendFriendRequest("Sending freind request...", {userId: id});
  
  };

  const searchCloseHandler = () => {
    dispatch(setisSearch(false));
  };
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => {
          // Map through the users and extract the correct name
          const mappedUsers =
            data?.users.map((user) => {
              // Use the name from `_id` if it exists, else use the direct name
              return {
                ...user,
                name: user._id?.name || user.name,
              };
            }) || [];

          setUsers(mappedUsers);
        })
        .catch((e) => console.error("Error fetching users:", e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  /*useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => {
          console.log("Fetched data:", data);
          setUsers(data.users);
        })
        .catch((e) => console.log(e));
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);*/

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          lable=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((i) => (
            <UserItem
              user={i}
              key={typeof i._id === "object" ? JSON.stringify(i._id) : i._id}
              handler={addFreindHandler}
              handlerIsLoading={isLoadingSendFreindRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
