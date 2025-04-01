import { useAppSelector } from '../lib/Redux';
import {
    selectExtensionData,
    selectExtensionsMeta,
} from '../lib/Redux/selector';
import Card from './card';
import Tabs from './tabs';

const List = () => {
    const { error, loading } = useAppSelector(selectExtensionsMeta);
    const data = useAppSelector(selectExtensionData());

    return (
        <>
            <Tabs />
            {loading ? (
                <h2 className="text-xl font-bold text-in">Loading</h2>
            ) : (
                <>
                    {error ? (
                        <span className="text-xl font-bold text-accent-darkest">{`Error while fetching the extensions: ${error}`}</span>
                    ) : (
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 relative">
                            {data.map(_ext => (
                                <Card
                                    key={_ext.name}
                                    name={_ext.name}
                                    description={_ext.description}
                                    isActive={_ext.isActive}
                                    logo={_ext.logo}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default List;
