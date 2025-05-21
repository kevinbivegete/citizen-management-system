// src/app/citizen/dashboard/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { ComponentType, SVGProps } from "react";

// Define types for better TypeScript support
type StatusKey =
  | "pending"
  | "received"
  | "in_progress"
  | "resolved"
  | "rejected";

type StatusBadgeConfig = {
  color: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
};

type Complaint = {
  id: string;
  title: string;
  category: string;
  status: StatusKey;
  createdAt: string;
  updatedAt: string;
  agency: string;
};

type Notification = {
  id: number;
  message: string;
  read: boolean;
  date: string;
  type: string;
  relatedId: string;
};

// Mock data (this would come from API in real app)
const mockComplaints: Complaint[] = [
  {
    id: "CMP123456",
    title: "Broken Street Light on Main Avenue",
    category: "Roads & Infrastructure",
    status: "in_progress",
    createdAt: "2025-05-15T10:30:00Z",
    updatedAt: "2025-05-17T14:20:00Z",
    agency: "Department of Public Works",
  },
  {
    id: "CMP654321",
    title: "Water Supply Interruption in Central District",
    category: "Water & Sanitation",
    status: "resolved",
    createdAt: "2025-05-10T08:45:00Z",
    updatedAt: "2025-05-14T16:30:00Z",
    agency: "Water Authority",
  },
  {
    id: "CMP789012",
    title: "Excessive Garbage Accumulation",
    category: "Waste Management",
    status: "pending",
    createdAt: "2025-05-19T15:20:00Z",
    updatedAt: "2025-05-19T15:20:00Z",
    agency: "Waste Management Department",
  },
  {
    id: "CMP345678",
    title: "Pothole Damage on Highway 42",
    category: "Roads & Infrastructure",
    status: "received",
    createdAt: "2025-05-18T09:15:00Z",
    updatedAt: "2025-05-18T11:30:00Z",
    agency: "Department of Transportation",
  },
  {
    id: "CMP901234",
    title: "Noise Complaint - Construction Site",
    category: "Environment & Pollution",
    status: "rejected",
    createdAt: "2025-05-05T14:20:00Z",
    updatedAt: "2025-05-07T10:45:00Z",
    agency: "Environmental Protection Agency",
  },
];

