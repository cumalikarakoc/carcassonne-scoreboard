import React, {FC} from "react"
import styled from "styled-components"
import {RoundedButton} from './styles/Buttonts';

const Container = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh; 
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.7);
`
const Dialog = styled.div`
    position: relative;
    min-width: 70%;
    min-height: 15%;
    padding: 25px;
    background-color: white;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    border-radius: 8px;
`
const DialogTitle = styled.span`
    display: inline-block;
    padding-bottom: 5px;
    font-weight: bold;
`
const ExitButton = styled(RoundedButton)`
    position: absolute;
    top: 5px;
    right: 5px;
    display: block;
    height: 30px;
    width: 30px;
    padding: 0;
`

interface IProps {
    title: string,
    closeDialog: () => void
}

export const ActionModal: FC<IProps> = ({children, title, closeDialog}) => {
    return <div>
        <Container onClick={closeDialog}>
            <Dialog onClick={e => e.stopPropagation()}>
                <ExitButton role="default" onClick={closeDialog}>x</ExitButton>
                <DialogTitle>{title}</DialogTitle>
                {children}
            </Dialog>
        </Container>
    </div>
}
