import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    TimesOneMobiledata,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend2";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import axios from "axios";
import swal from 'sweetalert'

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)
    const [data, setData] = useState()

    useEffect(() => {
        axios({
            url: 'http://localhost:6001/notices/all/verified', 
            method: 'get', 
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            setData(res.data)
        }).catch(err => {
            swal('something went wrong')
            console.log(err)
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {data?.map(  
                (item) => (
                    <PostWidget
                        title={item.title}
                        description={item.description}
                        // key={_id}
                        // postId={_id}
                        // postUserId={userId}
                        // name={`${firstName} ${lastName}`}
                        // description={description}
                        // location={location}
                        // picturePath={picturePath}
                        // userPicturePath={userPicturePath}
                        // likes={likes}
                        // comments={comments}
                    />
                )
            )}
        </>
    )
}


const PostWidget = ({ postUserId,description, location, 
                       picturePath, userPicturePath, title }) => {
    
    const { palette } = useTheme()
    const neutralMain = palette.neutral.main 

    return (
        <WidgetWrapper m="2rem 0" >
            <Friend 
                friendId={postUserId}
                name={title}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={neutralMain} sx={{mt: "1rem"}}>
                {description}
            </Typography>
            <FlexBetween mt="0.25rem">
                <IconButton> 
                    <ShareOutlined /> 
                </IconButton>
                <Typography>Notified By: </Typography>
            </FlexBetween>
        </WidgetWrapper>
    )
}


export default PostsWidget