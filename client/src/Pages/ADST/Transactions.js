import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import $ from 'jquery';


const CardList = () => {
    const [data, setData] = useState([]);
    const location = useLocation();
    const x = location.state.userData;
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/getTransactions?param1=${x}`);
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            $(tableRef.current).DataTable();
        }
    }, [data]);

    return (
        <div className="container">
            <button type='button' onClick={()=>{
				window.print(); 
				window.close();}
				}>print</button>
            <h5 style={{ textAlign: 'center', marginTop: '10vh' }}>Your Transaction History</h5>
            <div className='table-responsive'>
                <table className="table table-hover table-bordered" ref={tableRef}>
                    <thead>
                        <tr>
                            <th>Transaction Date</th>
                            <th>From Address</th>
                            <th>To Address</th>
                            <th>Gas Used</th>
                            <th>Transaction Hash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter((item) => item.Name === x).map((item) => (
                            // <div className="col-md-6 mb-6 p-3" key={item._id}>
                            //     <div className="card ">
                            //         <div className="card-body shadow">
                            //             <h5 className="card-title">{item.Name}</h5>
                            //             <h6 className="card-subtitle mb-2 text-muted">{item.Date}</h6>
                            //             <p className="card-text">
                            //                 <strong>From:</strong> {item.From}
                            //                 <br />
                            //                 <strong>To:</strong> {item.To}
                            //                 <br />
                            //                 <strong>Gas Used:</strong> {item.GasUsed}
                            //                 <br />
                            //                 <strong>Transaction Hash:</strong> {item.Transaction_Hash}
                            //             </p>
                            //         </div>
                            //     </div>
                            // </div>
                            <tr key={item._id}>
                                <td className='text-wrap text-break'>{item.Date}</td>
                                <td className='text-wrap text-break'>{item.From}</td>
                                <td className='text-wrap text-break'>{item.To}</td>
                                <td className='text-wrap text-break'>{item.GasUsed}</td>
                                <td className='text-wrap text-break'>{item.Transaction_Hash}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default CardList;
