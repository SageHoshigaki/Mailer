import React from 'react';

export default function UserdetailsSectionPageExamples1() {
    return (
        <React.Fragment>
            <>
                <section className="py-3">
  <div className="container px-4 mx-auto">
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 border-b border-gray-400">
        <div className="flex flex-wrap justify-between items-center -mx-4 pb-6">
          <div className="w-full md:w-auto px-4 mb-5 md:mb-0">
            <div className="flex items-center">
              <img className="block w-16 h-16 rounded-full" src="trizzle-assets/images/avatar-men-2.png" alt />
              <div className="ml-4">
                <h4 className="text-sm text-gray-100 font-semibold mb-1">Your Avatar</h4>
                <p className="text-xs font-medium leading-normal text-gray-400">Profile picture size: 400x400px</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto px-4">
            <button className="inline-block h-14 py-4 px-6 text-center text-blue-50 font-semibold leading-6 bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200">Upload new Avatar</button>
          </div>
        </div>
      </div>
      <form className="mb-8" action>
        <div className="flex flex-wrap -mx-4 -mb-6">
          <div className="w-full md:w-1/2 px-4 mb-6">
            <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
              <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-medium text-gray-300 px-1 bg-gray-600">First Name</span>
              <input className="block w-full outline-none bg-transparent text-sm text-gray-100 font-medium" id="accountInput1-1" type="text" placeholder="John" />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-6">
            <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
              <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-medium text-gray-300 px-1 bg-gray-600">Last Name</span>
              <input className="block w-full outline-none bg-transparent text-sm text-gray-100 font-medium" id="accountInput1-2" type="text" placeholder="Doe" />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-6">
            <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
              <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-medium text-gray-300 px-1 bg-gray-600">Email Address</span>
              <input className="block w-full outline-none bg-transparent text-sm text-gray-100 font-medium" id="accountInput1-3" type="email" placeholder="johndoe@trizzle.ui" />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-6">
            <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
              <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-medium text-gray-300 px-1 bg-gray-600">Phone</span>
              <input className="block w-full outline-none bg-transparent text-sm text-gray-100 font-medium" id="accountInput1-4" type="text" placeholder="+48 664 341 345" />
            </div>
          </div>
          <div className="w-full px-4 mb-6">
            <button className="inline-block h-14 py-4 px-12 text-center text-white font-bold leading-6 bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200">Save changes</button>
          </div>
        </div>
      </form>
      <div className="py-12 px-4 md:px-10 mb-10 bg-gray-500 rounded-xl">
        <div className="flex items-center justify-between mb-12 -mx-4">
          <div className="max-w-md px-4">
            <h4 className="text-gray-50 font-bold">Announcements</h4>
            <p className="text-xs font-medium leading-normal text-gray-300">Occasional announcments of new features</p>
          </div>
          <div className="px-4">
            <button className="flex items-center justify-center h-6 w-11 bg-gray-600 rounded-full">
              <div className="h-5 w-5 rounded-full bg-white" />
              <div className="h-5 w-5 rounded-full bg-transparent" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-12 -mx-4">
          <div className="max-w-md px-4">
            <h4 className="text-gray-50 font-bold">Feedback requests</h4>
            <p className="text-xs font-medium leading-normal text-gray-300">Occasional requests for feedback</p>
          </div>
          <div className="px-4">
            <button className="flex items-center justify-center h-6 w-11 bg-gray-600 rounded-full">
              <div className="h-5 w-5 rounded-full bg-white" />
              <div className="h-5 w-5 rounded-full bg-transparent" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between -mx-4">
          <div className="max-w-md px-4">
            <h4 className="text-gray-50 font-bold">Billing and account</h4>
            <p className="text-xs font-medium leading-normal text-gray-300">Transactional emails and account notifications</p>
          </div>
          <div className="px-4">
            <button className="flex items-center justify-center h-6 w-11 bg-gray-600 rounded-full">
              <div className="h-5 w-5 rounded-full bg-white" />
              <div className="h-5 w-5 rounded-full bg-transparent" />
            </button>
          </div>
        </div>
      </div>
      <div className="pb-10 mb-10 border-b border-gray-400">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <div className="max-w-xs">
              <h4 className="text-gray-50 font-bold mb-1">Public profile</h4>
              <p className="text-xs text-gray-300 leading-normal font-medium mb-4">When this is on, peoiple on the platform can find an view your profile gobally</p>
              <div className="flex items-center">
                <button className="flex items-center justify-center h-6 w-11 mr-3 bg-gray-400 rounded-full">
                  <div className="h-5 w-5 rounded-full bg-white" />
                  <div className="h-5 w-5 rounded-full bg-transparent" />
                </button>
                <span className="text-xs text-gray-300 font-medium">Currently you are visible</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <div className="max-w-xs">
              <h4 className="text-gray-50 font-bold mb-1">Read receipt</h4>
              <p className="text-xs text-gray-300 leading-normal font-medium mb-4">When this is on, peoiple on the platform can find an view your profile gobally</p>
              <div className="flex items-center">
                <button className="flex items-center justify-center h-6 w-11 mr-3 bg-gray-400 rounded-full">
                  <div className="h-5 w-5 rounded-full bg-white" />
                  <div className="h-5 w-5 rounded-full bg-transparent" />
                </button>
                <span className="text-xs text-gray-300 font-medium">Read receipts are off</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center -mx-4">
        <div className="w-full md:w-auto px-4 mb-6 md:mb-0">
          <div className="max-w-xs">
            <h4 className="text-gray-50 font-bold mb-1">Delete your account</h4>
            <p className="text-xs text-gray-300 leading-normal font-medium">Before deleting your account, please note that if you detete your account, Trizzle cannot recover it</p>
          </div>
        </div>
        <div className="w-full md:w-auto px-4">
          <button className="inline-block py-2 px-5 text-center text-white font-semibold leading-6 bg-red-500 hover:bg-red-600 rounded-lg transition duration-200">Delete</button>
        </div>
      </div>
    </div>
  </div>
</section>


            </>
        </React.Fragment>
    );
}

