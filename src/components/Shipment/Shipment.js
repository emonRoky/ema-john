import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setloggedInUser]= useContext(userContext);
    const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder='your name' />
      {errors.name && <span className='error'>name is required</span>}
      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='your email'/>
      {errors.email && <span className='error'>email is required</span>}
      <input name="address" ref={register({ required: true })} placeholder='your address'/>
      {errors.address && <span className='error'>address is required</span>}
      <input name="Phone" ref={register({ required: true })} placeholder='your phone number'/>
      {errors.Phone && <span className='error'>Phone number is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;