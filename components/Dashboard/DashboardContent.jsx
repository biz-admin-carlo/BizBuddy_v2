// biz-web-app/components/Dashboard/DashboardContent/SideBar.jsx

"use client";
import { lazy, Suspense } from "react";

// Lazy load components for code splitting (optional)
const Analytics = lazy(() => import("./DashboardContent/Features/Analytics"));
const TimeLogs = lazy(() => import("./DashboardContent/Features/TimeLogs"));
const MyPayroll = lazy(() => import("./DashboardContent/Features/Payroll"));
const ShiftSchedule = lazy(() =>
  import("./DashboardContent/Features/ShiftSchedule")
);
const Punch = lazy(() => import("./DashboardContent/Features/Punch"));
const RequestLeaves = lazy(() =>
  import("./DashboardContent/Features/RequestLeaves")
);
const ApprovalLeaves = lazy(() =>
  import("./DashboardContent/Features/ApprovalLeaves")
);

const MySubscription = lazy(() =>
  import("./DashboardContent/Settings/MySubscription")
);

const Companies = lazy(() => import("./DashboardContent/Settings/Company"));
const Departments = lazy(() =>
  import("./DashboardContent/Settings/Departments")
);
const Employees = lazy(() => import("./DashboardContent/Settings/Employees"));
const EmployeesLocations = lazy(() =>
  import("./DashboardContent/Settings/EmployeesLocations")
);
const EmployeesShiftSchedules = lazy(() =>
  import("./DashboardContent/Settings/EmployeesShiftShedules")
);
const EmployeesLeaveRequests = lazy(() =>
  import("./DashboardContent/Settings/EmployeesLeaveRequests")
);
const PreferenceAppearance = lazy(() =>
  import("./DashboardContent/Settings/PreferenceAppearance")
);
const Payroll = lazy(() => import("./DashboardContent/Settings/Payroll"));
const Subscribers = lazy(() =>
  import("./DashboardContent/Settings/Subscribers")
);
const SubscriptionPlans = lazy(() =>
  import("./DashboardContent/Settings/SubscriptionPlans")
);

export default function DashboardContent({
  activeNav,
  companyId,
  role,
  onNavChange,
}) {
  // Determine which component to render based on activeNav.
  let ContentComponent;
  switch (activeNav) {
    // Features
    case "analytics":
      ContentComponent = Analytics;
      break;
    case "time-logs":
      ContentComponent = TimeLogs;
      break;
    case "shift-schedule":
      ContentComponent = ShiftSchedule;
      break;
    case "punch":
      ContentComponent = Punch;
      break;
    case "mypayroll":
      ContentComponent = MyPayroll;
      break;
    case "request-leave":
      ContentComponent = RequestLeaves;
      break;
    case "approval-leaves":
      ContentComponent = ApprovalLeaves;
      break;

    // Settings
    case "mysubscription":
      ContentComponent = MySubscription;
      break;
    case "companies":
      ContentComponent = Companies;
      break;
    case "departments":
      ContentComponent = Departments;
      break;
    case "employees":
      ContentComponent = Employees;
      break;
    case "departments":
      ContentComponent = Departments;
      break;
    case "locations":
      ContentComponent = EmployeesLocations;
      break;
    case "shifts-schedules":
      ContentComponent = EmployeesShiftSchedules;
      break;
    case "leave-requests":
      ContentComponent = EmployeesLeaveRequests;
      break;
    case "appearance":
      ContentComponent = PreferenceAppearance;
      break;
    case "payroll":
      ContentComponent = Payroll;
      break;
    case "subscribers":
      ContentComponent = Subscribers;
      break;
    case "subscription-plans":
      ContentComponent = SubscriptionPlans;
      break;

    default:
      ContentComponent = () => (
        <div className="py-10 px-4">
          <p>Select an option from the sidebar to see its content.</p>
        </div>
      );
      break;
  }

  return (
    <main className="py-10 px-4 md:pr-20">
      <Suspense fallback={<p>Loading...</p>}>
        <ContentComponent />
      </Suspense>
    </main>
  );
}
