pragma solidity >=0.4.0;

contract demoArray {
    struct l1 {
        string id;
        string prod;
        int256 n;
        string date;
        string status;
        string status1;
        string prod_id;
    }
    l1[] public arr;
    uint256 i = 0;

    function push_element(
        string memory u,
        string memory p,
        int256 n1,
        string memory x,
        string memory y,
        string memory z,
        string memory a
    ) public {
        l1 memory s1;
        s1.id = u;
        s1.prod = p;
        s1.n = n1;
        s1.date = x;
        s1.status = y;
        s1.status1 = z;
        s1.prod_id = a;
        arr.push(s1);
    }

    function update(
        uint256 j,
        string memory s,
        l2 memory x
    ) public {
        arr[j].status = s;
        Spush_element(x,j);
        if(keccak256(bytes(s)) == keccak256(bytes("ASC")) && keccak256(bytes(x.status)) != keccak256(bytes("Forwarded to Asc"))){
            ASC(j,s);
        }
    }

    function Approve(uint256 j, string memory x) public {
        arr[j].status = x;
        arr[j].status1 = "Approved";
    }

    function ASC(uint256 j, string memory x) public {
        arr[j].status = x;
        arr[j].status1 = "ASC";
    }

    function getMyStructs() public view returns (l1[] memory) {
        return arr;
    }

    function len() public view returns (uint256) {
        return arr.length;
    }

    struct l2 {
        string id;
        string prod;
        int256 n;
        string date;
        string status;
        string prod_id;
        string uid;
    }
    l2[] public Sarr;

    function Spush_element(
        l2 memory x,
        uint256 j
    ) public {
        l2 memory s2;
        s2.id = x.id;
        s2.prod = x.prod;
        s2.n = x.n;
        s2.date = x.date;
        s2.status = x.status;
        s2.prod_id = x.prod_id;
        s2.uid = x.uid;
        Sarr.push(s2);
        if (keccak256(bytes(x.status)) == keccak256(bytes("Approved"))) {
            Approve(j, x.uid);
        }
    }

    function SgetMyStructs() public view returns (l2[] memory) {
        return Sarr;
    }

    function Slen() public view returns (uint256) {
        return Sarr.length;
    }
}
