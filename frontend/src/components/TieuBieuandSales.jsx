import React from 'react'

const TieuBieuandSales = () => {
  return (
    <>
      <div className='flex justify-center'>
        <div className=' text-white w-1/2 h-[400px]'>
          <div className='uppercase font-bold p-2'>Tiêu Biểu % Sales</div>
          <div className='flex'>
            <div className='w-2/3 bg-sky-300'>
              <img src="image.png" alt="bigpic" />
            </div>
            <div className='bg-gray-900 w-1/3' >
              <p className='p-2'>NameGame</p>
              <div className='grid grid-cols-2 gap-4'>
                <img src="image.png" alt="1" />
                <img src="image.png" alt="2" />
                <img src="image.png" alt="3" />
                <img src="image.png" alt="4" />
              </div>
              <p>Đã ra mắt</p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TieuBieuandSales
