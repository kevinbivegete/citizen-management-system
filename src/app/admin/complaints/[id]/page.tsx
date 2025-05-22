// src/app/admin/complaints/[id]/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeftIcon,
  AtSymbolIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ClockIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  PaperClipIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ComponentType, SVGProps } from "react";

// Define types for better TypeScript support
type StatusKey =
  | "pending"
  | "received"
  | "in_progress"
  | "resolved"
  | "rejected"
  | "submitted";
type PriorityLevel = "critical" | "high" | "medium" | "low";

type StatusBadgeConfig = {
  color: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
};

type Attachment = {
  name: string;
  type: string;
  size: string;
};

type StatusUpdate = {
  id: number;
  date: string;
  status: StatusKey;
  message: string;
  author?: string;
};

type InternalNote = {
  id: number;
  date: string;
  text: string;
  author: string;
};

type Complaint = {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  coordinates: { lat: string; lng: string };
  status: StatusKey;
  priority: PriorityLevel;
  createdAt: string;
  updatedAt: string;
  agency: string;
  assignedTo: string;
  citizenName: string;
  citizenContact: string;
  citizenPhone: string;
  attachments: Attachment[];
  updates: StatusUpdate[];
  notes: InternalNote[];
};

// Status badge mapping
const statusBadges: Record<StatusKey, StatusBadgeConfig> = {
  pending: {
    color: "bg-yellow-100 text-yellow-800",
    icon: ClockIcon,
    text: "Pending",
  },
  received: {
    color: "bg-blue-100 text-blue-800",
    icon: EnvelopeIcon,
    text: "Received",
  },
  in_progress: {
    color: "bg-indigo-100 text-indigo-800",
    icon: ClockIcon,
    text: "In Progress",
  },
  resolved: {
    color: "bg-green-100 text-green-800",
    icon: CheckCircleIcon,
    text: "Resolved",
  },
  rejected: {
    color: "bg-red-100 text-red-800",
    icon: ExclamationTriangleIcon,
    text: "Rejected",
  },
  submitted: {
    color: "bg-gray-100 text-gray-800",
    icon: EnvelopeIcon,
    text: "Submitted",
  },
};

// Mock complaint data
const complaintData: Complaint = {
  id: "CMP123456",
  title: "Broken Street Light on Main Avenue",
  category: "Roads & Infrastructure",
  description:
    "The street light at the corner of Main Avenue and 5th Street has been broken for over a week, creating a safety hazard for pedestrians at night. The area is quite dark and many people walk through here after work.",
  location: "Main Avenue & 5th Street",
  coordinates: { lat: "-1.9441", lng: "30.0619" },
  status: "in_progress",
  priority: "medium",
  createdAt: "2025-05-15T10:30:00Z",
  updatedAt: "2025-05-17T14:20:00Z",
  agency: "Department of Public Works",
  assignedTo: "James Wilson",
  citizenName: "John Doe",
  citizenContact: "john.doe@example.com",
  citizenPhone: "+250 78 123 4567",
  attachments: [
    { name: "broken_light.jpg", type: "image/jpeg", size: "1.2 MB" },
    { name: "location_map.pdf", type: "application/pdf", size: "0.8 MB" },
  ],
  updates: [
    {
      id: 1,
      date: "2025-05-15T10:30:00Z",
      status: "submitted",
      message: "Complaint submitted successfully",
      author: "System",
    },
    {
      id: 2,
      date: "2025-05-16T09:15:00Z",
      status: "received",
      message: "Complaint received and under review",
      author: "Admin System",
    },
    {
      id: 3,
      date: "2025-05-17T14:20:00Z",
      status: "in_progress",
      message:
        "Maintenance team scheduled for inspection on May 22. We've identified the issue as a faulty power supply that will require replacement.",
      author: "James Wilson, Public Works Coordinator",
    },
  ],
  notes: [
    {
      id: 1,
      date: "2025-05-16T10:20:00Z",
      text: "Called citizen to confirm details of the complaint. They reported that the light has been flickering for about 2 weeks before completely stopping working a week ago.",
      author: "Sarah Johnson",
    },
    {
      id: 2,
      date: "2025-05-17T09:30:00Z",
      text: "Checked maintenance records - this light was last serviced 8 months ago. Will need to schedule a full replacement rather than just a bulb change.",
      author: "James Wilson",
    },
  ],
};

