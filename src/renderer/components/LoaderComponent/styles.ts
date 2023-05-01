import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;

    width: 100%;
    overflow: auto;

    justify-content: center;
    align-items: center;
`;

export const Loader = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 10%;
    position: relative;
    background: linear-gradient(0deg, rgba(255, 61, 0, 0.2) 33%, #ff3d00 100%);
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    &&::after {
        content: '';  
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 96px;
        height: 96px;
        border-radius: 50%;
        background: #263238;
    }   

    @keyframes rotation {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg)}
    } 
`;