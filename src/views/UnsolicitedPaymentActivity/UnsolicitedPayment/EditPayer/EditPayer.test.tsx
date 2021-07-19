// import EditPayer, { EditPayerProps } from './EditPayer';

import { render, screen } from '@testing-library/react';

import EditPayer from './EditPayer';
import React from 'react';

// import EditPayerActions from './components/EditPayerActions/EditPayerActions';
// import EditPayerContent from './components/EditPayerContent/EditPayerContent';

// const setup = ({isVisible, setIsVisible, onChange}: EditPayerProps) => (
//     <EditPayer 
//         isVisible={isVisible}
//         setIsVisible={setIsVisible}
//         onChange={onChange}
//     />
// )

test('EditPayer rendered without errors', () => {
    // const mockOnChange = jest.fn();
    // const mockSetVisibile = jest.fn();

    // let wrapper = setup({isVisible: true, setIsVisible: mockSetVisibile, onChange: mockOnChange});

    render(<EditPayer isVisible={true} setIsVisible={() => undefined} onChange={() => undefined} />);

    const el = screen.findByTestId('component-editpayer');
    console.log({el});
});