import { Routing } from 'pages';
import { withProviders } from './providers';

import './styles/index.scss';

const App = () => (
  <div className='app'>
    <Routing />
  </div>
);

export default withProviders(App);
