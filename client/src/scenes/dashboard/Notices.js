import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { LineAxisOutlined } from "@mui/icons-material";
import axios from "axios";
import swal from 'sweetalert'
import { useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";


export default function Orders() {
	const [data, setData] = React.useState()
	const token = useSelector((state) => state.token);

	React.useEffect(() => {
		axios({
			url: "http://localhost:6001/notices/all",
			method: 'get', 
			headers: { Authorization: `Bearer ${token}` },
		}).then(res => {
			console.log(res)
			setData(res.data)
		}).catch(err => {
			swal(err.message)
			console.log(err)
		})
			
	}, [])

	const handleApprove = () => {
		axios({
			url: ''
		})
	}

	return (
		<React.Fragment>
            <Button sx={{marginBottom: '20px'}} variant="contained">+ CREATE NOTICE</Button>
			<Title>Recent Notice Requests</Title>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Sl. NO.</TableCell>
						<TableCell>Notice Title</TableCell>
						<TableCell>Notice Description</TableCell>
						<TableCell>Status</TableCell>
						<TableCell align="right">
							Actions
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data && data?.map((row, index) => (
						<TableRow key={row.id}>
							<TableCell>{index + 1}</TableCell>
							<TableCell>{row.title}</TableCell>
							<TableCell sx={{maxWidth:'300px'}} ><Typography>{row.description}</Typography></TableCell>
							<TableCell>
								{row.verified ? 'VERIFIED' : 'UNVERIFIED'}
							</TableCell>
							<TableCell align="right"><Button variant="contained" color="success" onClick={handleApprove} >APPROVE NOTICE </Button></TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</React.Fragment>
	);
}
