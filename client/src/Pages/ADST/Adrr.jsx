import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState, useContext } from 'react';
import context from '../../Components/Context';
import { useLocation } from 'react-router-dom';
import axios from "axios";

const Adrr = () => {
	const { contract } = useContext(context);
	const [tableData, setTableData] = useState([]);
	const location = useLocation();
	const { state } = location;
	const x = state.userData;
	const account = state.account;

	useEffect(() => {
		const fetchData = async () => {

			if (window.ethereum !== undefined) {
				const data = await contract.methods.getMyStructs().call();
				const z = await axios.get(`http://localhost:4000/Details?param1=ADST`, { withCredentials: true });
				const z1 = await axios.get(`http://localhost:4000/Details?param1=DDST`, { withCredentials: true });
				const y = z.data;
				const y1 = z1.data;
				const d1 = await contract.methods.SgetMyStructs().call();

				let d = '';
				for (let j = 0; j < y.length; j++) {
					if (x === y[j].Name) {
						d = y[j].Id1;
					}
				}

				for (let j = 0; j < y1.length; j++) {
					if (d == y1[j].Id) {
						d = y1[j].Name;
					}
				}

				const newTableData = [];
				for (let i = 0; i < data.length; i++) {
					let f = 0;
					let l = '';
					for (let j = 0; j < y.length; j++) {
						if (data[i][0] === y[j].Name) {
							l = y[j].Id1;
						}
					}
					for (let j = 0; j < y1.length; j++) {
						if (l == y1[j].Id) {
							l = y1[j].Name;
						}
					}

					for (let m = 0; m < d1.length; m++) {
						if (d1[m][5] === data[i][6] && d1[m][6] === x) {
							f = 1;
						}
					}

					if (
						(data[i][0] !== x && d === l && f === 0 && data[i][4] === d && data[i][5] !== 'Approved') ||
						(data[i][5] === 'ASC' && data[i][0] !== x && d !== l && f === 0 && data[i][4] === d)
					) {
						newTableData.push([data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], i]);
					}
				}

				setTableData(newTableData);
			}
		};

		fetchData();
	}, [account, contract, x]);

	const handleQuote = async (i) => {
		if (window.ethereum !== undefined) {
			const data = await contract.methods.getMyStructs().call();
			const arr = [
				data[i][0],
				data[i][1],
				data[i][2],
				data[i][3],
				'Approved',
				data[i][6],
				x,
			];
			await contract.methods.Spush_element(arr, i).send({ from: account }).then(function (result) {
				axios.post("http://localhost:4000/SendTransactions", { Name: x, Date: new Date(), From: result.from, To: result.to, GasUsed: result.gasUsed, Transaction_Hash: result.transactionHash }, { withCredentials: true });
				window.location.reload();
			}).catch(function (tx) {
				console.log(tx);
			});
		}
	};

	const handleReject = async (i) => {
		if (window.ethereum !== undefined) {
			const data = await contract.methods.getMyStructs().call();
			const arr = [
				data[i][0],
				data[i][1],
				data[i][2],
				data[i][3],
				'Rejected',
				data[i][6],
				x,
			];
			await contract.methods.Spush_element(arr, i).send({ from: account }).then(function (result) {
				axios.post("http://localhost:4000/SendTransactions", { Name: x, Date: new Date(), From: result.from, To: result.to, GasUsed: result.gasUsed, Transaction_Hash: result.transactionHash }, { withCredentials: true });
				window.location.reload();
			}).catch(function (tx) {
				console.log(tx);
			});
		}
	};

	return (
		<div className="container">
			<div>
				<h1 style={{ textAlign: 'center', marginTop: '100px' }}>Requests Received</h1>
				{/* {!tableData&& <b>No requests Available.</b>} */}
				{tableData.length > 0 ? (<div className="row">
					{tableData.map((data, index) => (
						<div className='col-md-6 mb-6 p-3 ' key={index}>
							<div className="card">
								<div className="card-body shadow">
									<h5 className="card-title ms-5 mb-3 --bs-primary-text-emphasis">From: {data[0]}</h5>
									<h6 className="card-subtitle mb-2 text-muted">Product Name: {data[1]}</h6>
									<p className="card-text">Quantity: {data[2]}</p>
									<p className="card-text">Date: {data[3]}</p>
									<p className="card-text">Status: {data[4]}</p>
									<div className="d-flex justify-content-between">
										<button onClick={() => handleQuote(data[5])} className="btn btn-success">
											Accept
										</button>
										<button onClick={() => handleReject(data[5])} className="btn btn-danger">
											Decline
										</button>
									</div>
								</div>
							</div>
						</div>

					))}
				</div>): (<b>No requests Available.</b>)}
				
			</div>
		</div >
	);
};

export default Adrr;
