// src/app/admin/dashboard/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowPathIcon,
  ArrowRightIcon,
  ArrowTrendingUpIcon,
  BellAlertIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ClockIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ChartBarIcon } from "@heroicons/react/24/solid";
import { ComponentType, SVGProps } from "react";

// Define types for better TypeScript support
type StatusKey =
  | "pending"
  | "received"
  | "in_progress"
  | "resolved"
  | "rejected";
type PriorityLevel = "critical" | "high" | "medium" | "low";

type StatusBadgeConfig = {
  color: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
};

type StatItem = {
  name: string;
  value: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  change: string;
  changeType: "increase" | "decrease";
};

type Complaint = {
  id: string;
  title: string;
  category: string;
  location: string;
  status: StatusKey;
  priority: PriorityLevel;
  createdAt: string;
  updatedAt: string;
  agency: string;
  citizenName: string;
  citizenContact: string;
};

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: PriorityLevel;
};

// Sample data for dashboard
const stats: StatItem[] = [
  {
    name: "Total Complaints",
    value: "3,456",
    icon: DocumentTextIcon,
    change: "+12%",
    changeType: "increase",
  },
  {
    name: "Pending Resolution",
    value: "1,245",
    icon: ClockIcon,
    change: "+8%",
    changeType: "increase",
  },
  {
    name: "Resolved This Month",
    value: "842",
    icon: CheckCircleIcon,
    change: "+22%",
    changeType: "increase",
  },
  {
    name: "Avg. Response Time",
    value: "1.8 days",
    icon: ArrowTrendingUpIcon,
    change: "-14%",
    changeType: "decrease",
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

// Sample complaints data
const complaints: Complaint[] = [
  {
    id: "CMP123456",
    title: "Broken Street Light on Main Avenue",
    category: "Roads & Infrastructure",
    location: "Main Avenue & 5th Street",
    status: "in_progress",
    priority: "medium",
    createdAt: "2025-05-15T10:30:00Z",
    updatedAt: "2025-05-17T14:20:00Z",
    agency: "Department of Public Works",
    citizenName: "John Doe",
    citizenContact: "john.doe@example.com",
  },
  {
    id: "CMP789012",
    title: "Excessive Garbage Accumulation",
    category: "Waste Management",
    location: "Eastern Suburb, Residential Zone B",
    status: "pending",
    priority: "high",
    createdAt: "2025-05-19T15:20:00Z",
    updatedAt: "2025-05-19T15:20:00Z",
    agency: "Waste Management Department",
    citizenName: "Alice Smith",
    citizenContact: "alice.smith@example.com",
  },
  {
    id: "CMP345678",
    title: "Pothole Damage on Highway 42",
    category: "Roads & Infrastructure",
    location: "Highway 42, Mile Marker 23",
    status: "received",
    priority: "high",
    createdAt: "2025-05-18T09:15:00Z",
    updatedAt: "2025-05-18T11:30:00Z",
    agency: "Department of Transportation",
    citizenName: "Robert Johnson",
    citizenContact: "robert.j@example.com",
  },
  {
    id: "CMP567890",
    title: "Water Leakage from Main Pipeline",
    category: "Water & Sanitation",
    location: "West District, Block D",
    status: "pending",
    priority: "critical",
    createdAt: "2025-05-20T08:10:00Z",
    updatedAt: "2025-05-20T08:10:00Z",
    agency: "Water Authority",
    citizenName: "Maria Garcia",
    citizenContact: "maria.g@example.com",
  },
  {
    id: "CMP234567",
    title: "Non-functioning Traffic Signal",
    category: "Roads & Infrastructure",
    location: "Junction of Park Road and Lake Avenue",
    status: "in_progress",
    priority: "high",
    createdAt: "2025-05-16T13:45:00Z",
    updatedAt: "2025-05-17T10:20:00Z",
    agency: "Traffic Management Authority",
    citizenName: "David Wilson",
    citizenContact: "david.wilson@example.com",
  },
];

// Sample task data
const tasks: Task[] = [
  {
    id: 1,
    title: "Review new complaints",
    description:
      "Review and assign 15 new complaints submitted in the last 24 hours",
    dueDate: "2025-05-21",
    priority: "high",
  },
  {
    id: 2,
    title: "Follow up on road repairs",
    description:
      "Check status of road repairs on Main Street reported in CMP123456",
    dueDate: "2025-05-22",
    priority: "medium",
  },
  {
    id: 3,
    title: "Coordinate with Waste Management",
    description: "Discuss solution for garbage accumulation in Eastern Suburb",
    dueDate: "2025-05-23",
    priority: "high",
  },
  {
    id: 4,
    title: "Prepare monthly report",
    description:
      "Compile statistics and prepare monthly complaint resolution report",
    dueDate: "2025-05-30",
    priority: "medium",
  },
];

// Priority level indicator
function PriorityIndicator({ priority }: { priority: PriorityLevel }) {
  let bgColor;
  switch (priority) {
    case "critical":
      bgColor = "bg-red-600";
      break;
    case "high":
      bgColor = "bg-orange-500";
      break;
    case "medium":
      bgColor = "bg-yellow-500";
      break;
    case "low":
      bgColor = "bg-green-500";
      break;
    default:
      bgColor = "bg-gray-400";
  }
  return <span className={`inline-block w-3 h-3 rounded-full ${bgColor}`} />;
}

export default function AdminDashboard() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // Format date for display
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Filter complaints based on selected filters
  const filteredComplaints = complaints.filter((complaint) => {
    if (filterStatus !== "all" && complaint.status !== filterStatus)
      return false;
    if (filterPriority !== "all" && complaint.priority !== filterPriority)
      return false;
    if (filterCategory !== "all" && complaint.category !== filterCategory)
      return false;
    return true;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Admin top navigation bar */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <span className="text-lg font-bold text-primary-600">
                  CitizenConnect Admin
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View notifications</span>
                <BellAlertIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="ml-4 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary-200 flex items-center justify-center">
                    <UserIcon
                      className="h-5 w-5 text-primary-600"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">
                    Department of Public Works
                  </p>
                </div>
                <ChevronDownIcon
                  className="ml-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-8">
          {/* Dashboard Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Monitor and manage citizen complaints and engagement across all
              departments.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon
                        className="h-6 w-6 text-primary-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.name}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {stat.value}
                          </div>
                          <div
                            className={`ml-2 flex items-baseline text-sm font-semibold ${
                              stat.changeType === "increase"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {stat.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main complaint list */}
            <div className="lg:col-span-2 space-y-6">
              {/* Filter controls */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Complaint Management
                  </h2>
                  <div className="flex space-x-2">
                    <Link
                      href="/admin/complaints"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      View All
                      <ArrowRightIcon
                        className="ml-1 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <ArrowPathIcon
                        className="h-4 w-4 mr-1"
                        aria-hidden="true"
                      />
                      Refresh
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label
                      htmlFor="status-filter"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Status
                    </label>
                    <select
                      id="status-filter"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="received">Received</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="priority-filter"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Priority
                    </label>
                    <select
                      id="priority-filter"
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="all">All Priorities</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="category-filter"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category
                    </label>
                    <select
                      id="category-filter"
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="all">All Categories</option>
                      <option value="Roads & Infrastructure">
                        Roads & Infrastructure
                      </option>
                      <option value="Water & Sanitation">
                        Water & Sanitation
                      </option>
                      <option value="Electricity">Electricity</option>
                      <option value="Waste Management">Waste Management</option>
                      <option value="Public Transportation">
                        Public Transportation
                      </option>
                      <option value="Environment & Pollution">
                        Environment & Pollution
                      </option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Search complaints by ID, title, or location..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Complaints table */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Recent Complaints
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Showing {filteredComplaints.length} complaints
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          <div className="flex items-center">
                            <span>Priority</span>
                            <FunnelIcon
                              className="ml-1 h-4 w-4 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          ID/Details
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Submitted
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredComplaints.map((complaint) => {
                        const StatusIcon = statusBadges[complaint.status].icon;
                        return (
                          <tr key={complaint.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <PriorityIndicator
                                  priority={complaint.priority}
                                />
                                <span className="ml-2 text-xs capitalize">
                                  {complaint.priority}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-start flex-col">
                                <div className="text-sm font-medium text-gray-900">
                                  {complaint.id}
                                </div>
                                <div className="text-sm text-gray-900 font-medium">
                                  {complaint.title}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {complaint.location}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {complaint.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  statusBadges[complaint.status].color
                                }`}
                              >
                                <StatusIcon
                                  className="mr-1 h-4 w-4"
                                  aria-hidden="true"
                                />
                                {statusBadges[complaint.status].text}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(complaint.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                href={`/admin/complaints/${complaint.id}`}
                                className="text-primary-600 hover:text-primary-900 mr-4"
                              >
                                View
                              </Link>
                              <button
                                type="button"
                                className="text-primary-600 hover:text-primary-900"
                              >
                                Assign
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right sidebar - Tasks and Quick Stats */}
            <div className="space-y-6">
              {/* Tasks panel */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Your Tasks
                    </h2>
                    <button
                      type="button"
                      className="text-primary-600 hover:text-primary-900 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                </div>
                <ul className="divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <li key={task.id}>
                      <div className="px-6 py-4">
                        <div className="flex items-start">
                          <input
                            id={`task-${task.id}`}
                            name={`task-${task.id}`}
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                          />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {task.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {task.description}
                            </p>
                            <div className="mt-2 flex items-center text-xs">
                              <span
                                className={`px-2 py-0.5 rounded-full ${
                                  task.priority === "high"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {task.priority.charAt(0).toUpperCase() +
                                  task.priority.slice(1)}
                              </span>
                              <span className="ml-2 text-gray-500">
                                Due: {task.dueDate}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="px-6 py-4 border-t border-gray-200">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 w-full justify-center"
                  >
                    Add New Task
                  </button>
                </div>
              </div>

              {/* Department Performance */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Department Performance
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 flex items-center justify-between">
                      <span>Water Authority</span>
                      <span className="text-gray-900">87%</span>
                    </dt>
                    <dd className="mt-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "87%" }}
                        ></div>
                      </div>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 flex items-center justify-between">
                      <span>Department of Transportation</span>
                      <span className="text-gray-900">76%</span>
                    </dt>
                    <dd className="mt-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "76%" }}
                        ></div>
                      </div>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 flex items-center justify-between">
                      <span>Waste Management</span>
                      <span className="text-gray-900">63%</span>
                    </dt>
                    <dd className="mt-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "63%" }}
                        ></div>
                      </div>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 flex items-center justify-between">
                      <span>Public Works</span>
                      <span className="text-gray-900">58%</span>
                    </dt>
                    <dd className="mt-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "58%" }}
                        ></div>
                      </div>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 flex items-center justify-between">
                      <span>Energy Department</span>
                      <span className="text-gray-900">42%</span>
                    </dt>
                    <dd className="mt-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: "42%" }}
                        ></div>
                      </div>
                    </dd>
                  </div>
                </dl>
                <div className="mt-5">
                  <Link
                    href="/admin/reports"
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    View detailed performance reports
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Quick Analytics */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Quick Analytics
                  </h3>
                  <ChartBarIcon
                    className="h-5 w-5 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Resolution Rate
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      72%
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      This Week
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      246
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Response Time
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      1.8d
                    </dd>
                  </div>
                  <div>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      1.4k
                    </dd>
                  </div>
                </dl>
                <div className="mt-5">
                  <Link
                    href="/admin/analytics"
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    View full analytics dashboard
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  System Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm text-gray-500">API Services</p>
                    </div>
                    <span className="text-sm text-gray-900">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm text-gray-500">Database</p>
                    </div>
                    <span className="text-sm text-gray-900">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm text-gray-500">Web Application</p>
                    </div>
                    <span className="text-sm text-gray-900">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                      <p className="text-sm text-gray-500">
                        Notification System
                      </p>
                    </div>
                    <span className="text-sm text-gray-900">Degraded</span>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Last updated: May 21, 2025, 08:45 AM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
