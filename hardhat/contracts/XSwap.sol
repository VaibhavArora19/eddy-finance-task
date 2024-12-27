//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IERC20 {
    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

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

    event Deposit(
        address indexed depositor,
        address indexed recipient,
        uint256 originChainId,
        uint256 destinationChainId,
        address inputToken,
        address outputToken,
        uint256 inputAmount
    );

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

        bool transferSuccess = IERC20(_inputToken).transferFrom(
            msg.sender,
            address(this),
            _inputAmount
        );

        require(transferSuccess, "TransferFrom failed");

        bool approveSuccess = IERC20(_inputToken).approve(
            address(spokePool),
            _inputAmount
        );

        require(approveSuccess, "Approve failed");

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