const mockNotifications: Notification[] = [
  {
    id: 1,
    message:
      'Your complaint (CMP123456) status has been updated to "In Progress"',
    read: false,
    date: "2025-05-17T14:20:00Z",
    type: "status_update",
    relatedId: "CMP123456",
  },
  {
    id: 2,
    message:
      "Department of Public Works has added a comment to your complaint (CMP123456)",
    read: false,
    date: "2025-05-16T09:30:00Z",
    type: "comment",
    relatedId: "CMP123456",
  },
  {
    id: 3,
    message: "Your complaint (CMP654321) has been resolved",
    read: true,
    date: "2025-05-14T16:30:00Z",
    type: "status_update",
    relatedId: "CMP654321",
  },
  {
    id: 4,
    message:
      "Please provide additional information for your complaint (CMP789012) regarding Waste Management",
    read: true,
    date: "2025-05-19T16:45:00Z",
    type: "information_request",
    relatedId: "CMP789012",
  },
  {
    id: 5,
    message:
      "Your complaint (CMP901234) has been rejected. Click to see details.",
    read: true,
    date: "2025-05-07T10:45:00Z",
    type: "status_update",
    relatedId: "CMP901234",
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

// Format date string for display
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function CitizenDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeNotifications, setActiveNotifications] = useState(
    mockNotifications.filter((n) => !n.read).length
  );

  // Filter complaints based on active tab
  const filteredComplaints = mockComplaints.filter((complaint) => {
    if (activeTab === "all") return true;
    if (activeTab === "active")
      return ["pending", "received", "in_progress"].includes(complaint.status);
    if (activeTab === "resolved") return complaint.status === "resolved";
    if (activeTab === "rejected") return complaint.status === "rejected";
    return true;
  });

  // Mark notification as read
  const markNotificationAsRead = (id: number) => {
    setActiveNotifications((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {/* Header with user greeting */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, <span className="text-primary-600">John Doe</span>
            </h1>
            <p className="mt-2 text-gray-600">
              Track your complaints, view updates, and stay engaged with your
              community.
            </p>
          </div>

          {/* Dashboard stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <DocumentTextIcon
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">
                    Total Complaints
                  </p>
                  <p className="text-3xl font-semibold text-gray-900">
                    {mockComplaints.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                  <ClockIcon
                    className="h-6 w-6 text-yellow-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">
                    Active Complaints
                  </p>
                  <p className="text-3xl font-semibold text-gray-900">
                    {
                      mockComplaints.filter((c) =>
                        ["pending", "received", "in_progress"].includes(
                          c.status
                        )
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <CheckCircleIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">
                    Resolved Complaints
                  </p>
                  <p className="text-3xl font-semibold text-gray-900">
                    {
                      mockComplaints.filter((c) => c.status === "resolved")
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <ChartBarIcon
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">
                    Response Rate
                  </p>
                  <p className="text-3xl font-semibold text-gray-900">85%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main complaint list */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Your Complaints
                    </h2>
                    <Link
                      href="/citizen/submit"
                      className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      <PlusIcon
                        className="-ml-0.5 mr-1.5 h-4 w-4"
                        aria-hidden="true"
                      />
                      New Complaint
                    </Link>
                  </div>
                  <div className="mt-4 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6">
                      <button
                        onClick={() => setActiveTab("all")}
                        className={`border-b-2 py-2 px-1 text-sm font-medium ${
                          activeTab === "all"
                            ? "border-primary-500 text-primary-600"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setActiveTab("active")}
                        className={`border-b-2 py-2 px-1 text-sm font-medium ${
                          activeTab === "active"
                            ? "border-primary-500 text-primary-600"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => setActiveTab("resolved")}
                        className={`border-b-2 py-2 px-1 text-sm font-medium ${
                          activeTab === "resolved"
                            ? "border-primary-500 text-primary-600"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        Resolved
                      </button>
                      <button
                        onClick={() => setActiveTab("rejected")}
                        className={`border-b-2 py-2 px-1 text-sm font-medium ${
                          activeTab === "rejected"
                            ? "border-primary-500 text-primary-600"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        Rejected
                      </button>
                    </nav>
                  </div>
                </div>

                <ul className="divide-y divide-gray-200">
                  {filteredComplaints.length > 0 ? (
                    filteredComplaints.map((complaint) => {
                      const StatusIcon = statusBadges[complaint.status].icon;
                      return (
                        <li
                          key={complaint.id}
                          className="px-6 py-4 hover:bg-gray-50"
                        >
                          <Link
                            href={`/citizen/track?id=${complaint.id}`}
                            className="block"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <p className="text-base font-medium text-gray-900 truncate">
                                  {complaint.title}
                                </p>
                                <div className="mt-1 flex flex-wrap gap-y-1 gap-x-4 text-sm text-gray-500">
                                  <div>
                                    <span className="font-medium text-gray-900">
                                      ID:
                                    </span>{" "}
                                    {complaint.id}
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-900">
                                      Category:
                                    </span>{" "}
                                    {complaint.category}
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-900">
                                      Submitted:
                                    </span>{" "}
                                    {formatDate(complaint.createdAt)}
                                  </div>
                                </div>
                              </div>
                              <div className="ml-4 flex flex-shrink-0 items-center space-x-4">
                                <div
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    statusBadges[complaint.status].color
                                  }`}
                                >
                                  <StatusIcon
                                    className="mr-1 h-4 w-4"
                                    aria-hidden="true"
                                  />
                                  {statusBadges[complaint.status].text}
                                </div>
                                <ArrowRightIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })
                  ) : (
                    <li className="px-6 py-12 text-center">
                      <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-base font-semibold text-gray-900">
                        No complaints found
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        You don't have any{" "}
                        {activeTab !== "all" ? activeTab : ""} complaints yet.
                      </p>
                      <div className="mt-6">
                        <Link
                          href="/citizen/submit"
                          className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                          <PlusIcon
                            className="-ml-0.5 mr-1.5 h-4 w-4"
                            aria-hidden="true"
                          />
                          Submit a Complaint
                        </Link>
                      </div>
                    </li>
                  )}
                </ul>

                {filteredComplaints.length > 0 && (
                  <div className="border-t border-gray-200 px-6 py-4 text-center">
                    <Link
                      href="/citizen/track"
                      className="text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                      View all complaints
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Notifications and quick actions panel */}
            <div className="space-y-8">
              {/* Notifications */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Notifications
                    </h2>
                    {activeNotifications > 0 && (
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                        {activeNotifications} new
                      </span>
                    )}
                  </div>
                </div>
                <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {mockNotifications.length > 0 ? (
                    mockNotifications.map((notification) => (
                      <li
                        key={notification.id}
                        className="px-6 py-4 hover:bg-gray-50"
                      >
                        <Link
                          href={`/citizen/track?id=${notification.relatedId}`}
                          className="block"
                          onClick={() =>
                            !notification.read &&
                            markNotificationAsRead(notification.id)
                          }
                        >
                          <div className="flex items-start">
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm ${
                                  notification.read
                                    ? "text-gray-600"
                                    : "font-medium text-gray-900"
                                }`}
                              >
                                {notification.message}
                              </p>
                              <p className="mt-1 text-xs text-gray-500">
                                {new Date(notification.date).toLocaleString()}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="ml-3 flex-shrink-0">
                                <div className="h-2 w-2 rounded-full bg-primary-600"></div>
                              </div>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="px-6 py-8 text-center">
                      <p className="text-sm text-gray-500">
                        No notifications yet
                      </p>
                    </li>
                  )}
                </ul>
                {mockNotifications.length > 0 && (
                  <div className="border-t border-gray-200 px-6 py-4 text-center">
                    <button
                      type="button"
                      className="text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Quick Actions
                </h2>
                <div className="mt-6 space-y-4">
                  <Link
                    href="/citizen/submit"
                    className="group block w-full rounded-lg p-4 border border-gray-200 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 rounded-md bg-primary-100 p-2">
                        <PlusIcon
                          className="h-5 w-5 text-primary-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-900">
                          Submit New Complaint
                        </p>
                        <p className="text-sm text-gray-500">
                          Report an issue with public services
                        </p>
                      </div>
                      <div className="ml-auto">
                        <ArrowRightIcon
                          className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/citizen/track"
                    className="group block w-full rounded-lg p-4 border border-gray-200 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 rounded-md bg-indigo-100 p-2">
                        <ClockIcon
                          className="h-5 w-5 text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-900">
                          Track Complaints
                        </p>
                        <p className="text-sm text-gray-500">
                          Check status of your submissions
                        </p>
                      </div>
                      <div className="ml-auto">
                        <ArrowRightIcon
                          className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/profile"
                    className="group block w-full rounded-lg p-4 border border-gray-200 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 rounded-md bg-green-100 p-2">
                        <PencilSquareIcon
                          className="h-5 w-5 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-900">
                          Edit Profile
                        </p>
                        <p className="text-sm text-gray-500">
                          Update your personal information
                        </p>
                      </div>
                      <div className="ml-auto">
                        <ArrowRightIcon
                          className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Community Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Community Statistics
                </h2>
                <dl className="mt-5 grid grid-cols-1 gap-5">
                  <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">
                      Total Complaints in Your Area
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                      1,482
                    </dd>
                  </div>
                  <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">
                      Resolution Rate
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                      72%
                    </dd>
                  </div>
                  <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">
                      Average Response Time
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                      3.2 days
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
