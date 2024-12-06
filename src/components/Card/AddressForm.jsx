import React from "react";

const AddressForm = ({ formData, onInputChange }) => (
  <>
    <div>
      <label className="text-gray-400 text-sm">Address</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={onInputChange}
        className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-gray-200"
      />
    </div>
    <div className="flex space-x-2">
      <div>
        <label className="text-gray-400 text-sm">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={onInputChange}
          className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-gray-200"
        />
      </div>
      <div>
        <label className="text-gray-400 text-sm">State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={onInputChange}
          className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-gray-200"
        />
      </div>
    </div>
    <div>
      <label className="text-gray-400 text-sm">Postal Code</label>
      <input
        type="text"
        name="postalCode"
        value={formData.postalCode}
        onChange={onInputChange}
        className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-gray-200"
      />
    </div>
  </>
);

export default AddressForm;
