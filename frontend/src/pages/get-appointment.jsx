import React from 'react';
import { useForm } from 'react-hook-form';
import {Label} from '../components/ui/Label';
import {Input} from '../components/ui/input';
import {Button} from '../components/ui/button';
import {Textarea} from '../components/ui/textarea';

export default function RequestAppointment() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here, like sending the data to the backend
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-background rounded border mt-8 mb-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Request an Appointment</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Patient Full Name */}
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            id="fullName"
            {...register('fullName', { required: true })}
            className="w-full mt-1"
            placeholder="John Doe"
          />
          {errors.fullName && <span className="text-red-500">Full Name is required</span>}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            {...register('email', { required: true })}
            className="w-full mt-1"
            placeholder="john@example.com"
          />
          {errors.email && <span className="text-red-500">Email is required</span>}
        </div>

        {/* Contact Number */}
        <div>
          <Label htmlFor="phone">Contact Number</Label>
          <Input
            type="tel"
            id="phone"
            {...register('phone', { required: true })}
            className="w-full mt-1"
            placeholder="+1 234 567 890"
          />
          {errors.phone && <span className="text-red-500">Phone number is required</span>}
        </div>

        {/* Preferred Date */}
        <div>
          <Label htmlFor="date">Preferred Appointment Date</Label>
          <Input
            type="date"
            id="date"
            {...register('date', { required: true })}
            className="w-full mt-1"
          />
          {errors.date && <span className="text-red-500">Appointment Date is required</span>}
        </div>

        {/* Preferred Time */}
        <div>
          <Label htmlFor="time">Preferred Time Slot</Label>
          <Input
            type="time"
            id="time"
            {...register('time', { required: true })}
            className="w-full mt-1"
          />
          {errors.time && <span className="text-red-500">Preferred time is required</span>}
        </div>

        {/* Doctor Name or Department */}
        <div>
          <Label htmlFor="doctor">Doctor's Name / Department</Label>
          <Input
            type="text"
            id="doctor"
            {...register('doctor')}
            className="w-full mt-1"
            placeholder="Dr. John Smith / Cardiology"
          />
        </div>

        {/* Reason for Appointment */}
        <div>
          <Label htmlFor="reason">Reason for Appointment</Label>
          <Textarea
            id="reason"
            {...register('reason', { required: true })}
            className="w-full mt-1"
            placeholder="Describe the reason for your appointment"
          />
          {errors.reason && <span className="text-red-500">Reason for appointment is required</span>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-background">
            Submit Request
          </Button>
        </div>
      </form>
    </div>
  );
}
