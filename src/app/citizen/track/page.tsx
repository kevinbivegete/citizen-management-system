"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircleIcon,
  ClockIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { ComponentType, SVGProps } from "react";

// Define a type for status badges
type StatusBadgeConfig = {
  color: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
};

// Define a type for the status keys
type StatusKey =
  | "pending"
  | "received"
  | "in_progress"
  | "resolved"
  | "rejected";

// Define a type for the complaint
type Complaint = {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  status: StatusKey;
  createdAt: string;
  updatedAt: string;
  agency: string;
  attachments: Array<{
    name: string;
    type: string;
    size: string;
  }>;
  updates: Array<{
    id: number;
    date: string;
    status: StatusKey;
    message: string;
    author?: string;
  }>;
};

// Mock complaint data (this would come from API in real app)
const mockComplaints: Complaint[] = [
  {
    id: "CMP123456",
    title: "Broken Street Light on Main Avenue",
    category: "Roads & Infrastructure",
    description:
      "The street light at the corner of Main Avenue and 5th Street has been broken for over a week, creating a safety hazard for pedestrians at night.",
    location: "Main Avenue & 5th Street",
    status: "in_progress",
    createdAt: "2025-05-15T10:30:00Z",
    updatedAt: "2025-05-17T14:20:00Z",
    agency: "Department of Public Works",
    attachments: [
      { name: "broken_light.jpg", type: "image/jpeg", size: "1.2 MB" },
    ],
    updates: [
      {
        id: 1,
        date: "2025-05-15T10:30:00Z",
        status: "submitted" as StatusKey,
        message: "Complaint submitted successfully",
      },
      {
        id: 2,
        date: "2025-05-16T09:15:00Z",
        status: "received",
        message: "Complaint received by Department of Public Works",
      },
      {
        id: 3,
        date: "2025-05-17T14:20:00Z",
        status: "in_progress",
        message: "Maintenance team scheduled for inspection on May 22",
        author: "John Smith, Public Works Coordinator",
      },
    ],
  },
  {
    id: "CMP654321",
    title: "Water Supply Interruption in Central District",
    category: "Water & Sanitation",
    description:
      "Our neighborhood has been experiencing frequent water supply interruptions over the past three days. The water is completely shut off for 4-5 hours each day without prior notice.",
    location: "Central District, Blocks A-C",
    status: "resolved",
    createdAt: "2025-05-10T08:45:00Z",
    updatedAt: "2025-05-14T16:30:00Z",
    agency: "Water Authority",
    attachments: [],
    updates: [
      {
        id: 1,
        date: "2025-05-10T08:45:00Z",
        status: "submitted" as StatusKey,
        message: "Complaint submitted successfully",
      },
      {
        id: 2,
        date: "2025-05-10T11:20:00Z",
        status: "received",
        message: "Complaint received by Water Authority",
      },
      {
        id: 3,
        date: "2025-05-11T09:30:00Z",
        status: "in_progress",
        message: "Technicians dispatched to investigate the issue",
        author: "Water Authority Support Team",
      },
      {
        id: 4,
        date: "2025-05-13T14:15:00Z",
        status: "in_progress",
        message:
          "Issue identified as a damaged water main. Repairs are underway and expected to be completed within 24 hours.",
        author: "Engineering Team, Water Authority",
      },
      {
        id: 5,
        date: "2025-05-14T16:30:00Z",
        status: "resolved",
        message:
          "Repairs have been completed and water supply has been fully restored. Thank you for your patience.",
        author: "Sarah Johnson, Water Authority Manager",
      },
    ],
  },
  {
    id: "CMP789012",
    title: "Excessive Garbage Accumulation",
    category: "Waste Management",
    description:
      "Garbage has not been collected for over two weeks in our area, leading to unhygienic conditions and foul odor.",
    location: "Eastern Suburb, Residential Zone B",
    status: "pending",
    createdAt: "2025-05-19T15:20:00Z",
    updatedAt: "2025-05-19T15:20:00Z",
    agency: "Waste Management Department",
    attachments: [
      { name: "garbage_pile.jpg", type: "image/jpeg", size: "2.4 MB" },
      { name: "location_map.pdf", type: "application/pdf", size: "0.8 MB" },
    ],
    updates: [
      {
        id: 1,
        date: "2025-05-19T15:20:00Z",
        status: "submitted" as StatusKey,
        message: "Complaint submitted successfully",
      },
    ],
  },
];

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

