// src/app/citizen/submit/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import {
  MapPinIcon,
  PhotoIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

type FormData = {
  title: string;
  category: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  attachments: FileList | null;
  agreeToTerms: boolean;
};

const categories = [
  { id: "roads", name: "Roads & Infrastructure" },
  { id: "water", name: "Water & Sanitation" },
  { id: "electricity", name: "Electricity" },
  { id: "waste", name: "Waste Management" },
  { id: "public_transport", name: "Public Transportation" },
  { id: "education", name: "Education Services" },
  { id: "healthcare", name: "Healthcare Services" },
  { id: "security", name: "Security & Safety" },
  { id: "environment", name: "Environment & Pollution" },
  { id: "corruption", name: "Corruption & Bribery" },
  { id: "other", name: "Other" },
];

export default function SubmitComplaint() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [complaintId, setComplaintId] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Mock submission - in a real app, this would be an API call
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate a random complaint ID
      const generatedId = "CMP" + Math.floor(100000 + Math.random() * 900000);
      setComplaintId(generatedId);

      // Show success message
      setIsSuccess(true);

      // Reset form
      reset();
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      // Handle error (would show error message in real app)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {isSuccess ? (
          // Success message
          <div className="rounded-md bg-white p-8 shadow-md">
            <div className="text-center">
              <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                Complaint Submitted Successfully!
              </h2>
              <p className="mt-2 text-gray-600">
                Your complaint has been received and will be processed shortly.
              </p>
              <div className="mt-6 rounded-md bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Complaint Reference Number:
                </p>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {complaintId}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Please save this reference number for tracking your complaint
                  status.
                </p>
              </div>
              <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
                <Link
                  href={`/citizen/track?id=${complaintId}`}
                  className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Track Your Complaint
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setComplaintId(null);
                  }}
                  className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Submit Another Complaint
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Complaint form
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Submit a Complaint
              </h1>
              <p className="mt-2 text-gray-600">
                Use this form to report issues with public services or
                infrastructure. Your feedback helps us improve services for
                everyone.
              </p>
            </div>

            <div className="bg-white overflow-hidden shadow-md rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                {/* Complaint Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Complaint Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    {...register("title", { required: "Title is required" })}
                    className={`mt-1 block w-full rounded-md ${
                      errors.title
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                    } shadow-sm sm:text-sm`}
                    placeholder="Briefly describe your complaint"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className={`mt-1 block w-full rounded-md ${
                      errors.category
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                    } shadow-sm sm:text-sm`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows={5}
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 20,
                        message: "Description should be at least 20 characters",
                      },
                    })}
                    className={`mt-1 block w-full rounded-md ${
                      errors.description
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                    } shadow-sm sm:text-sm`}
                    placeholder="Provide detailed information about the issue"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPinIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="text"
                      id="location"
                      {...register("location", {
                        required: "Location is required",
                      })}
                      className={`block w-full pl-10 rounded-md ${
                        errors.location
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                      } shadow-sm sm:text-sm`}
                      placeholder="Enter address or location details"
                    />
                  </div>
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.location.message}
                    </p>
                  )}
                  <button
                    type="button"
                    className="mt-2 inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
                  >
                    <MapPinIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                    Use my current location
                  </button>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`mt-1 block w-full rounded-md ${
                        errors.email
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                      } shadow-sm sm:text-sm`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone")}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* File Attachments */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Attachments (Photos, Documents)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            type="file"
                            multiple
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF up to 10MB each
                      </p>
                    </div>
                  </div>
                </div>

                {/* Display selected files */}
                {selectedFiles.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Attached files:
                    </h4>
                    <ul className="mt-2 divide-y divide-gray-200 border border-gray-200 rounded-md">
                      {selectedFiles.map((file, index) => (
                        <li
                          key={index}
                          className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center">
                            <PaperClipIcon
                              className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2"
                              aria-hidden="true"
                            />
                            <span className="truncate">{file.name}</span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="font-medium text-red-600 hover:text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="agreeToTerms"
                      type="checkbox"
                      {...register("agreeToTerms", {
                        required: "You must agree to the terms and conditions",
                      })}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="agreeToTerms"
                      className="font-medium text-gray-700"
                    >
                      I agree to the terms and conditions{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <p className="text-gray-500">
                      By submitting this form, you agree that your complaint may
                      be shared with the relevant government agencies.
                    </p>
                    {errors.agreeToTerms && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.agreeToTerms.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Complaint"}
                  </button>
                </div>
              </form>
            </div>

            {/* Information Panel */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800">
                Tips for effective complaints
              </h3>
              <ul className="mt-4 ml-6 list-disc text-blue-700 space-y-2">
                <li>Be specific about the issue you're experiencing</li>
                <li>Include relevant dates, times, and locations</li>
                <li>
                  Add photos or documents if they help illustrate the problem
                </li>
                <li>Keep your description factual and objective</li>
                <li>Suggest a solution if you have one in mind</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
