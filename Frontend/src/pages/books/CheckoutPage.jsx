import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../firebase/Authcontext';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/ordersApi';
import { clearCart } from '../../redux/features/cartSlice';

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + Number(item.Price || 0), 0)
    .toFixed(2);

  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [createAOrder, { isLoading }] = useCreateOrderMutation();
  const [isChecked, setIsChecked] = useState(false);

  const onSubmit = async (data) => {
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        country: "Nepal",
        state: data.state,
        zipcode: data.zipcode,
        address: data.address
      },
      phone: data.phone,
      productIds: cartItems.map(item => item?._id).filter(id => id),
      totalPrice: parseFloat(totalPrice),
    };

    try {
      await createAOrder(newOrder).unwrap();
      dispatch(clearCart());

      Swal.fire({
        title: "Order Confirmed",
        text: "Your order was placed successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      }).then(() => {
        navigate("/orders");
      });

    } catch (error) {
      console.error("Error placing an order", error);
      Swal.fire({
        title: "Error",
        text: error?.data?.message || "Failed to place an order",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      });
    }
  };

  if (isLoading) return <div>Loading....</div>;

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div>
              <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
              <p className="text-gray-500 mb-2">Total Price: NPR. {totalPrice}</p>
              <p className="text-gray-500 mb-6">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
            </div>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
              >
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    
                    {/* Full Name */}
                    <div className="md:col-span-5">
                      <label htmlFor="name" className="block font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        {...register("name", { required: "Full name is required" })}
                        type="text"
                        id="name"
                        className="h-10 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded px-4 w-full bg-white text-black"
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="md:col-span-5">
                      <label htmlFor="email" className='block font-medium text-gray-700 mb-1'>Email Address</label>
                      <input
                        type="text"
                        id="email"
                        disabled
                        defaultValue={currentUser?.email}
                        className="h-10 border border-gray-300 rounded px-4 w-full bg-gray-100 text-black"
                      />
                    </div>

                    {/* Phone */}
                    <div className="md:col-span-5">
                      <label htmlFor="phone" className='block font-medium text-gray-700 mb-1'>Phone Number</label>
                      <input
                        {...register("phone", {
                          required: "Phone number is required",
                          minLength: { value: 10, message: "Phone number must be exactly 10 digits" },
                          maxLength: { value: 10, message: "Phone number must be exactly 10 digits" },
                          pattern: { value: /^[0-9]+$/, message: "Phone number must contain only digits" }
                        })}
                        type="text"
                        id="phone"
                        className="h-10 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded px-4 w-full bg-white text-black"
                        placeholder="Enter 10-digit phone number"
                      />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    {/* Address */}
                    <div className="md:col-span-3">
                      <label htmlFor="address" className='block font-medium text-gray-700 mb-1'>Address</label>
                      <input
                        {...register("address", { required: "Address is required" })}
                        type="text"
                        id="address"
                        className="h-10 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded px-4 w-full bg-white text-black"
                      />
                      {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>

                    {/* City */}
                    <div className="md:col-span-2">
                      <label htmlFor="city" className='block font-medium text-gray-700 mb-1'>District</label>
                      <input
                        {...register("city", { required: "City is required" })}
                        type="text"
                        id="District"
                        className="h-10 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded px-4 w-full bg-white text-black"
                      />
                      {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                    </div>

                    {/* Country - Fixed Nepal */}
                    <div className="md:col-span-2">
                      <label htmlFor="country" className='block font-medium text-gray-700 mb-1'>Country</label>
                      <input
                        type="text"
                        id="country"
                        value="Nepal"
                        readOnly
                        className="h-10 border border-gray-300 rounded px-4 w-full bg-gray-100 text-black"
                      />
                    </div>

                    {/* State/Province Dropdown */}
                    <div className="md:col-span-2">
                      <label htmlFor="state" className='block font-medium text-gray-700 mb-1'>State</label>
                      <select
                        {...register("state", { required: "State is required" })}
                        id="state"
                        className="h-10 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded px-4 w-full bg-white text-black"
                      >
                        <option value="">Select a state</option>
                        <option value="state-1">Koshi</option>
                        <option value="state-2">Madhesh</option>
                        <option value="state-3">Bagmati</option>
                        <option value="state-4">Gandaki</option>
                        <option value="state-5">Lumbini</option>
                        <option value="state-6">Karnali</option>
                        <option value="state-7">Sudurpashchim</option>
                      </select>
                      {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                    </div>

                    {/* Zipcode */}
                    <div className="md:col-span-1">
                      <label htmlFor="zipcode" className='block font-medium text-gray-700 mb-1'>Zipcode</label>
                      <input
                        {...register("zipcode", { required: "Zipcode is required" })}
                        type="text"
                        id="zipcode"
                        className="transition-all flex items-center h-10 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded px-4 w-full bg-white text-black"
                      />
                      {errors.zipcode && <p className="text-red-500 text-sm">{errors.zipcode.message}</p>}
                    </div>

                    {/* Terms Checkbox */}
                    <div className="md:col-span-5 mt-3">
                      <div className="inline-flex items-center">
                        <input
                          onChange={(e) => setIsChecked(e.target.checked)}
                          type="checkbox"
                          id="billing_same"
                          className="form-checkbox"
                        />
                        <label htmlFor="billing_same" className="ml-2 text-black">
                          I agree to the <Link className='underline text-blue-600'>Terms & Conditions</Link> and <Link className='underline text-blue-600'>Shopping Policy</Link>.
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-5 text-right">
                      <button
                        disabled={!isChecked}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Place an Order
                      </button>
                    </div>

                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckoutPage;
