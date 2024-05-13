//SPDX-License-Identifier:MIT
pragma solidity >=0.4.16 <0.9.0;

//EVM Ethereum Virtual Machine

contract SimpleStorage {
    //boolean,uint,int,address,bytes
    //atomatically intialized to zero
    uint256 favoriteNumber;
    mapping(string => uint256) public nameToFavoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }
    // uint256[] public favoriteNumbers;
    People[] public people;

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    //view mean only reads from the variables no modifications
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
