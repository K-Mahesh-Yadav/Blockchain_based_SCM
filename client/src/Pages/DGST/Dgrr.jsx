import React, { useEffect, useContext, useState } from 'react';
import context from "../../Components/Context";
import { Button } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import axios from "axios";

const DgrrRequests = () => {
	const { contract } = useContext(context); // Replace YourContext with the actual context name
	const [data, setdata] = useState([]);
	const [TableData, setTableData] = useState([]);

	const x = useLocation().state.userData;
	const account = useLocation().state.account;

	useEffect(() => {
		get();
	}, []);

	const get = async () => {

		const datar = await contract.methods.getMyStructs().call();
		setdata(datar);
		const z = await axios.get(`http://localhost:4000/Details?param1=ADST`, { withCredentials: true });
		const z1 = await axios.get(`http://localhost:4000/Details?param1=DDST`, { withCredentials: true });
		const y = z.data;
		const y1 = z1.data;
		const d1 = await contract.methods.SgetMyStructs().call();

		let tabledata = [];
		let count = 0;

		for (let i = 0; i < datar.length; i++) {
			if (datar[i][5] !== 'Approved') {
				count = 0;
				let c = 0;
				let l, n;

				for (let j = 0; j < y.length; j++) {
					if (datar[i][0] === y[j].Name) {
						l = y[j].Id1;
					}
				}

				for (let j = 0; j < y1.length; j++) {
					if (l == y1[j].Id) {
						l = y1[j].Name;
					}
					if (x === y1[j].Name) {
						n = y1[j].Id;
					}
				}

				for (let k = 0; k < y.length; k++) {
					if (y[k].Id1 != n) {
						count++;
					}
				}

				count += y1.length - 2;

				for (let j = 0; j < y.length; j++) {
					for (let k = 0; k < d1.length; k++) {
						if (d1[k][6] === y[j].Name && d1[k][5] === datar[i][6]) {
							c++;
						}
					}
				}

				if (datar[i][5] === 'ASC') {
					c++;
				}

				console.log(datar);
				if (c === 1) {
					if (datar[i][4] === x && datar[i][5] !== 'Approved' && datar[i][5] !== x) {
						// tabledata += ` 
						//   <tr>
						//     <td>${datar[i][0]}</td>
						//     <td>${datar[i][1]}</td>
						//     <td>${datar[i][2]}</td>
						//     <td>${datar[i][3]}</td>
						//     <td>${datar[i][4]}</td>
						//     <td>
						//       <button onClick=${Approve(i)}>Approve</button>
						//       <button onClick=${quote(i)}>Forward To Divisions</button>
						//     </td>
						//   </tr>
						// `;
						tabledata.push([
							datar[i][0],
							datar[i][1],
							datar[i][2],
							datar[i][3],
							datar[i][4],
							"Approve",
							"Forward to Divisions",
							i
						]);
					}
				} else if (c === count) {

					if (datar[i][4] === 'ASC' || (1 && datar[i][4] !== 'manufacturer')) {
						// tabledata += ` 
						//   <tr>
						//     <td>${datar[i][0]}</td>
						//     <td>${datar[i][1]}</td>
						//     <td>${datar[i][2]}</td>
						//     <td>${datar[i][3]}</td>
						//     <td>${datar[i][4]}</td>
						//     <td>
						//       <button onclick="quote(${i})">Forward To Manufacturer</button>
						//     </td>
						//   </tr>
						// `;
						tabledata.push([
							datar[i][0],
							datar[i][1],
							datar[i][2],
							datar[i][3],
							datar[i][4],
							"Approve",
							"Forward To Manufacturer",
							i]);
					}
				}
			}

			setTableData(tabledata);
		}
	};

	const quote = async (i) => {

		const arr = [];
		if (data[i][4] === x && data[i][5] !== x) {
			arr[0] = data[i][0];
			arr[1] = data[i][1];
			arr[2] = data[i][2];
			arr[3] = data[i][3];
			arr[4] = 'Forwarded div';
			arr[5] = data[i][6];
			arr[6] = x;

			await contract.methods.update(i, x, arr).send({ from: account }).then(function (result) {
				axios.post("http://localhost:4000/SendTransactions", { Name: x, Date: new Date(), From: result.from, To: result.to, GasUsed: result.gasUsed, Transaction_Hash: result.transactionHash }, { withCredentials: true });
				window.location.reload();
			}).catch(function (tx) {
				console.log(tx);
			});
		} else {
			arr[0] = data[i][0];
			arr[1] = data[i][1];
			arr[2] = data[i][2];
			arr[3] = data[i][3];
			arr[4] = 'Forwarded manufacfurer';
			arr[5] = data[i][6];
			arr[6] = x;

			await contract.methods.update(i, 'manufacturer', arr).send({ from: account }).then(function (result) {
				axios.post("http://localhost:4000/SendTransactions", { Name: x, Date: new Date(), From: result.from, To: result.to, GasUsed: result.gasUsed, Transaction_Hash: result.transactionHash }, { withCredentials: true });
				window.location.reload();
			}).catch(function (tx) {
				console.log(tx);
			});
		}
	};

	const Approve = async (i) => {

		const arr = [];
		arr[0] = data[i][0];
		arr[1] = data[i][1];
		arr[2] = data[i][2];
		arr[3] = data[i][3];
		arr[4] = 'Approved';
		arr[5] = data[i][6];
		arr[6] = x;

		await contract.methods.Spush_element(arr, i).send({ from: account }).then(function (result) {
			axios.post("http://localhost:4000/SendTransactions", { Name: x, Date: new Date(), From: result.from, To: result.to, GasUsed: result.gasUsed, Transaction_Hash: result.transactionHash }, { withCredentials: true });
			window.location.reload();
		}).catch(function (tx) {
			console.log(tx);
		});
	};

	return (
		<div className="container">
			{/* <button type='button' onClick={()=>{
				window.print(); 
				window.close();}
				}>print</button> */}
			<br />
			<br />
			<br />
			<div>
				<h2 style={{ textAlign: 'center', margin: "20px 20px 20px" }}>Request Received</h2>
				{TableData.length === 0 && <b>No requests Available.</b>}
				{TableData.length !== 0 &&
					<div className="row">
						{TableData.map((item, index) => (
							<div className='col-md-6 mb-6 p-3 ' key={index}>
								<div className="card">
									<div className="card-body shadow">
										<h5 className="card-title ms-5 mb-3 --bs-primary-text-emphasis ">From: {item[0]}</h5>
										<h6 className="card-subtitle mb-2 text-muted">Product Name: {item[1]}</h6>
										<p className="card-text">Quantity: {item[2]}</p>
										<p className="card-text">Date: {item[3]}</p>
										<p className="card-text">Status: {item[4]}</p>
										<div className="d-flex justify-content-between">
											<Button onClick={() => Approve(item[7])}>
												{item[5]}
											</Button>
											<Button onClick={() => quote(item[7])}>
												{item[6]}
											</Button>
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

export default DgrrRequests;
