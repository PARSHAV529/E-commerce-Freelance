import { Button, ButtonGroup, styled } from "@mui/material";

const Component = styled(ButtonGroup)`
    margin-top: 20px;
`;

const StyledButton = styled(Button)`
    border-radius: 50%;
`;

const GroupButton = ({ quantity, onIncrease, onDecrease }) => {
    return (
        <Component>
            <StyledButton onClick={onDecrease}>-</StyledButton>
            <StyledButton disabled>{quantity}</StyledButton>
            <StyledButton onClick={onIncrease}>+</StyledButton>
        </Component>
    );
};

export default GroupButton;
