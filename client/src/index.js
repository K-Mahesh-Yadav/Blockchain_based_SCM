import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Web3 from 'web3';
import context from "./Components/Context";

// import dotenv from 'dotenv';

// dotenv.config()

const root = ReactDOM.createRoot(document.getElementById('root'));
async function set() {
  const ethereum = window.ethereum;
  if (window.ethereum !== undefined) {
    await ethereum.request({ method: 'eth_requestAccounts' });
    // accountobj=accounts[0];
  }

  const web3 = new Web3(window.ethereum);

  let Abi=[
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "j",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "x",
          "type": "string"
        }
      ],
      "name": "Approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "j",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "x",
          "type": "string"
        }
      ],
      "name": "ASC",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "u",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "p",
          "type": "string"
        },
        {
          "internalType": "int256",
          "name": "n1",
          "type": "int256"
        },
        {
          "internalType": "string",
          "name": "x",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "y",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "z",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "a",
          "type": "string"
        }
      ],
      "name": "push_element",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "id",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "prod",
              "type": "string"
            },
            {
              "internalType": "int256",
              "name": "n",
              "type": "int256"
            },
            {
              "internalType": "string",
              "name": "date",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "prod_id",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "uid",
              "type": "string"
            }
          ],
          "internalType": "struct demoArray.l2",
          "name": "x",
          "type": "tuple"
        },
        {
          "internalType": "uint256",
          "name": "j",
          "type": "uint256"
        }
      ],
      "name": "Spush_element",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "j",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "s",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "id",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "prod",
              "type": "string"
            },
            {
              "internalType": "int256",
              "name": "n",
              "type": "int256"
            },
            {
              "internalType": "string",
              "name": "date",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "prod_id",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "uid",
              "type": "string"
            }
          ],
          "internalType": "struct demoArray.l2",
          "name": "x",
          "type": "tuple"
        }
      ],
      "name": "update",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "arr",
      "outputs": [
        {
          "internalType": "string",
          "name": "id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "prod",
          "type": "string"
        },
        {
          "internalType": "int256",
          "name": "n",
          "type": "int256"
        },
        {
          "internalType": "string",
          "name": "date",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "status",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "status1",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "prod_id",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMyStructs",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "id",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "prod",
              "type": "string"
            },
            {
              "internalType": "int256",
              "name": "n",
              "type": "int256"
            },
            {
              "internalType": "string",
              "name": "date",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "status1",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "prod_id",
              "type": "string"
            }
          ],
          "internalType": "struct demoArray.l1[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "len",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "Sarr",
      "outputs": [
        {
          "internalType": "string",
          "name": "id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "prod",
          "type": "string"
        },
        {
          "internalType": "int256",
          "name": "n",
          "type": "int256"
        },
        {
          "internalType": "string",
          "name": "date",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "status",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "prod_id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "uid",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "SgetMyStructs",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "id",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "prod",
              "type": "string"
            },
            {
              "internalType": "int256",
              "name": "n",
              "type": "int256"
            },
            {
              "internalType": "string",
              "name": "date",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "prod_id",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "uid",
              "type": "string"
            }
          ],
          "internalType": "struct demoArray.l2[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "Slen",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  
//   let Address = "0x535aE060C30085121CB8379253347B97810dFB63";

  let contractobj = new web3.eth.Contract(Abi, process.env.REACT_APP_Address);

  root.render(
    // <React.StrictMode>
      <context.Provider value={{ contract: contractobj}}>
        <App />
      </context.Provider>
    // </React.StrictMode>
  );
}
set();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
