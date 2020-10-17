import React, { FC } from "react"
import styled from "styled-components"

const Container = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh; 
    background-color: rgba(0,0,0,0.7);
`

const Dialog = styled.div`
    padding: 10px;
    background-color: white;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`

interface IProps{
    onClick: () => void
}

export const ActionModal: FC<IProps> = ({ children, onClick }) => {
    return <div>
        <Container onClick={onClick}>
            <Dialog>
                {children}
            </Dialog>
        </Container>
    </div>
}