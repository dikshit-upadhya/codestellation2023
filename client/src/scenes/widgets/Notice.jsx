import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import swal from 'sweetalert'
import axios from 'axios'

/**
 * @param picturePath: path of the user profile photo
 * 
 * Widget component for creating a new post
 */
const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch()
    //used to determine if the user clicks the image button to drop an image or not
    const [isImage, setIsImage] = useState(false)
    //actual image
    const [image, setImage] = useState(null)
    //post content
    const [post, setPost] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const { palette } = useTheme()
    const { _id } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
    const mediumMain = palette.neutral.mediumMain
    const medium = palette.neutral.medium

    //handles post api call
    const handlePost = async () => {
        // const formData = new FormData()
        // formData.append("userId", _id)
        // //post description, not post call
        // formData.append("description", post)
        // if (image) {
        //     //if theres an image, append it too
        //     formData.append("picture", image)
        //     formData.append("picturePath", image.name)
        // }

        // const response = await fetch(`http://localhost:6001/posts`, {
        //     method: "POST",
        //     headers: { Authorization: `Bearer ${token}`},
        //     body: formData
        // })
        
        // const posts = await response.json()
        // dispatch(setPosts({ posts })) //set our posts state

        // //reset 
        // setImage(null)
        // setPost("")

        axios({
            url: 'http://localhost:6001/notices',
            method: 'post', 
            headers: { Authorization: `Bearer ${token}`},
            data: {
                title, 
                description
            }
        }).then(res => {
            swal('Perfect!', 'The notice was created succesfully. It will be visible once it is verified by the Admin', 'success')
            console.log(res)
        }).catch(err => {
            swal('Oops', 'Something went wrong', 'info')
        })

        setTitle("")
        setDescription("")
    }




    return (
        <WidgetWrapper>
                <InputBase 
                    placeholder="Notification Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem"
                    }}
                />
                <InputBase 
                    placeholder="Enter the Notification Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                        marginTop: '30px'
                    }}
                />
            {isImage && (
                <Box
                    borderRadius="5px"
                    border={`1px solid ${medium}`}
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false} //no multiple files
                        onDrop={(acceptedFiles) => //what we do with file
                            setImage(acceptedFiles[0])
                        } 
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {/**If the picture does not exist yet then... */}
                                    {!image ? (<p>Add Image Here</p>) : 
                                    (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {/**Trash Icon */}
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{ width: "15%" }}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0"}} />
            
            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{color: mediumMain}} />
                    <Typography
                        color={mediumMain}
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                color: medium
                            }
                        }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobileScreens ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{color: mediumMain}} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{color: mediumMain}} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{color: mediumMain}} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                    ) : 
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{color: mediumMain}} />
                    </FlexBetween>
                }

                <Button
                    disabled={!title || !description}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem"
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default MyPostWidget