import {Table} from '@gravity-ui/uikit';

import {useAppSelector} from '@/client/shared/store';

import {useRepositoriesColumns} from '../../hooks';
import {selectRepositories, selectRepositoryList} from '../../model';

export const RepositoriesTable = () => {
    const columns = useRepositoriesColumns();
    const data = useAppSelector(selectRepositories);
    const data2 = useAppSelector(selectRepositoryList);

    console.log('data = ', data);
    console.log('data2 = ', data2);
    console.log('columns = ', columns);

    return <Table data={data} columns={columns} />;
};
