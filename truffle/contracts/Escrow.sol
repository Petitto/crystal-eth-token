pragma solidity ^0.6.6;

contract Escrow {
    mapping (address => uint) private balances;
    address public owner;
    
     // Log the event about a deposit being made by an address and its amount
    event LogDepositMade(address indexed accountAddress, uint amount);
    
    constructor() public {
        owner = msg.sender;
    }
    
    // Deposit ether into bank, requires method is "payable"
    // The balance of the user after the deposit is made
    function deposit() public payable returns (uint) {
        balances[msg.sender] += msg.value;
        emit LogDepositMade(msg.sender, msg.value);
        return balances[msg.sender];
    }

    // Withdraw ether from bank
    // The balance remaining for the user
    function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
        // Check enough balance available, otherwise just return balance
        if (withdrawAmount <= balances[msg.sender]) {
            balances[msg.sender] -= withdrawAmount;
            msg.sender.transfer(withdrawAmount);
        }
        return balances[msg.sender];
    }

    // Just reads balance of the account requesting, so "constant"
    // The balance of the user
    function balance() public view returns (uint) {
        return balances[msg.sender];
    }

    // The balance of the Simple Bank contract
    function depositsBalance() public view returns (uint) {
        return address(this).balance;
    }
}