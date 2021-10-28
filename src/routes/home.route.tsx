import useCatActions from '../hooks/use-cat-actions.hook';
import useCatsLoading from '../hooks/use-cats-loading.hook';
import { CardList, Loader } from '../componets';


const Home = () => {
    const { isLoading } = useCatActions();
    useCatsLoading();

    return isLoading ? <Loader /> : <CardList />
}
export default Home;