import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function createData(id, promote, createdAt) {
	return { id, promote, createdAt };
}

const rows = [
	createData(1, "Snow", "Jon"),
	createData(2, "Lannister", "Cersei"),
	createData(3, "Lannister", "Jaime"),
];

function PromotionPage() {
	return (
		<div
			className="p-16"
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-end",
			}}
		>
			<Button
				variant="contained"
				color="success"
				style={{ width: "130px", marginBottom: "16px" }}
			>
				Thêm ưu đãi
			</Button>

			<TableContainer component={Paper}>
				<Table
					sx={{ minWidth: 650 }}
					size="small"
					aria-label="promotion dense table"
				>
					<TableHead>
						<TableRow>
							<TableCell align="center">ID</TableCell>
							<TableCell align="center">Tên ưu đãi</TableCell>
							<TableCell align="center">Ngày tạo&nbsp;</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.name}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								style={{ padding: "8px" }}
							>
								<TableCell
									align="center"
									component="th"
									scope="row"
									width="10%"
								>
									{row.id}
								</TableCell>
								<TableCell align="center" width="50%">
									{row.promote}
								</TableCell>
								<TableCell align="center" width="40%">
									{row.createdAt}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default PromotionPage;
