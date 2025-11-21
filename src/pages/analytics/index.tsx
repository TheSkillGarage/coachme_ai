import HelmetLayout, { type HelmetProps } from "../../layouts/helmetlayout";
import { StatsCard } from "./StatsCard";
import { ClipboardList, TrendingUp, Clock3, CalendarDays } from "lucide-react";

import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

export default function AnalyticsPage() {
  const tags: HelmetProps = {
    pageTitle: "Analytics",
    description: "",
  };

  // ---- Chart Data ----
  const applicationTrend = [
    { month: "Jan", value: 40 },
    { month: "Feb", value: 78 },
    { month: "Mar", value: 85 },
    { month: "Apr", value: 80 },
    { month: "May", value: 90 },
    { month: "Jun", value: 100 },
    { month: "Jul", value: 95 },
  ];

  const responseDistribution = [
    { day: "0-1", value: 18 },
    { day: "2-3", value: 14 },
    { day: "4-5", value: 17 },
    { day: "6-7", value: 21 },
    { day: "8-10", value: 16 },
    { day: "10+", value: 19 },
  ];

  const statusBreakdown = [
    { name: "Applied", value: 47, color: "#67005E" },
    { name: "Pending Applications", value: 22, color: "#995493" },
    { name: "Interviews Scheduled", value: 6, color: "#390034" },
    { name: "Offers Received", value: 3, color: "#FFDAFC" },
  ];

  const industryData = [
    { name: "Technology", value: 48 },
    { name: "Finance", value: 40 },
    { name: "Healthcare", value: 34 },
    { name: "Consulting", value: 20 },
    { name: "Agriculture", value: 10 },
  ];

  const successPercent = 21.3;

  return (
    <HelmetLayout {...tags}>
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Heading */}
        <h1 className="text-2xl font-bold">Analytics and Insights</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Track your job search performance and insights
        </p>

        {/* ----------------- 4 TOP CARDS ----------------- */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 my-5">
          <StatsCard
            title="Total Applications"
            value="47"
            change="↗ +12 from last month"
            icon={<ClipboardList className="w-4 h-4 text-[#C026D3]" />}
            iconBg="bg-[#F5D0FF]"
          />

          <StatsCard
            title="Response Rate"
            value="34%"
            change="↗ +8% from last month"
            icon={<TrendingUp className="w-4 h-4 text-[#059669]" />}
            iconBg="bg-[#D1FAE5]"
          />

          <StatsCard
            title="Average Response Time"
            value="5.2 d"
            change="↗ +1.1 from last month"
            icon={<Clock3 className="w-4 h-4 text-[#EA580C]" />}
            iconBg="bg-[#FFECD1]"
          />

          <StatsCard
            title="Interviews Rate"
            value="10%"
            change="↘ -2% from last month"
            changeColor="text-red-600"
            icon={<CalendarDays className="w-4 h-4 text-[#374151]" />}
            iconBg="bg-[#F3F4F6]"
          />
        </div>

        {/* ----------------- CHARTS (SIDE BY SIDE) ----------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Application Trends */}
          <div className="bg-white shadow-sm rounded-xl p-5 h-[350px]">
            <h2 className="text-lg font-semibold mb-2">Application Trends</h2>
            <p className="text-xs text-gray-400 mb-2">
              Applications over months
            </p>

            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={applicationTrend} margin={{ bottom: 30 }}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#67005E" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#67005E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ececec" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} label={{ value: 'Month', position: 'insideBottom', offset: -15, fontSize: 12, fontWeight: 'bold', fill: '#000000' }} />
                <YAxis tick={{ fontSize: 12 }} label={{ value: 'Applications', angle: -90, position: 'center', fontSize: 12, fontWeight: 'bold', fill: '#000000', dx: -15 }}/>
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#67005E"
                  fill="url(#colorTrend)"
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#67005E"
                  dot={{ r: 4, stroke: "white", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Response Time Distribution */}
          <div className="bg-white shadow-sm rounded-xl p-5 h-[350px]">
            <h2 className="text-lg font-semibold mb-2">
              Response Time Distribution
            </h2>
            <p className="text-xs text-gray-400 mb-2">Days taken to respond</p>

            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={responseDistribution} margin={{ bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ececec" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} label={{ value: 'Days', position: 'insideBottom', offset: -15, fontSize: 12, fontWeight: 'bold', fill: '#000000' }}/>
                <YAxis tick={{ fontSize: 12 }} label={{ value: 'Number of Days', angle: -90, position: 'center', fontSize: 12, fontWeight: 'bold', fill: '#000000', dx: -15 }}/>
                <Tooltip />
                <Bar dataKey="value" fill="#67005E" radius={[6, 6, 6, 6]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ----------------- BOTTOM 3 BOXES ----------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

  {/* Industry Performance */}
  <div className=" bg-white rounded-xl shadow-sm border-[#E5E7EB] p-3">
    <h3 className="text-lg font-semibold mb-4">Industry Performance</h3>

    <div className="space-y-5">
      {industryData.map((item) => (
        <div key={item.name}>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="font-medium text-gray-700">{item.name}</span>
            <span className="text-gray-800 font-semibold">{item.value}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${item.value}%`,
                backgroundColor: "#67005E",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Donut Chart */}
  <div className="bg-white rounded-xl shadow-sm  border-[#E5E7EB] p-3">
    <h3 className="text-lg font-semibold mb-4">Application Status Breakdown</h3>

    <div className="w-full h-[190px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={statusBreakdown}
            dataKey="value"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
          >
            {statusBreakdown.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Legend */}
    <div className="text-[12px]">
      {statusBreakdown.map((s) => (
        <div key={s.name} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-sm inline-block"
            style={{ background: s.color }}
          />
          <span className="text-gray-800">
            {s.name}: <strong>{s.value}</strong>
          </span>
        </div>
      ))}
    </div>
  </div>

  {/* Success Metrics */}
  <div className="bg-white rounded-xl shadow-sm border-[#E5E7EB] p-3 flex flex-col items-center">
    <h3 className="text-lg font-semibold mb-4">Success Metrics</h3>

    <div className="flex flex-col items-center">
      <svg width="180" height="180" viewBox="0 0 160 160">
        <circle
          cx="80"
          cy="80"
          r="64"
          stroke="#F0F0F0"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="80"
          cy="80"
          r="64"
          stroke="#67005E"
          strokeWidth="12"
          strokeDasharray={`${
            (successPercent / 100) * 2 * Math.PI * 64
          } ${2 * Math.PI * 64}`}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
          fill="none"
        />
        <text
          x="80"
          y="90"
          textAnchor="middle"
          fontSize="26"
          fontWeight="700"
          fill="#111"
        >
          {successPercent}%
        </text>
      </svg>

      <p className="text-sm text-gray-600 mt-3 font-medium">
        Offers Received
      </p>
    </div>
  </div>
</div>

      </div>
    </HelmetLayout>
  );
}
