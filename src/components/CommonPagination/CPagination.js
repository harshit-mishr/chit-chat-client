import React, { useState } from 'react';
import { Pagination } from 'antd';
const CPagination = ({ currentPage, onPageChange, totalCount }) => {
    const [current, setCurrent] = useState(3);

    return (
        <Pagination
            current={currentPage}
            onChange={onPageChange}
            total={totalCount}
        />
    );
};
export default CPagination;
