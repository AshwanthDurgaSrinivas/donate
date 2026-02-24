import React, { useState, useEffect } from 'react';
import { Database, Users, FileUp, LogOut, CheckCircle, Trash2, Download, Plus, FileText, Loader2, Phone, Mail, MessageSquare, Globe, Check } from 'lucide-react';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('donations');
    const [data, setData] = useState({ stats: null, recent: [], reports: [], leads: [] });
    const [uploading, setUploading] = useState(false);
    const [reportTitle, setReportTitle] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('admin_token', data.token);
                setIsAuthenticated(true);
            } else {
                alert('Invalid Password');
            }
        } catch (error) {
            console.error("Login error", error);
            alert('Server error');
        }
    };

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/dashboard-stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const json = await res.json();
                setData(json);
            } else if (res.status === 401) {
                localStorage.removeItem('admin_token');
                setIsAuthenticated(false);
            }
        } catch (e) {
            console.error("Fetch stats error", e);
        }
    };

    const handleCompleteLead = async (id) => {
        if (!confirm("Is this website project completed? This will increment the public 'Websites Sold' counter.")) return;
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/leads/${id}/complete`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                fetchDashboardData();
            } else {
                const err = await res.json();
                alert(err.error || "Failed to update lead");
            }
        } catch (error) {
            console.error("Complete lead error", error);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('report', file);
        formData.append('title', reportTitle || file.name);

        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/upload-report`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (res.ok) {
                alert("Report uploaded successfully!");
                setReportTitle('');
                fetchDashboardData();
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            console.error("Upload error", error);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteReport = async (id) => {
        if (!confirm("Are you sure you want to delete this report?")) return;

        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/reports/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                fetchDashboardData();
            }
        } catch (error) {
            console.error("Delete error", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token) setIsAuthenticated(true);
    }, []);

    useEffect(() => {
        if (isAuthenticated) fetchDashboardData();
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <Database className="w-6 h-6" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-8">Admin Dashboard Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                                placeholder="Enter password"
                            />
                        </div>
                        <button type="submit" className="w-full btn-primary py-3">
                            Access Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 hidden lg:block h-screen sticky top-0">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-primary italic underline uppercase tracking-tighter">Aryansh Admin</h2>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('donations')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === 'donations' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Users className="w-5 h-5" />
                        <span>Donations</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('leads')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === 'leads' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Globe className="w-5 h-5" />
                        <span>Website Leads</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('reports')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === 'reports' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <FileUp className="w-5 h-5" />
                        <span>Upload Reports</span>
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem('admin_token');
                            setIsAuthenticated(false);
                        }}
                        className="w-full flex items-center space-x-3 text-red-500 hover:bg-red-50 px-4 py-3 rounded-xl font-medium transition mt-10"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-8">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab.replace('-', ' ')} Overview</h1>
                    <button
                        onClick={fetchDashboardData}
                        className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
                    >
                        Refresh Data
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm mb-1">Total Raised</p>
                        <h3 className="text-2xl font-bold text-green-600">₹{(data.stats?.total_raised || 0).toLocaleString()}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm mb-1">Total Donors</p>
                        <h3 className="text-2xl font-bold text-red-600">{(data.stats?.total_donors || 0)}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm mb-1">Websites Sold</p>
                        <h3 className="text-2xl font-bold text-primary">{(data.stats?.websites_sold || 0)} / 500</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm mb-1">Target Remaining</p>
                        <h3 className="text-2xl font-bold text-orange-500">
                            ₹{((data.stats?.target_amount || 16000000) - (data.stats?.total_raised || 0)).toLocaleString()}
                        </h3>
                    </div>
                </div>

                {activeTab === 'donations' && (
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr className="text-xs text-gray-400 uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">Transaction ID</th>
                                    <th className="px-6 py-4 font-semibold">User</th>
                                    <th className="px-6 py-4 font-semibold">Amount</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {data.recent.map((d) => (
                                    <tr key={d.id} className="hover:bg-gray-50 transition text-sm">
                                        <td className="px-6 py-4 text-gray-500 font-mono">{d.order_id}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold">{d.is_anonymous ? 'Anonymous' : d.donor_name}</div>
                                            <div className="text-xs text-gray-400">{d.email}</div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900">₹{d.amount.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${d.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                                {d.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">
                                            {new Date(d.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {data.recent.length === 0 && <div className="p-20 text-center text-gray-400">No donations found.</div>}
                    </div>
                )}

                {activeTab === 'leads' && (
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr className="text-xs text-gray-400 uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">Business Info</th>
                                    <th className="px-6 py-4 font-semibold">Contact</th>
                                    <th className="px-6 py-4 font-semibold">Message</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {(data.leads || []).map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50 transition text-sm">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{lead.name}</div>
                                            <div className="text-[10px] text-gray-400 uppercase tracking-tighter">
                                                {new Date(lead.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2 text-gray-700 font-medium">
                                                <Phone className="w-3 h-3 text-gray-400" />
                                                <span>{lead.mobile}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-gray-500 text-xs mt-1">
                                                <Mail className="w-3 h-3 text-gray-400" />
                                                <span>{lead.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs">
                                            <p className="text-gray-600 line-clamp-1 italic">{lead.message || 'No message'}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${lead.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
                                                {lead.status || 'New'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                {lead.status !== 'completed' && (
                                                    <button
                                                        onClick={() => handleCompleteLead(lead.id)}
                                                        className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition shadow-sm"
                                                        title="Mark as Completed (Adds to goal)"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <a
                                                    href={`tel:${lead.mobile}`}
                                                    className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
                                                    title="Call Lead"
                                                >
                                                    <Phone className="w-4 h-4" />
                                                </a>
                                                <a
                                                    href={`mailto:${lead.email}`}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                                                    title="Email Lead"
                                                >
                                                    <Mail className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {(data.leads || []).length === 0 && <div className="p-20 text-center text-gray-400">No website leads received yet.</div>}
                    </div>
                )}

                {activeTab === 'reports' && (
                    <div className="space-y-8">
                        {/* Upload Form */}
                        <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-200 text-center">
                            <h3 className="text-lg font-bold mb-4">Post New Report/Document</h3>
                            <div className="max-w-md mx-auto space-y-4">
                                <input
                                    type="text"
                                    placeholder="Report Title (e.g. Hospital Bill Feb 2024)"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/20"
                                    value={reportTitle}
                                    onChange={(e) => setReportTitle(e.target.value)}
                                />
                                <label className="flex items-center justify-center space-x-2 bg-gray-50 border border-gray-200 py-4 rounded-xl cursor-pointer hover:bg-gray-100 transition group">
                                    {uploading ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <Plus className="w-5 h-5 text-gray-400 group-hover:text-primary" />}
                                    <span className="font-bold text-gray-600 group-hover:text-primary">{uploading ? "Uploading..." : "Click to select File"}</span>
                                    <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                                </label>
                                <p className="text-xs text-gray-400">Max size: 10MB (PDF, JPG, PNG)</p>
                            </div>
                        </div>

                        {/* Reports List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(data.reports || []).map((report) => (
                                <div key={report.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h4 className="font-bold text-sm text-gray-900 truncate">{report.title}</h4>
                                        <p className="text-xs text-gray-400">{new Date(report.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex space-x-1">
                                        <a
                                            href={`${import.meta.env.VITE_API_URL}${report.file_url}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-2 text-gray-400 hover:text-primary transition"
                                        >
                                            <Download className="w-4 h-4" />
                                        </a>
                                        <button
                                            onClick={() => handleDeleteReport(report.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {(data.reports || []).length === 0 && <div className="text-center py-10 text-gray-400">No reports uploaded yet.</div>}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Admin;
