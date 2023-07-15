import React, { useContext, useEffect, useState } from 'react';
import context from '../../Components/Context';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Navbar from '../../Components/Navbar';

const Manufacturer = () => {
	const { contract } = useContext(context);
	const [tableData, setTableData] = useState([]);
	const x = useLocation().state.userData;
	const account = useLocation().state.account;

	useEffect(() => {
		fetchData();
	});

	const fetchData = async () => {

		const data = await contract.methods.getMyStructs().call();

		let filteredData = [];
		for (let i = 0; i < data.length; i++) {
			if ((data[i][4] === "manufacturer" && data[i][5] !== "Approved")) {
				filteredData.push([
					data[i][0],
					data[i][1],
					data[i][2],
					data[i][3],
					data[i][4],
					i
				]);
			}
		}
		setTableData(filteredData);
	};

	const handleApprove = async (i) => {
		await contract.methods.Approve(i, x).send({ from: account }).then(function (result) {
			axios.post("http://localhost:4000/SendTransactions", { Name: x, Date: new Date(), From: result.from, To: result.to, GasUsed: result.gasUsed, Transaction_Hash: result.transactionHash }, { withCredentials: true });
			window.location.reload();
		}).catch(function (tx) {
			console.log(tx);
		});
	};

	return (
		<div className="container">
			<Navbar x={x} />
			<br />
			<br />
			<br />
			<div >
				<h2 style={{ textAlign: 'center', margin: "20px 20px 20px" }}>Request Received</h2>
				{tableData.length ===0 && <b>No requests Available.</b>}
				{tableData.length !== 0 &&
					<div className="row ">
						{tableData.map((item, index) => (
							<div className='col-md-6 mb-6 p-3 ' key={index}>
								<div className="card">
									<div className="card-body shadow ">
										<h5 className="card-title ms-5 mb-3 --bs-primary-text-emphasis ">From: {item[0]}</h5>
										<h6 className="card-subtitle mb-2 text-muted">Product Name: {item[1]}</h6>
										<p className="card-text">Quantity: {item[2]}</p>
										<p className="card-text">Date: {item[3]}</p>
										<p className="card-text">Status: {item[4]}</p>
										<div className="d-flex justify-content-between">
											<button onClick={() => handleApprove(item[5])} className="btn btn-primary">
												Approve
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>}
			</div>
		</div>
	);
};

export default Manufacturer;
