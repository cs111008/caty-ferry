
import { Redirect, Route, Switch } from 'react-router-dom';
import { Home, Upload } from './index';
import { CatContext } from '../contexts/cat.context';
import useCatContextValue from '../hooks/use-cat-context-value.hook'

const AppRoute = () => {

    const catContextValue = useCatContextValue();

    return (
        <CatContext.Provider value={catContextValue}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/upload" component={Upload} />
                <Redirect to="/" />
            </Switch>
        </CatContext.Provider>
    )

}
export default AppRoute;