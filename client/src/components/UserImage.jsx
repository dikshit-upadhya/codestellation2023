import { Box } from "@mui/material";
import doge from "../../src/assets/doge.png";

const UserImage = ({ image, size = "60px" }) => {
	return (
		<Box width={size} height={size}>
			<img
				style={{ objectFit: "cover", borderRadius: "50%" }}
				width={size}
				height={size}
				alt="user"
				// src={`http://localhost:6001/assets/${image}`}
				src={doge}
			/>
		</Box>
	);
};

export default UserImage;
