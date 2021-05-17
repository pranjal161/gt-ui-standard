import routes, { applyRoutes } from './routes';

import { MemoryRouter } from 'react-router-dom'

// import { render } from '@testing-library/react';

const routerNodes = applyRoutes(routes);
// const renderWithRouter = (ui, { route = '/' } = {}) => {
//     window.history.pushState({}, 'Test page', route)
  
//     return render(ui, { wrapper: MemoryRouter })
// }

test('Landing on Page that doesnt exist', () => {
    // const { container } = renderWithRouter(routerNodes, { route: '/something-that-does-not-match' })
    // normally I'd use a data-testid, but just wanted to show this is also possible
    // expect(container.innerHTML).toMatch('No match')
});