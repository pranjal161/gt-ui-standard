import React, { useEffect, useState } from 'react';
import { getLink, paginationLink } from 'utils/functions';

import { DxcPaginator } from '@dxc-technology/halstack-react';
import { StyledPaginator } from 'styles/global-style';

export interface PaginatorProps {
    
    /**
    * Total Count of the result items
    */
    totalItems: string | number, 

    /**
    * Items to show in a single page
    */
    itemsPerPage: number,

    /**
    * Server response - To fetch next, prev, first links
    */
    data: any,

    /**
    * Function that needs to be executed on every buttons click
    */
    handler: Function
}

const Paginator = (props: PaginatorProps) => {
    const { totalItems, itemsPerPage, data, handler } = props;
    const [page, changePage] = useState(1);
    const first = data && getLink(data, 'first') ? getLink(data, 'first') : '';

    useEffect(() => {
        changePage(1);
    }, [first]);

    const valueCheck = (value: number) => {
        let linkType = '';
        const total = typeof totalItems === 'string' ? parseInt(totalItems) : totalItems;
        switch(true) {
            case value === page - 1: linkType = 'prev'; break;
            case value === page + 1: linkType = 'next'; break;
            case value === 1: linkType = 'first'; break;
            case value === total/itemsPerPage: linkType = 'last'; break;
        }

        return linkType;
    }

    const goToPage = (newPage: number) => {
        changePage(newPage);
        const type = valueCheck(newPage);
        if (type === 'last') {
            const link = getLink(data, 'first');
            const lastLink = paginationLink(link, newPage, itemsPerPage);
            handler(lastLink);
        } 
        else {
            const link = getLink(data, type);
            handler(link);
        }
    };

    return (
        <>
            <StyledPaginator data-testid="paginator">
                <DxcPaginator
                    currentPage={page}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    onPageChange={goToPage}
                />
            </StyledPaginator>
        </>
    );
};

export default Paginator;
