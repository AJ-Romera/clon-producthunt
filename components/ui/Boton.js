import styled from '@emotion/styled';

const Boton = styled.a`
    display: inline-block;
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    border-radius: 3px;
    padding: 0.8rem 2rem;
    margin: 2rem 1rem 2rem 0;
    text-align: center;
    background-color: ${(props) => (props.bgColor ? '#DA552F' : 'white')};
    color: ${(props) => (props.bgColor ? 'white' : '#000')};
    border-color: ${(props) => (props.bgColor ? 'red' : 'var(--gris3)')};
    box-shadow: ${(props) =>
        props.bgColor ? '0 2px 1px 0 rgb(0 0 0 / 20%)' : 'none'};

    &:last-of-type {
        margin-right: 0;
    }

    &:hover {
        cursor: pointer;
    }
`;

export default Boton;
