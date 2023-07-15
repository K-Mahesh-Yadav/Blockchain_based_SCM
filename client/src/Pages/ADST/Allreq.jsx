import React, { useEffect, useContext, useState, useRef } from 'react';
import context from '../../Components/Context';
import { useLocation } from 'react-router-dom';
import 'datatables.net';
import $ from 'jquery';

const Allreq = () => {
	const { contract } = useContext(context);
	const [TableData, setTableData] = useState([]);
	const [RTableData, setRTableData] = useState([]);
	const location = useLocation();
	const x = location.state.userData;
	// const account = location.state.account.toLowerCase();
	const RtableRef = useRef(null);
	const tableRef = useRef(null);

	useEffect(() => {
		const get = async () => {
			const data = await contract.methods.getMyStructs().call();
			const rejdata = await contract.methods.SgetMyStructs().call();

			let tabledata = [];
			for (let i = 0; i < data.length; i++) {
				if (x === data[i][0]) {
					tabledata.push([
						data[i][6],
						data[i][1],
						data[i][2],
						data[i][3],
						data[i][4],
						data[i][5],
					]);
				}
			}
			setTableData(tabledata);

			let Rtabledata = [];
			for (let i = 0; i < rejdata.length; i++) {
				if (x === rejdata[i][6]) {
					Rtabledata.push([
						rejdata[i][5],
						rejdata[i][0],
						rejdata[i][1],
						rejdata[i][2],
						rejdata[i][3],
						rejdata[i][4],
					]);
				}
			}
			setRTableData(Rtabledata);
		};

		get();
	}, []);

	useEffect(() => {
		if (RTableData.length > 0) {
			$(RtableRef.current).DataTable();
		}
		if (TableData.length > 0) {
			$(tableRef.current).DataTable();
		}
	}, [RTableData, TableData]);

	return (
		<>
			<div className="container">
			<button type='button' onClick={()=>{
				window.print(); 
				window.close();}
				}>print</button>
				{TableData.length!== 0 && <h5 style={{ textAlign: 'center', marginTop: '10vh' }}>Requests you Posted</h5>}
				{TableData.length!== 0 && 
				
				<div className="table-responsive">
					<table className="table table-hover table-bordered " ref={tableRef}>
						<thead>
							<tr>
								<th>Request Id</th>
								<th>Product Name</th>
								<th>Quantity</th>
								<th>Date</th>
								<th>Approved by</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{TableData.map((item, index) => (
								<tr key={index}>
									<td>{item[0]}</td>
									<td>{item[1]}</td>
									<td>{item[2]}</td>
									<td>{item[3]}</td>
									<td>
										<b>{item[4]}</b>
									</td>
									<td>
										{item[5] === 'Approved' ? (
											<b style={{ color: 'green' }}>{item[5]}</b>
										) : item[5] === 'Rejected' ? (
											<b style={{ color: 'red' }}>{item[5]}</b>
										) : (
											item[5]
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>}

				<h5 style={{ textAlign: 'center', marginTop: '10vh' }}>Requests you Received</h5>

				<div className="table-responsive">
					<table className="table table-hover table-bordered" ref={RtableRef}>
						<thead>
							<tr>
								<th>Request Id</th>
								<th>Requested by</th>
								<th>Product Name</th>
								<th>Quantity</th>
								<th>Date</th>
								<th>Your Response</th>
							</tr>
						</thead>
						<tbody>
							{RTableData.map((item, index) => (
								<tr key={index}>
									<td>{item[0]}</td>
									<td>{item[1]}</td>
									<td>{item[2]}</td>
									<td>{item[3]}</td>
									<td>{item[4]}</td>
									<td>
										{item[5] === 'Approved' ? (
											<b style={{ color: 'green' }}>{item[5]}</b>
										) : (
											<i>{item[5]}</i>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default Allreq;
