'use client';

import BigProductList from '@components/common/ProductList/BigProductList';

const ManagePage = () => {
  return (
    <BigProductList
      productList={[
        {
          id: 1,
          title: '긱시크안경',
          imageUrl: '',
          date: '12121',
          location: 'asdfas',
          status: 'LOST',
        },
      ]}
      auth
    />
  );
};

export default ManagePage;