// Format date for display
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Priority level indicator
function PriorityIndicator({ priority }: { priority: PriorityLevel }) {
  let bgColor, label;
  switch (priority) {
    case "critical":
      bgColor = "bg-red-100 text-red-800";
      label = "Critical";
      break;
    case "high":
      bgColor = "bg-orange-100 text-orange-800";
      label = "High";
      break;
    case "medium":
      bgColor = "bg-yellow-100 text-yellow-800";
      label = "Medium";
      break;
    case "low":
      bgColor = "bg-green-100 text-green-800";
      label = "Low";
      break;
    default:
      bgColor = "bg-gray-100 text-gray-800";
      label = "Normal";
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}
    >
      {label}
    </span>
  );
}

export default function AdminComplaintView() {
  const params = useParams();
  const [statusUpdate, setStatusUpdate] = useState<string>("");
  const [updateMessage, setUpdateMessage] = useState<string>("");
  const [internalNote, setInternalNote] = useState<string>("");
  const [showStatusForm, setShowStatusForm] = useState<boolean>(false);
  const [showNoteForm, setShowNoteForm] = useState<boolean>(false);

  // This would normally fetch data based on the ID
  const complaint = complaintData;

  const handleStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit to API
    alert("Status update submitted");
    setStatusUpdate("");
    setUpdateMessage("");
    setShowStatusForm(false);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit to API
    alert("Internal note added");
    setInternalNote("");
    setShowNoteForm(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            <ArrowLeftIcon className="mr-1 h-4 w-4" aria-hidden="true" />
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-6">
          {/* Complaint Header */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Complaint: {complaint.id}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Submitted on {formatDate(complaint.createdAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <PriorityIndicator priority={complaint.priority} />
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      statusBadges[complaint.status].color
                    }`}
                  >
                    {(() => {
                      const IconComponent = statusBadges[complaint.status].icon;
                      return (
                        <IconComponent
                          className="mr-1 h-4 w-4"
                          aria-hidden="true"
                        />
                      );
                    })()}
                    {statusBadges[complaint.status].text}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <h1 className="text-xl font-semibold text-gray-900">
                {complaint.title}
              </h1>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPinIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>{complaint.location}</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <UserIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>Reported by: {complaint.citizenName}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-500">
                    <AtSymbolIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>{complaint.citizenContact}</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <PhoneIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>{complaint.citizenPhone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main complaint information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Complaint Details
                  </h3>
                  <span className="text-sm text-gray-500">
                    Category: {complaint.category}
                  </span>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <p className="text-gray-700 whitespace-pre-line">
                    {complaint.description}
                  </p>

                  {/* Attachments */}
                  {complaint.attachments.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900">
                        Attachments
                      </h4>
                      <ul className="mt-2 divide-y divide-gray-200 border border-gray-200 rounded-md">
                        {complaint.attachments.map((file, index) => (
                          <li
                            key={index}
                            className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                          >
                            <div className="w-0 flex-1 flex items-center">
                              <PaperClipIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="ml-2 flex-1 w-0 truncate">
                                {file.name}
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex space-x-4">
                              <span className="text-gray-500">{file.size}</span>
                              <button
                                type="button"
                                className="font-medium text-primary-600 hover:text-primary-500"
                              >
                                View
                              </button>
                              <button
                                type="button"
                                className="font-medium text-primary-600 hover:text-primary-500"
                              >
                                Download
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Updates Timeline */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Status Updates
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowStatusForm(!showStatusForm)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Add Update
                  </button>
                </div>

                {/* Add status update form */}
                {showStatusForm && (
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6 bg-gray-50">
                    <form onSubmit={handleStatusUpdate}>
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Update Status
                          </label>
                          <select
                            id="status"
                            name="status"
                            value={statusUpdate}
                            onChange={(e) => setStatusUpdate(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            required
                          >
                            <option value="">Select a status</option>
                            <option value="received">Received</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Update Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={3}
                            value={updateMessage}
                            onChange={(e) => setUpdateMessage(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="Provide details about this status update"
                            required
                          />
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setShowStatusForm(false)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Submit Update
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <div className="flow-root">
                    <ul className="-mb-8">
                      {complaint.updates.map((update, index) => {
                        const StatusIcon =
                          update.status in statusBadges
                            ? statusBadges[update.status].icon
                            : ClockIcon;

                        const statusColor =
                          update.status in statusBadges
                            ? statusBadges[update.status].color
                            : "bg-gray-100 text-gray-800";

                        return (
                          <li key={update.id}>
                            <div className="relative pb-8">
                              {index !== complaint.updates.length - 1 ? (
                                <span
                                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${statusColor}`}
                                  >
                                    <StatusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5">
                                  <div className="flex justify-between">
                                    <p className="text-sm text-gray-500">
                                      {update.status in statusBadges
                                        ? statusBadges[update.status].text
                                        : "Updated"}{" "}
                                      by{" "}
                                      <span className="font-medium text-gray-900">
                                        {update.author}
                                      </span>
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {formatDate(update.date)}
                                    </p>
                                  </div>
                                  <div className="mt-2">
                                    <p className="text-sm text-gray-700">
                                      {update.message}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Internal Notes */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Internal Notes
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowNoteForm(!showNoteForm)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Add Note
                  </button>
                </div>

                {/* Add internal note form */}
                {showNoteForm && (
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6 bg-gray-50">
                    <form onSubmit={handleAddNote}>
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="note"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Note (Internal Only)
                          </label>
                          <textarea
                            id="note"
                            name="note"
                            rows={3}
                            value={internalNote}
                            onChange={(e) => setInternalNote(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="Add internal notes about this complaint (not visible to citizens)"
                            required
                          />
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setShowNoteForm(false)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Add Note
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                <div className="border-t border-gray-200">
                  {complaint.notes.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {complaint.notes.map((note) => (
                        <li key={note.id} className="px-4 py-4 sm:px-6">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              {note.author}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatDate(note.date)}
                            </p>
                          </div>
                          <p className="mt-2 text-sm text-gray-700">
                            {note.text}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-5 sm:px-6 text-center">
                      <p className="text-sm text-gray-500">
                        No internal notes yet
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar with actions and information */}
            <div className="space-y-6">
              {/* Action Panel */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Actions
                  </h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <div className="space-y-3">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Assign Complaint
                    </button>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Mark as Resolved
                    </button>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Send Message to Citizen
                    </button>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Request More Information
                    </button>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Reject Complaint
                    </button>
                  </div>
                </div>
              </div>

              {/* Assignment Info */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Assignment
                  </h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Assigned Department
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {complaint.agency}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Assigned To
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {complaint.assignedTo || "Not assigned"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Assignment Date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formatDate(complaint.updatedAt)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Due Date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        May 25, 2025
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Map Location */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Location
                  </h3>
                </div>
                <div className="border-t border-gray-200">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    {/* This would be a real map in production */}
                    <div className="text-center">
                      <MapPinIcon
                        className="mx-auto h-8 w-8 text-primary-600"
                        aria-hidden="true"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Map would be displayed here
                      </p>
                      <p className="text-xs text-gray-500">
                        Coordinates: {complaint.coordinates.lat},{" "}
                        {complaint.coordinates.lng}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Similar Complaints */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Similar Complaints
                  </h3>
                </div>
                <div className="border-t border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    <li className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                      <Link
                        href="/admin/complaints/CMP567890"
                        className="block"
                      >
                        <p className="text-sm font-medium text-gray-900">
                          Street Light Out on Park Avenue
                        </p>
                        <div className="mt-1 flex justify-between">
                          <p className="text-sm text-gray-500">CMP567890</p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Resolved
                          </span>
                        </div>
                      </Link>
                    </li>
                    <li className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                      <Link
                        href="/admin/complaints/CMP789012"
                        className="block"
                      >
                        <p className="text-sm font-medium text-gray-900">
                          Broken Light Post after Storm
                        </p>
                        <div className="mt-1 flex justify-between">
                          <p className="text-sm text-gray-500">CMP789012</p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Received
                          </span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                  <div className="px-4 py-4 text-center border-t border-gray-200">
                    <Link
                      href="/admin/complaints?similar=true"
                      className="text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                      View all similar complaints
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Complaint History */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Previous Complaints
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    From this citizen
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    <li className="px-4 py-4 sm:px-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Water Quality Issue
                          </p>
                          <p className="text-sm text-gray-500">
                            CMP098765 • Resolved • Jan 15, 2025
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Resolved
                        </span>
                      </div>
                    </li>
                    <li className="px-4 py-4 sm:px-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Noise Complaint
                          </p>
                          <p className="text-sm text-gray-500">
                            CMP087654 • Resolved • Dec 3, 2024
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Resolved
                        </span>
                      </div>
                    </li>
                  </ul>
                  <div className="px-4 py-4 text-center border-t border-gray-200">
                    <Link
                      href={`/admin/citizens/${complaint.citizenContact}/complaints`}
                      className="text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                      View all complaints from this citizen
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
