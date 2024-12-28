//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

//@dev interface for IERC20 token
interface IERC20 {
    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

//@dev interface for ISpokePool contract
interface ISpokePool {
    function fillDeadlineBuffer() external view returns (uint32);

    function depositV3(
        address depositor,
        address recipient,
        address inputToken,
        address outputToken,
        uint256 inputAmount,
        uint256 outputAmount,
        uint256 destinationChainId,
        address exclusiveRelayer,
        uint32 quoteTimestamp,
        uint32 fillDeadline,
        uint32 exclusivityDeadline,
        bytes calldata message
    ) external;
}

contract XSwap {
    ISpokePool public immutable spokePool;

    constructor(address _spokePool) {
        spokePool = ISpokePool(_spokePool);
    }

    //@dev event emitted when a deposit is made
    event Deposit(
        address indexed depositor,
        address indexed recipient,
        uint256 originChainId,
        uint256 destinationChainId,
        address inputToken,
        address outputToken,
        uint256 inputAmount
    );

    /**
     * @dev deposit function that is called when a user wants to make a deposit
     * @param _recipient address of the receiver
     * @param _inputToken input token address
     * @param _outputToken output token address
     * @param _inputAmount input token amount
     * @param _outputAmount output token amount
     * @param _destinationChainId destination chain id
     * @param _exclusiveRelayer address of the relayer provided by across in quote
     * @param _quoteTimestamp quote timestamp
     * @param _exclusivityDeadline exclusivity deadline provided by across in quote
     */
    function deposit(
        address _recipient,
        address _inputToken,
        address _outputToken,
        uint256 _inputAmount,
        uint256 _outputAmount,
        uint256 _destinationChainId,
        address _exclusiveRelayer,
        uint32 _quoteTimestamp,
        uint32 _exclusivityDeadline
    ) external {
        require(_inputAmount > 0, "Input amount must be greater than 0");
        require(_outputAmount > 0, "Output amount must be greater than 0");

        //transfer input token from user to contract
        bool transferSuccess = IERC20(_inputToken).transferFrom(
            msg.sender,
            address(this),
            _inputAmount
        );
        //check if transferFrom was successful
        require(transferSuccess, "TransferFrom failed");

        //approve the contract to spend the input token
        bool approveSuccess = IERC20(_inputToken).approve(
            address(spokePool),
            _inputAmount
        );

        //check if approve was successful
        require(approveSuccess, "Approve failed");

        //call deposit function on the spokePool contract
        spokePool.depositV3(
            msg.sender,
            _recipient,
            _inputToken,
            _outputToken,
            _inputAmount,
            _outputAmount,
            _destinationChainId,
            _exclusiveRelayer,
            _quoteTimestamp,
            uint32(block.timestamp) + spokePool.fillDeadlineBuffer(),
            _exclusivityDeadline,
            ""
        );

        uint256 currentChainId = block.chainid;

        //emit the deposit event
        emit Deposit(
            msg.sender,
            _recipient,
            currentChainId,
            _destinationChainId,
            _inputToken,
            _outputToken,
            _inputAmount
        );
    }

    receive() external payable {}

    fallback() external payable {}
}
