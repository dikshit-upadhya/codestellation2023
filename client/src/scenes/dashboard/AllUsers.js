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
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [data, setData] = React.useState();
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);

  React.useEffect(() => {
    axios({
      url: "http://localhost:6001/users/all",
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        swal(err.message);
        console.log(err);
      });
  }, []);

  const handleDelete = () => {
    axios({
      url: `http://localhost:6001/users/${_id}`,
      method: "delete",
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
		swal('Yayy!', 'The user was successfully deleted!', 'success')
	}).catch(err => {
		swal('Oops!', 'Something went wrong!', 'error')
	});
  };

  return (
    <React.Fragment>
      <Title>All Users List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Sl. NO.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data?.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.firstName + " " + row.lastName}</TableCell>
                <TableCell>{row.userType}</TableCell>
                <TableCell>
                  {row.verified ? "VERIFIED" : "UNVERIFIED"}
                </TableCell>
                <TableCell align="right">
                  {<Button
				  	disabled={_id == row._id}
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
					// onClick={() => console.log(_id, row.id)}
                  >
                    BLOCK & DELETE
                  </Button>}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
