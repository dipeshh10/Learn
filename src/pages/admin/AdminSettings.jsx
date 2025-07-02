import React, { useState } from 'react';
import { Save, Upload, Globe, Shield, Bell, Database, Mail, Key, Users, Settings } from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'LearnX',
      siteDescription: 'Professional online learning platform for everyone',
      siteUrl: 'https://learnx.com',
      contactEmail: 'support@learnx.com',
      timezone: 'UTC',
      language: 'en'
    },
    security: {
      requireEmailVerification: true,
      enableTwoFactor: false,
      passwordMinLength: 8,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      enableCaptcha: true
    },
    notifications: {
      emailNotifications: true,
      newUserRegistration: true,
      courseSubmissions: true,
      systemAlerts: true,
      weeklyReports: true,
      maintenanceAlerts: true
    },
    content: {
      allowUserUploads: true,
      maxFileSize: 100,
      allowedFileTypes: 'pdf,doc,docx,ppt,pptx,jpg,png,gif',
      moderateContent: true,
      autoApprove: false,
      enableComments: true
    }
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSave = (category) => {
    console.log(`Saving ${category} settings:`, settings[category]);
    alert(`${category.charAt(0).toUpperCase() + category.slice(1)} settings saved successfully!`);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'content', label: 'Content', icon: Database }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Settings</h1>
          <p className="text-gray-600">Configure your platform settings and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="card p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="card p-8">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
                    <button
                      onClick={() => handleSave('general')}
                      className="btn-primary flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Site Name
                        </label>
                        <input
                          type="text"
                          value={settings.general.siteName}
                          onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          value={settings.general.contactEmail}
                          onChange={(e) => handleSettingChange('general', 'contactEmail', e.target.value)}
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Description
                      </label>
                      <textarea
                        value={settings.general.siteDescription}
                        onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
                        rows={3}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site URL
                      </label>
                      <input
                        type="url"
                        value={settings.general.siteUrl}
                        onChange={(e) => handleSettingChange('general', 'siteUrl', e.target.value)}
                        className="input-field"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timezone
                        </label>
                        <select
                          value={settings.general.timezone}
                          onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                          className="input-field"
                        >
                          <option value="UTC">UTC</option>
                          <option value="EST">Eastern Time</option>
                          <option value="PST">Pacific Time</option>
                          <option value="GMT">Greenwich Mean Time</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Language
                        </label>
                        <select
                          value={settings.general.language}
                          onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                          className="input-field"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                    <button
                      onClick={() => handleSave('security')}
                      className="btn-primary flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Minimum Password Length
                        </label>
                        <input
                          type="number"
                          value={settings.security.passwordMinLength}
                          onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Session Timeout (minutes)
                        </label>
                        <input
                          type="number"
                          value={settings.security.sessionTimeout}
                          onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum Login Attempts
                      </label>
                      <input
                        type="number"
                        value={settings.security.maxLoginAttempts}
                        onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                        className="input-field"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Require Email Verification</h4>
                          <p className="text-sm text-gray-600">Users must verify their email before accessing the platform</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.security.requireEmailVerification}
                            onChange={(e) => handleSettingChange('security', 'requireEmailVerification', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Enable Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.security.enableTwoFactor}
                            onChange={(e) => handleSettingChange('security', 'enableTwoFactor', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Enable CAPTCHA</h4>
                          <p className="text-sm text-gray-600">Show CAPTCHA on login and registration forms</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.security.enableCaptcha}
                            onChange={(e) => handleSettingChange('security', 'enableCaptcha', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
                    <button
                      onClick={() => handleSave('notifications')}
                      className="btn-primary flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </div>

                  <div className="space-y-4">
                    {Object.entries({
                      emailNotifications: 'Email Notifications',
                      newUserRegistration: 'New User Registration',
                      courseSubmissions: 'Course Submissions',
                      systemAlerts: 'System Alerts',
                      weeklyReports: 'Weekly Reports',
                      maintenanceAlerts: 'Maintenance Alerts'
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{label}</h4>
                          <p className="text-sm text-gray-600">
                            {key === 'emailNotifications' && 'Enable email notifications for admin alerts'}
                            {key === 'newUserRegistration' && 'Get notified when new users register'}
                            {key === 'courseSubmissions' && 'Get notified when courses are submitted for review'}
                            {key === 'systemAlerts' && 'Get notified about system issues and errors'}
                            {key === 'weeklyReports' && 'Receive weekly platform analytics reports'}
                            {key === 'maintenanceAlerts' && 'Get notified about scheduled maintenance'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications[key]}
                            onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Content Settings */}
              {activeTab === 'content' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Content Settings</h2>
                    <button
                      onClick={() => handleSave('content')}
                      className="btn-primary flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maximum File Size (MB)
                        </label>
                        <input
                          type="number"
                          value={settings.content.maxFileSize}
                          onChange={(e) => handleSettingChange('content', 'maxFileSize', parseInt(e.target.value))}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Allowed File Types
                        </label>
                        <input
                          type="text"
                          value={settings.content.allowedFileTypes}
                          onChange={(e) => handleSettingChange('content', 'allowedFileTypes', e.target.value)}
                          placeholder="pdf,doc,docx,jpg,png"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {Object.entries({
                        allowUserUploads: 'Allow User Uploads',
                        moderateContent: 'Moderate Content',
                        autoApprove: 'Auto-approve Courses',
                        enableComments: 'Enable Comments'
                      }).map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{label}</h4>
                            <p className="text-sm text-gray-600">
                              {key === 'allowUserUploads' && 'Allow users to upload files and media'}
                              {key === 'moderateContent' && 'Review all content before publishing'}
                              {key === 'autoApprove' && 'Automatically approve new course submissions'}
                              {key === 'enableComments' && 'Allow users to comment on courses and lessons'}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.content[key]}
                              onChange={(e) => handleSettingChange('content', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;