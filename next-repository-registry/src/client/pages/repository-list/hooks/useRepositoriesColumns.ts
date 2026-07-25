import {TableColumnConfig} from '@gravity-ui/uikit';

import {Repository} from '../types';

export const useRepositoriesColumns: () => TableColumnConfig<Repository>[] = () => {
    return [
        {
            id: 'name',
            /** Column name (header). By default: column ID */
            name: 'name',
            /** CSS-class that will be added to all cells in the column. */
            // className?: string;
            /** Stub in the event there is no data in a cell. By default: — (&mdash;) */
            // placeholder?: string | ((item: I, index: number) => React.ReactNode);
            /** Cell contents. If you pass a row, the cell contents will be the value of the field named the same as this row. By default: The value of the field with the name equal to the column ID */
            // template?: string | ((item: I, index: number) => React.ReactNode);
            template: (item) => item.name,
            /** Content alignment. */
            // align?: 'start' | 'end' | 'center' | 'left' | 'right';
            /** Sticky column. */
            // sticky?: 'start' | 'end' | 'left' | 'right';
            /** Distinguishes a column among other. */
            // primary?: boolean;
            /** Column width in px or in %. Width can behave unexpectedly (it's more like min-width in block-elements). Sometimes you want to use `table-layout: fixed` */
            // width?: number | string;
            /** Various data, HOC settings. */
            // meta?: Record<string, any>;
        },
        {
            id: 'full_name',
            name: 'full_name',
            template: (item) => item.full_name,
        },
    ];
};