export default function TrackComplaints() {
  const searchParams = useSearchParams();
  const [searchId, setSearchId] = useState(searchParams?.get("id") || "");
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [recentComplaints, setRecentComplaints] = useState<Complaint[]>([]);

  // Search for a complaint by ID
  const searchComplaint = () => {
    if (!searchId.trim()) return;

    setIsSearching(true);
    setNotFound(false);

    // Simulate API call
    setTimeout(() => {
      const found = mockComplaints.find((c) => c.id === searchId);

      if (found) {
        setComplaint(found);
        // Add to recent if not already there
        if (!recentComplaints.some((c) => c.id === found.id)) {
          setRecentComplaints((prev) => [found, ...prev].slice(0, 5));
        }
      } else {
        setComplaint(null);
        setNotFound(true);
      }

      setIsSearching(false);
    }, 1000);
  };

  // Initial loading of complaint if ID is in URL
  useEffect(() => {
    if (searchParams?.get("id")) {
      searchComplaint();
    }

    // Load mock recent complaints (would be from localStorage or user account)
    setRecentComplaints(mockComplaints.slice(0, 3));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Track Your Complaint
            </h1>
            <p className="mt-2 text-gray-600">
              Enter your complaint ID to check the current status and updates.
            </p>
          </div>

          {/* Search section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-1">
                <label htmlFor="complaint-id" className="sr-only">
                  Complaint ID
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="complaint-id"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter complaint ID (e.g., CMP123456)"
                    className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-4">
                <button
                  type="button"
                  onClick={searchComplaint}
                  disabled={isSearching}
                  className="block w-full rounded-md border border-transparent bg-primary-600 px-4 py-2 text-center text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:inline-block sm:w-auto"
                >
                  {isSearching ? "Searching..." : "Track Complaint"}
                </button>
              </div>
            </div>
            {notFound && (
              <div className="mt-4 rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Complaint not found
                    </h3>
                    <p className="mt-2 text-sm text-red-700">
                      No complaint found with ID "{searchId}". Please check the
                      ID and try again.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Complaint details */}
          {complaint && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {complaint.title}
                  </h2>
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                  </div>
                </div>
                <div className="mt-1 flex flex-wrap gap-y-1 gap-x-4 text-sm text-gray-500">
                  <div>
                    <span className="font-medium text-gray-900">ID:</span>{" "}
                    {complaint.id}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Category:</span>{" "}
                    {complaint.category}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">
                      Submitted:
                    </span>{" "}
                    {formatDate(complaint.createdAt)}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">
                      Last Updated:
                    </span>{" "}
                    {formatDate(complaint.updatedAt)}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4">
                <h3 className="text-base font-semibold text-gray-900">
                  Details
                </h3>
                <p className="mt-2 text-gray-600">{complaint.description}</p>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Location
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {complaint.location}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Handling Agency
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {complaint.agency}
                    </p>
                  </div>
                </div>

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
                          <div className="flex items-center">
                            <PaperClipIcon
                              className="flex-shrink-0 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="ml-2 flex-1 w-0 truncate">
                              {file.name}
                            </span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              className="font-medium text-primary-600 hover:text-primary-500"
                            >
                              View
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-gray-200">
                <h3 className="text-base font-semibold text-gray-900">
                  Status Updates
                </h3>

                <div className="mt-4 flow-root">
                  <ul className="-mb-8">
                    {complaint.updates.map((update, index) => {
                      const StatusIcon =
                        update.status in statusBadges
                          ? statusBadges[update.status as StatusKey].icon
                          : ClockIcon;

                      const statusColor =
                        update.status in statusBadges
                          ? statusBadges[update.status as StatusKey].color
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
                                <div>
                                  <p className="text-sm text-gray-500">
                                    {formatDate(update.date)}
                                  </p>
                                </div>
                                <div className="mt-1">
                                  <p className="text-sm text-gray-700">
                                    {update.message}
                                  </p>
                                </div>
                                {update.author && (
                                  <div className="mt-1">
                                    <p className="text-xs text-gray-500">
                                      - {update.author}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Feedback section for resolved complaints */}
              {complaint.status === "resolved" && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <h3 className="text-base font-semibold text-gray-900">
                    Provide Feedback
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Your feedback helps us improve our service. How satisfied
                    were you with the resolution of your complaint?
                  </p>
                  <div className="mt-4 flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        className="rounded-full h-10 w-10 bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="feedback"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Additional Comments
                    </label>
                    <textarea
                      id="feedback"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      placeholder="Share your experience with the resolution process"
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="px-6 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mr-3"
                >
                  Contact Agency
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Print Details
                </button>
              </div>
            </div>
          )}

          {/* Recent complaints */}
          {!complaint && recentComplaints.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Complaints
                </h2>
                <p className="mt-1 text-gray-600">
                  Your recently tracked complaints
                </p>
              </div>
              <ul className="divide-y divide-gray-200">
                {recentComplaints.map((item) => {
                  const StatusIcon = statusBadges[item.status].icon;
                  return (
                    <li key={item.id} className="px-6 py-4 hover:bg-gray-50">
                      <button
                        onClick={() => {
                          setSearchId(item.id);
                          setComplaint(item);
                        }}
                        className="w-full text-left"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-base font-medium text-gray-900 truncate">
                              {item.title}
                            </p>
                            <div className="mt-1 flex space-x-4 text-sm text-gray-500">
                              <div>
                                <span className="font-medium text-gray-900">
                                  ID:
                                </span>{" "}
                                {item.id}
                              </div>
                              <div>
                                <span className="font-medium text-gray-900">
                                  Submitted:
                                </span>{" "}
                                {new Date(item.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              statusBadges[item.status].color
                            }`}
                          >
                            <StatusIcon
                              className="mr-1 h-4 w-4"
                              aria-hidden="true"
                            />
                            {statusBadges[item.status].text}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
