import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AppContainer = styled.div`
    margin: 0 auto;
    max-width: 900px;
    padding: 20px;
    font-family: Arial, sans-serif;
`;

export const Heading = styled.h2`
    text-align: center;
    font-size: 2rem;  
    color: #333;
    margin-bottom: 20px;  
`;

export const SubHeading = styled.h3`
    text-align: left;
    font-size: 1.5rem;  
    color: #333;
    margin-bottom: 10px;  
`;

export const Text = styled.p`
    font-size: 1.2rem;  
    color: #333;   
    margin-bottom: 20px;
`;

export const Nav = styled.nav`
    display: flex;
    justify-content: space-around;
    background-color: #007BFF;
    padding: 5px 0;

    .nav-link {
        color: white;
        text-decoration: none;
        padding: 10px 15px;

        &:hover {
            background-color: #0056b3;
            border-radius: 5px;
        }
    }
`;

/* Painike */
export const Button = styled.button`
    background-color: #007BFF;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;


export const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #007BFF;
    }
`;


export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 0 auto;

    label {
        margin-bottom: 5px;
        font-weight: bold;
    }

    input {
        margin-bottom: 10px;
    }

    button {
        align-self: flex-start;
    }
`;

export const UsersTableHeader = styled.th`
    text-align: left;
    padding: 10px;
    border-bottom: 2px solid #ccc;
`;

export const UsersTableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

export const UsersTableCell = styled.td`
    padding: 10px;
    border-bottom: 1px solid #ccc;
`;

export const UsersTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

export const StyledLink = styled(Link)`
    color: #007bff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const StyledList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const StyledListItem = styled.li`
    font-size: 1rem;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
`;