import React from 'react';

export default function SubscriptionSectionVerticalNav2() {
    return (
        <React.Fragment>
            <>
                <div>
  <nav className="lg:hidden flex items-center justify-between p-8 bg-gray-700 mb-3">
    <div className="w-full xl:w-auto px-2 xl:mr-12">
      <div className="flex items-center justify-between">
        <a className="inline-flex items-center h-8" href="#">
          <img src="trizzle-assets/logos/trizzle-logo.svg" alt />
        </a>
        <div className="xl:hidden">
          <button className="text-gray-400 hover:text-gray-300 focus:outline-none">
            <svg width={20} height={12} viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <title>Mobile menu</title>
              <path d="M1 2H19C19.2652 2 19.5196 1.89464 19.7071 1.70711C19.8946 1.51957 20 1.26522 20 1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2ZM19 10H1C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11C0 11.2652 0.105357 11.5196 0.292893 11.7071C0.48043 11.8946 0.734784 12 1 12H19C19.2652 12 19.5196 11.8946 19.7071 11.7071C19.8946 11.5196 20 11.2652 20 11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10ZM19 5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6C0 6.26522 0.105357 6.51957 0.292893 6.70711C0.48043 6.89464 0.734784 7 1 7H19C19.2652 7 19.5196 6.89464 19.7071 6.70711C19.8946 6.51957 20 6.26522 20 6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
  <div className="hidden relative z-50">
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50" />
    <nav className="fixed top-0 left-0 bottom-0 w-full max-w-xxs flex flex-col h-full py-8 px-4 bg-gray-700 overflow-auto">
      <div className="mb-6">
        <a className="inline-block mb-12" href="#">
          <img className="h-7" src="trizzle-assets/logos/trizzle-logo.svg" alt />
        </a>
        <ul>
          <li className="mb-4">
            <a className="flex items-center p-4 text-white bg-blue-500 rounded-xl" href="#">
              <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 11H1C0.734784 11 0.48043 11.1054 0.292893 11.2929C0.105357 11.4804 0 11.7348 0 12V19C0 19.2652 0.105357 19.5196 0.292893 19.7071C0.48043 19.8946 0.734784 20 1 20H8C8.26522 20 8.51957 19.8946 8.70711 19.7071C8.89464 19.5196 9 19.2652 9 19V12C9 11.7348 8.89464 11.4804 8.70711 11.2929C8.51957 11.1054 8.26522 11 8 11ZM7 18H2V13H7V18ZM19 0H12C11.7348 0 11.4804 0.105357 11.2929 0.292893C11.1054 0.48043 11 0.734784 11 1V8C11 8.26522 11.1054 8.51957 11.2929 8.70711C11.4804 8.89464 11.7348 9 12 9H19C19.2652 9 19.5196 8.89464 19.7071 8.70711C19.8946 8.51957 20 8.26522 20 8V1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0ZM18 7H13V2H18V7ZM19 11H12C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11ZM18 18H13V13H18V18ZM8 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H8C8.26522 9 8.51957 8.89464 8.70711 8.70711C8.89464 8.51957 9 8.26522 9 8V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0ZM7 7H2V2H7V7Z" fill="currentColor" />
              </svg>
              <span className="ml-4 text-sm font-semibold">Overview</span>
            </a>
          </li>
          <li className="mb-4">
            <a className="flex items-center p-4 text-gray-300 hover:bg-gray-800 rounded-xl" href="#">
              <span className="text-gray-400">
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4C9.73478 4 9.48043 4.10536 9.29289 4.29289C9.10536 4.48043 9 4.73478 9 5V15C9 15.2652 9.10536 15.5196 9.29289 15.7071C9.48043 15.8946 9.73478 16 10 16C10.2652 16 10.5196 15.8946 10.7071 15.7071C10.8946 15.5196 11 15.2652 11 15V5C11 4.73478 10.8946 4.48043 10.7071 4.29289C10.5196 4.10536 10.2652 4 10 4ZM5 10C4.73478 10 4.48043 10.1054 4.29289 10.2929C4.10536 10.4804 4 10.7348 4 11V15C4 15.2652 4.10536 15.5196 4.29289 15.7071C4.48043 15.8946 4.73478 16 5 16C5.26522 16 5.51957 15.8946 5.70711 15.7071C5.89464 15.5196 6 15.2652 6 15V11C6 10.7348 5.89464 10.4804 5.70711 10.2929C5.51957 10.1054 5.26522 10 5 10ZM15 8C14.7348 8 14.4804 8.10536 14.2929 8.29289C14.1054 8.48043 14 8.73478 14 9V15C14 15.2652 14.1054 15.5196 14.2929 15.7071C14.4804 15.8946 14.7348 16 15 16C15.2652 16 15.5196 15.8946 15.7071 15.7071C15.8946 15.5196 16 15.2652 16 15V9C16 8.73478 15.8946 8.48043 15.7071 8.29289C15.5196 8.10536 15.2652 8 15 8ZM17 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.316071 17.7956 0 17 0ZM18 17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3V17Z" fill="currentColor" />
                </svg>
              </span>
              <span className="ml-4 text-sm font-semibold">Analytics</span>
            </a>
          </li>
          <li className="mb-4">
            <a className="flex items-center p-4 text-gray-300 hover:bg-gray-800 rounded-xl" href="#">
              <span className="text-gray-400">
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 4.5H14V3.5C14 2.70435 13.6839 1.94129 13.1213 1.37868C12.5587 0.816071 11.7956 0.5 11 0.5H9C8.20435 0.5 7.44129 0.816071 6.87868 1.37868C6.31607 1.94129 6 2.70435 6 3.5V4.5H3C2.20435 4.5 1.44129 4.81607 0.87868 5.37868C0.316071 5.94129 0 6.70435 0 7.5V16.5C0 17.2956 0.316071 18.0587 0.87868 18.6213C1.44129 19.1839 2.20435 19.5 3 19.5H17C17.7956 19.5 18.5587 19.1839 19.1213 18.6213C19.6839 18.0587 20 17.2956 20 16.5V7.5C20 6.70435 19.6839 5.94129 19.1213 5.37868C18.5587 4.81607 17.7956 4.5 17 4.5ZM8 3.5C8 3.23478 8.10536 2.98043 8.29289 2.79289C8.48043 2.60536 8.73478 2.5 9 2.5H11C11.2652 2.5 11.5196 2.60536 11.7071 2.79289C11.8946 2.98043 12 3.23478 12 3.5V4.5H8V3.5ZM18 16.5C18 16.7652 17.8946 17.0196 17.7071 17.2071C17.5196 17.3946 17.2652 17.5 17 17.5H3C2.73478 17.5 2.48043 17.3946 2.29289 17.2071C2.10536 17.0196 2 16.7652 2 16.5V11C2.97544 11.3869 3.97818 11.7011 5 11.94V12.53C5 12.7952 5.10536 13.0496 5.29289 13.2371C5.48043 13.4246 5.73478 13.53 6 13.53C6.26522 13.53 6.51957 13.4246 6.70711 13.2371C6.89464 13.0496 7 12.7952 7 12.53V12.32C7.99435 12.4554 8.99649 12.5255 10 12.53C11.0035 12.5255 12.0057 12.4554 13 12.32V12.53C13 12.7952 13.1054 13.0496 13.2929 13.2371C13.4804 13.4246 13.7348 13.53 14 13.53C14.2652 13.53 14.5196 13.4246 14.7071 13.2371C14.8946 13.0496 15 12.7952 15 12.53V11.94C16.0218 11.7011 17.0246 11.3869 18 11V16.5ZM18 8.81C17.0274 9.22049 16.0244 9.55483 15 9.81V9.5C15 9.23478 14.8946 8.98043 14.7071 8.79289C14.5196 8.60536 14.2652 8.5 14 8.5C13.7348 8.5 13.4804 8.60536 13.2929 8.79289C13.1054 8.98043 13 9.23478 13 9.5V10.24C11.0113 10.54 8.98875 10.54 7 10.24V9.5C7 9.23478 6.89464 8.98043 6.70711 8.79289C6.51957 8.60536 6.26522 8.5 6 8.5C5.73478 8.5 5.48043 8.60536 5.29289 8.79289C5.10536 8.98043 5 9.23478 5 9.5V9.83C3.97562 9.57483 2.9726 9.24049 2 8.83V7.5C2 7.23478 2.10536 6.98043 2.29289 6.79289C2.48043 6.60536 2.73478 6.5 3 6.5H17C17.2652 6.5 17.5196 6.60536 17.7071 6.79289C17.8946 6.98043 18 7.23478 18 7.5V8.81Z" fill="currentColor" />
                </svg>
              </span>
              <span className="ml-4 text-sm font-semibold">Products</span>
            </a>
          </li>
          <li className="mb-4">
            <a className="flex items-center p-4 text-gray-300 hover:bg-gray-800 rounded-xl" href="#">
              <span className="text-gray-400">
                <svg width={20} height={21} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17C12.2653 17 12.5196 16.8947 12.7071 16.7071C12.8947 16.5196 13 16.2652 13 16V14C13 13.7348 12.8947 13.4805 12.7071 13.2929C12.5196 13.1054 12.2653 13 12 13C11.7348 13 11.4805 13.1054 11.2929 13.2929C11.1054 13.4805 11 13.7348 11 14V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4805 16.8947 11.7348 17 12 17ZM8.00004 17C8.26525 17 8.51961 16.8947 8.70714 16.7071C8.89468 16.5196 9.00004 16.2652 9.00004 16V14C9.00004 13.7348 8.89468 13.4805 8.70714 13.2929C8.51961 13.1054 8.26525 13 8.00004 13C7.73482 13 7.48047 13.1054 7.29293 13.2929C7.10539 13.4805 7.00004 13.7348 7.00004 14V16C7.00004 16.2652 7.10539 16.5196 7.29293 16.7071C7.48047 16.8947 7.73482 17 8.00004 17ZM17 5.00003H15.62L13.89 1.55003C13.8372 1.42308 13.7587 1.3084 13.6595 1.21316C13.5603 1.11791 13.4426 1.04414 13.3136 0.996469C13.1846 0.948794 13.0472 0.928235 12.9099 0.936075C12.7726 0.943915 12.6384 0.979987 12.5157 1.04204C12.3929 1.10408 12.2843 1.19078 12.1966 1.2967C12.1089 1.40261 12.044 1.52548 12.006 1.65762C11.9679 1.78976 11.9575 1.92833 11.9754 2.06467C11.9933 2.20102 12.0391 2.3322 12.11 2.45003L13.38 5.00003H6.62004L7.89004 2.45003C7.9871 2.21693 7.9924 1.95575 7.90486 1.71891C7.81732 1.48208 7.64343 1.28712 7.4181 1.17319C7.19277 1.05926 6.93268 1.03479 6.69005 1.10469C6.44742 1.17458 6.24022 1.33368 6.11004 1.55003L4.38004 5.00003H3.00004C2.29323 5.01078 1.61291 5.27077 1.07909 5.73416C0.545259 6.19755 0.192211 6.83455 0.0822073 7.53283C-0.0277959 8.23112 0.112313 8.94581 0.477823 9.55088C0.843332 10.1559 1.41076 10.6125 2.08004 10.84L2.82004 18.3C2.89466 19.0426 3.24338 19.7307 3.79811 20.2299C4.35284 20.7292 5.07374 21.0038 5.82004 21H14.2C14.9463 21.0038 15.6672 20.7292 16.222 20.2299C16.7767 19.7307 17.1254 19.0426 17.2 18.3L17.94 10.84C18.6108 10.6118 19.1791 10.1536 19.5443 9.54651C19.9096 8.93942 20.0482 8.22266 19.9356 7.52317C19.823 6.82368 19.4665 6.18661 18.9292 5.7248C18.3919 5.26299 17.7085 5.00624 17 5.00003ZM15.19 18.1C15.1652 18.3475 15.0489 18.5769 14.864 18.7433C14.6791 18.9098 14.4388 19.0013 14.19 19H5.81004C5.56127 19.0013 5.32097 18.9098 5.13606 18.7433C4.95115 18.5769 4.83491 18.3475 4.81004 18.1L4.10004 11H15.9L15.19 18.1ZM17 9.00003H3.00004C2.73482 9.00003 2.48047 8.89467 2.29293 8.70713C2.10539 8.5196 2.00004 8.26524 2.00004 8.00003C2.00004 7.73481 2.10539 7.48046 2.29293 7.29292C2.48047 7.10538 2.73482 7.00003 3.00004 7.00003H17C17.2653 7.00003 17.5196 7.10538 17.7071 7.29292C17.8947 7.48046 18 7.73481 18 8.00003C18 8.26524 17.8947 8.5196 17.7071 8.70713C17.5196 8.89467 17.2653 9.00003 17 9.00003Z" fill="currentColor" />
                </svg>
              </span>
              <span className="ml-4 mr-auto text-sm font-semibold">Orders</span>
              <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-xs font-semibold rounded-full">4</span>
            </a>
          </li>
          <li>
            <a className="flex items-center p-4 text-gray-300 hover:bg-gray-800 rounded-xl" href="#">
              <span className="text-gray-400">
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.81 10.28C13.443 9.60024 13.7996 8.70877 13.81 7.78C13.81 6.77748 13.4118 5.81602 12.7029 5.10714C11.994 4.39825 11.0325 4 10.03 4C9.02748 4 8.06602 4.39825 7.35714 5.10714C6.64825 5.81602 6.25 6.77748 6.25 7.78C6.26044 8.70877 6.61702 9.60024 7.25 10.28C6.36865 10.7189 5.61022 11.3699 5.04292 12.1746C4.47561 12.9793 4.11723 13.9124 4 14.89C3.97083 15.1552 4.0482 15.4212 4.21511 15.6293C4.38202 15.8375 4.62478 15.9708 4.89 16C5.15522 16.0292 5.42116 15.9518 5.62932 15.7849C5.83749 15.618 5.97083 15.3752 6 15.11C6.11933 14.1411 6.58885 13.2494 7.32009 12.6027C8.05133 11.956 8.99382 11.599 9.97 11.599C10.9462 11.599 11.8887 11.956 12.6199 12.6027C13.3512 13.2494 13.8207 14.1411 13.94 15.11C13.9678 15.3664 14.0936 15.6022 14.2911 15.768C14.4887 15.9339 14.7426 16.017 15 16H15.11C15.3721 15.9698 15.6117 15.8373 15.7766 15.6313C15.9414 15.4252 16.0181 15.1624 15.99 14.9C15.8815 13.9276 15.5344 12.997 14.9796 12.191C14.4248 11.3851 13.6796 10.7286 12.81 10.28ZM10 9.56C9.64795 9.56 9.3038 9.4556 9.01108 9.26002C8.71836 9.06443 8.49022 8.78643 8.35549 8.46118C8.22077 8.13592 8.18552 7.77803 8.2542 7.43274C8.32288 7.08745 8.49241 6.77029 8.74135 6.52135C8.99029 6.27241 9.30745 6.10288 9.65274 6.0342C9.99803 5.96552 10.3559 6.00077 10.6812 6.13549C11.0064 6.27022 11.2844 6.49837 11.48 6.79109C11.6756 7.0838 11.78 7.42795 11.78 7.78C11.78 8.25208 11.5925 8.70484 11.2586 9.03865C10.9248 9.37247 10.4721 9.56 10 9.56ZM17 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.316071 17.7956 0 17 0ZM18 17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3V17Z" fill="currentColor" />
                </svg>
              </span>
              <span className="ml-4 text-sm font-semibold">Customers</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-auto">
        <a className="group block py-6 pl-6 pr-8 mb-4 bg-blue-500 hover:bg-blue-600 rounded-xl transition duration-200" href="#">
          <div className="flex w-12 h-12 mb-4 items-center justify-center bg-blue-600 group-hover:bg-blue-500 rounded-xl">
            <svg width={10} height={12} viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.70978 6.53994C5.61681 6.44621 5.50621 6.37182 5.38435 6.32105C5.2625 6.27028 5.13179 6.24414 4.99978 6.24414C4.86777 6.24414 4.73706 6.27028 4.6152 6.32105C4.49334 6.37182 4.38274 6.44621 4.28978 6.53994L1.28978 9.53994C1.09617 9.72824 0.985294 9.98574 0.981544 10.2558C0.977793 10.5258 1.08147 10.7863 1.26978 10.9799C1.45808 11.1735 1.71558 11.2844 1.98564 11.2882C2.25569 11.2919 2.51617 11.1882 2.70978 10.9999L4.99978 8.65994L7.28978 10.9999C7.38274 11.0937 7.49334 11.1681 7.6152 11.2188C7.73706 11.2696 7.86777 11.2957 7.99978 11.2957C8.13179 11.2957 8.2625 11.2696 8.38435 11.2188C8.50621 11.1681 8.61681 11.0937 8.70978 10.9999C8.80351 10.907 8.8779 10.7964 8.92867 10.6745C8.97944 10.5527 9.00558 10.422 9.00558 10.2899C9.00558 10.1579 8.97944 10.0272 8.92867 9.90536C8.8779 9.7835 8.80351 9.6729 8.70978 9.57994L5.70978 6.53994ZM2.70978 5.45994L4.99978 3.15994L7.28978 5.45994C7.38274 5.55367 7.49334 5.62806 7.6152 5.67883C7.73706 5.7296 7.86777 5.75574 7.99978 5.75574C8.13179 5.75574 8.2625 5.7296 8.38435 5.67883C8.50621 5.62806 8.61681 5.55367 8.70978 5.45994C8.80351 5.36698 8.8779 5.25637 8.92867 5.13452C8.97944 5.01266 9.00558 4.88195 9.00558 4.74994C9.00558 4.61793 8.97944 4.48722 8.92867 4.36536C8.8779 4.2435 8.80351 4.1329 8.70978 4.03994L5.70978 1.03994C5.61681 0.946211 5.50621 0.871816 5.38435 0.821048C5.2625 0.770279 5.13179 0.744141 4.99978 0.744141C4.86777 0.744141 4.73706 0.770279 4.6152 0.821048C4.49334 0.871816 4.38274 0.946211 4.28978 1.03994L1.28978 4.03994C1.10147 4.22824 0.995686 4.48364 0.995686 4.74994C0.995686 5.01624 1.10147 5.27164 1.28978 5.45994C1.47808 5.64824 1.73348 5.75403 1.99978 5.75403C2.26608 5.75403 2.52147 5.64824 2.70978 5.45994Z" fill="white" />
            </svg>
          </div>
          <h5 className="text-sm font-medium text-blue-50 mb-2">Upgrade to PRO</h5>
          <p className="text-xs leading-normal font-semibold text-blue-200">One year support, monthly updates for up to 5 team members.</p>
        </a>
        <a className="group flex py-5 px-6 items-center bg-gray-600 hover:bg-gray-500 rounded-xl transition duration-200" href="#">
          <div className="flex w-8 h-8 mr-2 items-center justify-center bg-gray-500 group-hover:bg-gray-600 rounded-lg">
            <img src="trizzle-assets/logos/logo-shuffle-blue.svg" alt />
          </div>
          <span className="text-sm text-gray-100 font-medium">Shuffle</span>
          <div className="ml-auto text-gray-400 group-hover:text-gray-300">
            <svg width={4} height={16} viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.00016 3.83333C2.3298 3.83333 2.65203 3.73559 2.92611 3.55245C3.2002 3.36931 3.41382 3.10902 3.53996 2.80447C3.66611 2.49993 3.69911 2.16482 3.63481 1.84152C3.5705 1.51822 3.41176 1.22124 3.17867 0.988156C2.94559 0.755068 2.64862 0.596334 2.32531 0.532025C2.00201 0.467717 1.6669 0.500722 1.36236 0.626868C1.05781 0.753014 0.797517 0.966635 0.614381 1.24072C0.431245 1.5148 0.333497 1.83703 0.333497 2.16667C0.333497 2.6087 0.509092 3.03262 0.821653 3.34518C1.13421 3.65774 1.55814 3.83333 2.00016 3.83333ZM2.00016 12.1667C1.67053 12.1667 1.3483 12.2644 1.07421 12.4476C0.800132 12.6307 0.58651 12.891 0.460364 13.1955C0.334218 13.5001 0.301213 13.8352 0.365521 14.1585C0.42983 14.4818 0.588565 14.7788 0.821653 15.0118C1.05474 15.2449 1.35171 15.4037 1.67501 15.468C1.99831 15.5323 2.33343 15.4993 2.63797 15.3731C2.94251 15.247 3.20281 15.0334 3.38595 14.7593C3.56908 14.4852 3.66683 14.163 3.66683 13.8333C3.66683 13.3913 3.49124 12.9674 3.17867 12.6548C2.86611 12.3423 2.44219 12.1667 2.00016 12.1667ZM2.00016 6.33333C1.67053 6.33333 1.3483 6.43108 1.07421 6.61422C0.800132 6.79735 0.58651 7.05765 0.460364 7.3622C0.334218 7.66674 0.301213 8.00185 0.365521 8.32515C0.42983 8.64845 0.588565 8.94543 0.821653 9.17851C1.05474 9.4116 1.35171 9.57033 1.67501 9.63464C1.99831 9.69895 2.33343 9.66595 2.63797 9.5398C2.94251 9.41365 3.20281 9.20003 3.38595 8.92595C3.56908 8.65187 3.66683 8.32964 3.66683 8C3.66683 7.55797 3.49124 7.13405 3.17867 6.82149C2.86611 6.50893 2.44219 6.33333 2.00016 6.33333Z" fill="currentColor" />
            </svg>
          </div>
        </a>
      </div>
    </nav>
  </div>
  <div className="hidden lg:block relative z-50">
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50" />
  </div>
  <div className="relative z-50 mx-auto lg:ml-80"><section className="py-8">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap -mx-4 mb-6">
            <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
              <div className="h-full p-6 bg-gray-500 rounded-xl">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 self-start w-12 h-12 mr-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" stroke="#194BFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 6V18" stroke="#194BFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#194BFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-xs text-gray-300 leading-6 font-semibold">Monthly Payment</h5>
                    <div className="flex items-end leading-none text-gray-100 font-semibold">
                      <span className="text-2xl">$65</span>
                      <span className="text-sm pb-1">/month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <div className="h-full p-6 bg-gray-500 rounded-xl">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 self-start w-12 h-12 mr-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
                    <svg width={14} height={20} viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 9C9.20914 9 11 7.20914 11 5C11 2.79086 9.20914 1 7 1C4.79086 1 3 2.79086 3 5C3 7.20914 4.79086 9 7 9Z" stroke="#194BFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1 19V17C1 15.9391 1.42143 14.9217 2.17157 14.1716C2.92172 13.4214 3.93913 13 5 13H9C10.0609 13 11.0783 13.4214 11.8284 14.1716C12.5786 14.9217 13 15.9391 13 17V19" stroke="#194BFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-xs text-gray-300 leading-6 font-semibold">Total Clients</h5>
                    <div className="flex items-center text-2xl leading-none text-gray-100 font-semibold">
                      <span>145</span>
                      <span className="inline-block ml-2 py-1 px-2 text-xs text-green-500 font-medium bg-teal-900 rounded-full">+12,0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-10 pt-6 pb-10 mb-6 bg-gray-500 rounded-xl">
            <div className="flex flex-wrap items-center justify-between -mx-4 mb-6">
              <div className="w-full sm:w-auto px-4 mb-2 sm:mb-0">
                <h4 className="text-lg text-gray-100 font-semibold">Payment methods</h4>
              </div>
              <div className="w-full sm:w-auto px-4">
                <a className="inline-flex items-center text-sm font-bold text-blue-500 hover:text-blue-400" href="#">
                  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.667 7.33332H8.66699V3.33332C8.66699 3.15651 8.59675 2.98694 8.47173 2.86192C8.34671 2.73689 8.17714 2.66666 8.00033 2.66666C7.82351 2.66666 7.65395 2.73689 7.52892 2.86192C7.4039 2.98694 7.33366 3.15651 7.33366 3.33332V7.33332H3.33366C3.15685 7.33332 2.98728 7.40356 2.86225 7.52859C2.73723 7.65361 2.66699 7.82318 2.66699 7.99999C2.66699 8.1768 2.73723 8.34637 2.86225 8.47139C2.98728 8.59642 3.15685 8.66666 3.33366 8.66666H7.33366V12.6667C7.33366 12.8435 7.4039 13.013 7.52892 13.1381C7.65395 13.2631 7.82351 13.3333 8.00033 13.3333C8.17714 13.3333 8.34671 13.2631 8.47173 13.1381C8.59675 13.013 8.66699 12.8435 8.66699 12.6667V8.66666H12.667C12.8438 8.66666 13.0134 8.59642 13.1384 8.47139C13.2634 8.34637 13.3337 8.1768 13.3337 7.99999C13.3337 7.82318 13.2634 7.65361 13.1384 7.52859C13.0134 7.40356 12.8438 7.33332 12.667 7.33332Z" fill="currentColor" />
                  </svg>
                  <span className="ml-2">Add method</span>
                </a>
              </div>
            </div>
            <div className="pb-6 mb-6 border-b border-gray-400">
              <div className="flex flex-wrap items-center justify-between -mx-4 -mb-5">
                <div className="w-full sm:w-auto px-4 mb-5">
                  <div className="flex items-center">
                    <img className="h-12 w-17 mr-4 self-start" src="trizzle-assets/logos/visa-logo.svg" alt />
                    <div>
                      <h5 className="text-sm text-gray-100 leading-5 font-semibold">Visa ending in 3456</h5>
                      <span className="text-xs text-gray-300 font-medium">Expires 04/2028</span>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-auto px-4 mb-5"><a className="inline-block ml-auto px-2 py-1 text-xs leading-6 text-gray-200 font-bold bg-gray-600 hover:bg-gray-700 rounded-lg transition duration-100" href="#">Default</a></div>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <img className="h-12 w-17 mr-4 self-start" src="trizzle-assets/logos/card-logo.svg" alt />
                <div>
                  <h5 className="text-sm text-gray-100 leading-5 font-semibold">Visa ending in 3456</h5>
                  <span className="text-xs text-gray-300 font-medium">Expires 04/2028</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 mb-10 bg-gray-500 rounded-xl">
            <h4 className="text-lg text-gray-100 font-semibold mb-6">Invoices</h4>
            <div className="w-full mt-6 pb-4 overflow-x-scroll">
              <table className="w-full min-w-max">
                <thead>
                  <tr className="text-left">
                    <th className="p-0">
                      <div className="py-3 px-6 rounded-l-xl bg-gray-600">
                        <span className="text-xs text-gray-300 font-semibold">INVOICE ID</span>
                      </div>
                    </th>
                    <th className="p-0">
                      <div className="py-3 px-6 bg-gray-600">
                        <span className="text-xs text-gray-300 font-semibold">AMOUNT</span>
                      </div>
                    </th>
                    <th className="p-0">
                      <div className="py-3 px-6 bg-gray-600">
                        <button className="inline-flex items-center text-xs text-gray-300 font-semibold">
                          <span className="mr-2">DATE</span>
                          <svg width={10} height={14} viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.8598 8.52669L4.9998 11.3934L2.1398 8.52669C2.01426 8.40115 1.844 8.33063 1.66646 8.33063C1.48893 8.33063 1.31867 8.40115 1.19313 8.52669C1.0676 8.65222 0.99707 8.82249 0.99707 9.00002C0.99707 9.17756 1.0676 9.34782 1.19313 9.47335L4.52646 12.8067C4.58844 12.8692 4.66217 12.9188 4.74341 12.9526C4.82465 12.9865 4.91179 13.0039 4.9998 13.0039C5.08781 13.0039 5.17494 12.9865 5.25618 12.9526C5.33742 12.9188 5.41116 12.8692 5.47313 12.8067L8.80646 9.47335C8.86862 9.41119 8.91793 9.3374 8.95157 9.25619C8.98521 9.17497 9.00252 9.08793 9.00252 9.00002C9.00252 8.91211 8.98521 8.82507 8.95157 8.74385C8.91793 8.66264 8.86862 8.58885 8.80646 8.52669C8.7443 8.46453 8.67051 8.41522 8.5893 8.38158C8.50808 8.34794 8.42104 8.33063 8.33313 8.33063C8.24522 8.33063 8.15818 8.34794 8.07696 8.38158C7.99575 8.41522 7.92196 8.46453 7.8598 8.52669ZM2.1398 5.47335L4.9998 2.60669L7.8598 5.47335C7.92177 5.53584 7.99551 5.58544 8.07675 5.61928C8.15799 5.65313 8.24512 5.67055 8.33313 5.67055C8.42114 5.67055 8.50828 5.65313 8.58952 5.61928C8.67075 5.58544 8.74449 5.53584 8.80646 5.47335C8.86895 5.41138 8.91855 5.33764 8.95239 5.2564C8.98624 5.17517 9.00366 5.08803 9.00366 5.00002C9.00366 4.91201 8.98624 4.82488 8.95239 4.74364C8.91855 4.6624 8.86895 4.58866 8.80646 4.52669L5.47313 1.19335C5.41116 1.13087 5.33742 1.08127 5.25618 1.04743C5.17494 1.01358 5.08781 0.996155 4.9998 0.996155C4.91179 0.996155 4.82465 1.01358 4.74341 1.04743C4.66217 1.08127 4.58844 1.13087 4.52646 1.19335L1.19313 4.52669C1.0676 4.65222 0.99707 4.82249 0.99707 5.00002C0.99707 5.17756 1.0676 5.34782 1.19313 5.47335C1.31867 5.59889 1.48893 5.66941 1.66646 5.66941C1.844 5.66941 2.01426 5.59889 2.1398 5.47335Z" fill="currentColor" />
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th className="p-0">
                      <div className="py-3 px-5 rounded-r-xl bg-gray-600">
                        <span className="text-xs text-gray-300 font-semibold">STATUS</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-0">
                      <div className="h-16 p-6">
                        <h5 className="text-sm font-medium text-gray-100">INVOICE #3405</h5>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="h-16 p-6">
                        <span className="text-sm font-medium text-gray-100">$25.00</span>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="h-16 p-6">
                        <span className="text-sm text-gray-100 font-medium">July 06, 2022</span>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="h-16 p-6">
                        <div className="flex h-full items-center">
                          <span className="inline-block w-2 h-2 mr-1 bg-yellow-500 rounded-full" />
                          <span className="text-sm font-medium text-gray-100">Pending</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-0">
                      <div className="h-16 p-6 rounded-l-xl bg-gray-600">
                        <h5 className="text-sm font-medium text-gray-100">INVOICE #3405</h5>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="h-16 p-6 bg-gray-600">
                        <span className="text-sm font-medium text-gray-100">$25.00</span>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="h-16 p-6 bg-gray-600">
                        <h5 className="text-sm font-medium text-gray-100">July 06, 2022</h5>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="flex h-16 p-6 items-center rounded-r-xl bg-gray-600">
                        <span className="inline-block w-2 h-2 mr-1 bg-green-500 rounded-full" />
                        <span className="text-sm font-medium text-gray-100">Delivered</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-0">
                      <div className="h-16 p-6">
                        <h5 className="text-sm font-medium text-gray-100">INVOICE #3405</h5>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="h-16 p-6">
                        <span className="text-sm font-medium text-gray-100">$25.00</span>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="h-16 p-6">
                        <span className="text-sm text-gray-100 font-medium">July 06, 2022</span>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="h-16 p-6">
                        <div className="flex h-full items-center">
                          <span className="inline-block w-2 h-2 mr-1 bg-yellow-500 rounded-full" />
                          <span className="text-sm font-medium text-gray-100">Pending</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-0">
                      <div className="h-16 p-6 rounded-l-xl bg-gray-600">
                        <h5 className="text-sm font-medium text-gray-100">INVOICE #3405</h5>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="h-16 p-6 bg-gray-600">
                        <span className="text-sm font-medium text-gray-100">$25.00</span>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="h-16 p-6 bg-gray-600">
                        <h5 className="text-sm font-medium text-gray-100">July 06, 2022</h5>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="flex h-16 p-6 items-center rounded-r-xl bg-gray-600">
                        <span className="inline-block w-2 h-2 mr-1 bg-red-500 rounded-full" />
                        <span className="text-sm font-medium text-gray-100">Refunded</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-0">
                      <div className="h-16 p-6">
                        <h5 className="text-sm font-medium text-gray-100">INVOICE #3405</h5>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="h-16 p-6">
                        <span className="text-sm font-medium text-gray-100">$25.00</span>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="h-16 p-6">
                        <span className="text-sm text-gray-100 font-medium">July 06, 2022</span>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="h-16 p-6">
                        <div className="flex h-full items-center">
                          <span className="inline-block w-2 h-2 mr-1 bg-yellow-500 rounded-full" />
                          <span className="text-sm font-medium text-gray-100">Pending</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-0">
                      <div className="h-16 p-6 rounded-l-xl bg-gray-600">
                        <h5 className="text-sm font-medium text-gray-100">INVOICE #3405</h5>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="h-16 p-6 bg-gray-600">
                        <span className="text-sm font-medium text-gray-100">$25.00</span>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="h-16 p-6 bg-gray-600">
                        <h5 className="text-sm font-medium text-gray-100">July 06, 2022</h5>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="flex h-16 p-6 items-center rounded-r-xl bg-gray-600">
                        <span className="inline-block w-2 h-2 mr-1 bg-red-500 rounded-full" />
                        <span className="text-sm font-medium text-gray-100">Refunded</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
              <div className="max-w-xs mx-auto">
                <h4 className="text-gray-50 font-bold mb-1">Auto renewal</h4>
                <p className="text-xs text-gray-300 leading-5 font-medium mb-4">All subscriptions are set to automatically renew, unless you cancel before the next renewal date.</p>
                <div className="flex items-center">
                  <button className="flex items-center justify-center h-6 w-11 mr-3 bg-gray-400 rounded-full">
                    <div className="h-5 w-5 rounded-full bg-white" />
                    <div className="h-5 w-5 rounded-full bg-transparent" />
                  </button>
                  <span className="text-xs text-gray-300 font-medium">Auto renewal is turrned on</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <div className="max-w-xs mx-auto">
                <h4 className="text-gray-50 font-bold mb-1">Cancel Subscription</h4>
                <p className="text-xs text-gray-300 leading-5 font-medium mb-5">You will lose access to all premium features in your current subscription plan</p>
                <a className="inline-block text-xs font-medium text-blue-500 hover:underline" href="#">Cancel Subscription</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>


            </>
        </React.Fragment>
    );
}

