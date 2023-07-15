import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import context from "../../Components/Context";
import { useLocation } from 'react-router-dom';
import axios from "axios";

const RequestReceived = () => {
	const { contract } = useContext(context);
	const user = useLocation().state.userData;
	const x = user;
	const account = useLocation().state.account;
	const [data, setData] = useState([]);
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await contract.methods.getMyStructs().call();
			const z = await axios.get(`http://localhost:4000/Details?param1=ADST`, { withCredentials: true });
			const z1 = await axios.get(`http://localhost:4000/Details?param1=DDST`, { withCredentials: true });
			const y = z.data;
			const y1 = z1.data;
			const d1 = await contract.methods.SgetMyStructs().call();

			const tableData = [];

			for (let i = 0; i < fetchedData.length; i++) {
				let c = 1;
				let count = 0;
				let f = 0;
				if (fetchedData[i][5] !== 'Approved') {
					let l;
					for (let j = 0; j < y.length; j++) {
						if (fetchedData[i][0] === y[j].Name) {
							l = y[j].Id1;
							break;
						}
					}

					let n;
					for (let j = 0; j < y1.length; j++) {
						if (l == y1[j].Id) {
							l = y1[j].Name;
						}
						if (x === y1[j].Name) {
							n = y1[j].Id;
						}
					}

					for (let j = 0; j < y.length; j++) {
						if (n == y[j].Id1) {
							count++;
							for (let k = 0; k < d1.length; k++) {
								if (d1[k][6] === y[j].Name && d1[k][5] === fetchedData[i][6]) {
									c++;
									f = 1;
								}
							}
						}
					}

					if (fetchedData[i][5] === 'ASC') {
						count += 1;
					}
					if (c !== count) {
						if (((l === x && fetchedData[i][4] !== x && fetchedData[i][4] !== 'Approved') || (fetchedData[i][5] === 'ASC' && fetchedData[i][4] !== x)) && f !== 1) {
							tableData.push([
								fetchedData[i][0],
								fetchedData[i][1],
								fetchedData[i][2],
								fetchedData[i][3],
								fetchedData[i][4],
								"Forward To Units",
								i
							]);
						}
					} else {
						if (((l === x && fetchedData[i][4] !== 'ASC' && fetchedData[i][5] !== 'Approved') || (fetchedData[i][5] === 'ASC' && f !== 1))) {
							tableData.push([
								fetchedData[i][0],
								fetchedData[i][1],
								fetchedData[i][2],
								fetchedData[i][3],
								fetchedData[i][4],
								"Forward To DGST",
								i
							]);
						}
					}
				}
			}
			setData(fetchedData);
			setTableData(tableData);
		};

		fetchData();
	}, [contract, x]);

	const handleQuote = async (i) => {

		const arr = [];
		if (data[i][4] === x) {
			arr[0] = data[i][0];
			arr[1] = data[i][1];
			arr[2] = data[i][2];
			arr[3] = data[i][3];
			arr[4] = 'Forwarded to Asc';
			arr[5] = data[i][6];
			arr[6] = x;

			await contract.methods.update(i, 'ASC', arr).send({ from: account }).then(function (result) {
				axios.post("http://localhost:4000/SendTransactions", { Name: x, Date: new Date(), From: result.from, To: result.to, GasUsed: result.gasUsed, Transaction_Hash: result.transactionHash }, { withCredentials: true });
				setTimeout(() => {
					window.location.reload();
				}, 2000);
				toast.success('Transction Success', {
					position: "bottom-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			}).catch(function (tx) {
				toast.error('Transction Failed', {
					position: "bottom-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				console.log(tx);
			});
		} else {
			arr[0] = data[i][0];
			arr[1] = data[i][1];
			arr[2] = data[i][2];
			arr[3] = data[i][3];
			arr[4] = 'Forwarded to units';
			arr[5] = data[i][6];
			arr[6] = x;

			await contract.methods.update(i, x, arr).send({ from: account }).then(function (result) {
				axios.post("http://localhost:4000/SendTransactions", { Name: x, Date: new Date(), From: result.from, To: result.to, GasUsed: result.gasUsed, Transaction_Hash: result.transactionHash }, { withCredentials: true });
				toast.success('Transction Success', {
					position: "bottom-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			}).catch(function (tx) {
				toast.error('Transction Failed', {
					position: "bottom-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				console.log(tx);
			});
		}
	};

	return (
		<div className="container">
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<br /><br /><br />
			<div>
				<h2 style={{ textAlign: 'center', margin: "20px 20px 20px" }}>Request Received</h2>
				{tableData.length === 0 && <b>No requests Available.</b>}
				{tableData.length !== 0 &&
					<div className="row">
						{tableData.map((item, index) => (
							<div className='col-md-6 mb-6 p-3 ' key={index}>
								<div className="card">
									<div className="card-body shadow ">
										<h5 className="card-title ms-5 mb-3 --bs-primary-text-emphasis ">From : {item[0]}</h5>
										<h6 className="card-subtitle mb-2 text-muted">Product Name : {item[1]}</h6>
										<p className="card-text">Quantity : {item[2]}</p>
										<p className="card-text">Date : {item[3]}</p>
										<p className="card-text text-success-emphasis" >Status : {item[4]}</p>
										<div className="d-flex justify-content-between">
											<Button className="btn btn-primary" onClick={() => handleQuote(item[6])}>
												{item[5]}
											</Button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				}
			</div>
		</div >
	);
}

export default RequestReceived;