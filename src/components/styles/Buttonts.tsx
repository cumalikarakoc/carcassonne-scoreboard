import styled from 'styled-components';

const roleColors: {[key: string]: string} = {
    'primary': '#4A92E6',
    'error': 'rgb(229, 57, 53)',
    'success': 'green',
}

export const RoundedButton = styled.button`
  background-color: ${props => roleColors[props.role || 'primary']};
  color: white;
  border-radius: 25px;
  padding: 8px 15px;
  border: none;
  display: inline-block;
  font-size: inherit;
  cursor: pointer;
`;
