import React, { useEffect, useState } from 'react'
import { dummyEmployeeDashboardData, dummyAdminDashboardData } from '../assets/assets';
import Loading from '../Components/Loading';
import EmployeeDashboard from '../Components/EmployeeDashboard';
import AdminDashboard from '../Components/AdminDashboard';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    setData(dummyAdminDashboardData);
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  if(loading) return <Loading/>

  if(!data) return <p className='text-center text-slate-500 py-12'>Failed to load dashboard data</p>

  if(data.role === "ADMIN") {
    return <AdminDashboard data={data} />
  } else {
    return <EmployeeDashboard data={data} />
  }

}

export default Dashboard
