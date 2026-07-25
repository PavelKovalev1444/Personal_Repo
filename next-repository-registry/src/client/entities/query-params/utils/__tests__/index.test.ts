import {getUrlSearchParamsFromQueryParams} from '..';

describe('slices/query-params/utils/getUrlSearchParamsFromQueryParams', () => {
    it('should append array values as repeated query params', () => {
        const query = getUrlSearchParamsFromQueryParams({
            partnerIds: [1, 2, 3],
            date: '2026-06-19',
        });

        expect(query.getAll('partnerIds')).toEqual(['1', '2', '3']);
        expect(query.get('date')).toBe('2026-06-19');
    });

    it('should stringify numbers and booleans', () => {
        const query = getUrlSearchParamsFromQueryParams({
            partnerId: 1,
            isHyper: false,
        });

        expect(query.get('partnerId')).toBe('1');
        expect(query.get('isHyper')).toBe('false');
    });

    it('should skip undefined and empty string values', () => {
        const query = getUrlSearchParamsFromQueryParams({
            search: '',
            polygonStatus: '   ',
            deliveryTypes: undefined,
            partnerIds: [1, undefined, 2],
        });

        expect(query.has('search')).toBe(false);
        expect(query.has('polygonStatus')).toBe(false);
        expect(query.has('deliveryTypes')).toBe(false);
        expect(query.getAll('partnerIds')).toEqual(['1', '2']);
    });
});
