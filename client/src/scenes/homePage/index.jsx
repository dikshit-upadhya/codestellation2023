import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import swal from "sweetalert";
// import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
	const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
	const { _id, picturePath, verified } = useSelector((state) => state.user);

	return (
		<Box>
			<Navbar />
			{verified ? (
				<Box
					width="100%"
					padding="2rem 6%"
					display={isNonMobileScreens ? "flex" : "block"}
					gap="0.5rem"
					justifyContent="space-between"
				>
					{/**Side Box*/}
					<Box
						flexBasis={
							isNonMobileScreens ? "26%" : undefined
						}
					>
						<UserWidget
							userId={_id}
							picturePath={picturePath}
						/>
					</Box>

					{/**Actual Posts */}
					<Box
						flexBasis={
							isNonMobileScreens ? "42%" : undefined
						}
						mt={isNonMobileScreens ? undefined : "2rem"}
					>
						<MyPostWidget picturePath={picturePath} />
						<PostsWidget user={_id} />
					</Box>
					{isNonMobileScreens && (
						<Box flexBasis="26%">
							{/**<AdvertWidget />
                        <Box m="2rem 0" /> */}
							<FriendListWidget userId={_id} />
						</Box>
					)}
				</Box>
			) : (
				<Box
					sx={{
						display: "flex",
						width: "100%",
						height: "100%",
						padding: "50px",
						justifyContent: "center",
						alignItems: "center",
						fontSize: "30px",
						fontFamily: "Arial, sans-serif",
						fontWeight: "bold",
					}}
				>
					Your account has not been verified yet as an
					ALUMNI. Please wait while the ADMIN verifies your
					account
				</Box>
			)}
		</Box>
	);
};

export default HomePage;
