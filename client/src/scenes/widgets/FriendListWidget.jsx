import { Box, Typography, useTheme } from "@mui/material";
import User from "components/User";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
	const [friends, setFriends] = useState()

	const dispatch = useDispatch();
	const { palette } = useTheme();
	const token = useSelector((state) => state.token);
	// const friends = useSelector((state) => state.user.friends);

	const getFriends = async () => {
		const response = await fetch(`http://localhost:6001/users/all`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		console.log(data)
		setFriends(data)
		// dispatch(setFriends({ friends: data }));
	};

	useEffect(() => {
		getFriends();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<WidgetWrapper>
			<Typography
				color={palette.neutral.dark}
				variant="h5"
				fontWeight="500"
				sx={{ mb: "1.5rem" }}
			>
				All Users
			</Typography>
			<Box display="flex" flexDirection="column" gap="1.5rem">
				{friends && friends.map((friend) => (
					<User
						key={friend._id}
						friendId={friend._id}
						name={`${friend.firstName} ${friend.lastName}`}
						subtitle={friend.userType}
						userPicturePath={friend.picturePath}
					/>
				))}
			</Box>
		</WidgetWrapper>
	);
};

export default FriendListWidget;
