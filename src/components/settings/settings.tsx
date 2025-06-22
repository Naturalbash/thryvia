"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  Camera,
  Edit3,
  Save,
  X,
  Bell,
  Shield,
  Key,
  Globe,
  Moon,
  Sun,
  Eye,
  EyeOff,
  MapPin,
  Link,
} from "lucide-react";
import { UserInfo } from "@/hooks/user";

// Define interface for notifications state
interface Notifications {
  email: boolean;
  push: boolean;
}

// Load initial user info from localStorage or use default
const initialUserInfo = (): UserInfo => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("userInfo");
    return saved
      ? (JSON.parse(saved) as UserInfo)
      : {
          firstName: "Basheer",
          lastName: "Muhammed",
          username: "Naturalbash",
          email: "omogbolahanolaitan@gmail.com",
          bio: "Full-stack developer passionate about creating beautiful user experiences.",
          location: "Kwara, Nigeria",
          website: "https://naturalbash.dev",
          currentPassword: "B@b@tunde1",
          avatarUrl: "",
        };
  }
  return {
    firstName: "Basheer",
    lastName: "Muhammed",
    username: "Naturalbash",
    email: "omogbolahanolaitan@gmail.com",
    bio: "Full-stack developer passionate about creating beautiful user experiences.",
    location: "Kwara, Nigeria",
    website: "https://naturalbash.dev",
    currentPassword: "B@b@tunde1",
    avatarUrl: "",
  };
};

function DashboardSettings() {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notifications>({
    email: true,
    push: false,
  });
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo());
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState<boolean>(
    typeof window !== "undefined"
      ? localStorage.getItem("twoFAEnabled") === "true"
      : false
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save userInfo to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  // Save 2FA status to localStorage
  useEffect(() => {
    localStorage.setItem("twoFAEnabled", twoFAEnabled.toString());
  }, [twoFAEnabled]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit");
        return;
      }
      if (!["image/jpeg", "image/gif", "image/png"].includes(file.type)) {
        alert("Only JPG, GIF, or PNG files are allowed");
        return;
      }
      setIsUploading(true);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          // Convert file to base64 for local storage
          const reader = new FileReader();
          reader.onload = () => {
            setUserInfo((prev: UserInfo) => ({
              ...prev,
              avatarUrl: reader.result as string,
            }));
            setIsUploading(false);
            setUploadProgress(0);
          };
          reader.onerror = () => {
            alert("Failed to process image");
            setIsUploading(false);
            setUploadProgress(0);
          };
          reader.readAsDataURL(file);
        }
      }, 200);
    }
  };

  const handleEdit = (field: string) => {
    setEditingField(field);
  };

  const handleSave = (field: string, value: string) => {
    if (field === "currentPassword") {
      // Simulate password validation (e.g., minimum length)
      if (value.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
      }
      alert("Password updated successfully");
    } else if (field === "email") {
      // Simulate email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        alert("Invalid email address");
        return;
      }
      alert("Email updated successfully");
    }
    setUserInfo((prev: UserInfo) => ({ ...prev, [field]: value }));
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const handle2FA = () => {
    if (!twoFAEnabled) {
      // Simulate 2FA enable (e.g., sending a verification code)
      alert(
        "2FA enabled successfully. In a real app, a verification code would be sent."
      );
      setTwoFAEnabled(true);
    } else {
      alert("2FA disabled successfully");
      setTwoFAEnabled(false);
    }
  };

  interface EditableFieldProps {
    label: string;
    field: keyof UserInfo;
    value: string;
    placeholder?: string;
    type?: string;
    icon?: React.ReactNode;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const EditableField: React.FC<EditableFieldProps> = ({
    label,
    field,
    value,
    placeholder = "",
    type = "text",
    icon,
    showPassword,
    setShowPassword,
  }) => {
    const [tempValue, setTempValue] = useState<string>(value);

    return (
      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </label>
        <div className="relative">
          {editingField === field ? (
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type={
                    field === "currentPassword" && !showPassword
                      ? "password"
                      : type
                  }
                  value={tempValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTempValue(e.target.value)
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all"
                  placeholder={placeholder}
                  autoFocus
                />
                {field === "currentPassword" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                )}
              </div>
              <button
                onClick={() => handleSave(field, tempValue)}
                className="p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
              >
                <Save size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 group-hover:border-gray-300 transition-colors">
              <span className="text-gray-900">
                {field === "currentPassword"
                  ? showPassword
                    ? value
                    : "••••••••••••"
                  : value}
              </span>
              <div className="flex items-center space-x-2">
                {field === "currentPassword" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                )}
                <button
                  onClick={() => handleEdit(field)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-slate-800 transition-all"
                >
                  <Edit3 size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-slate-100 to-slate-200"
      } py-8 pl-20 pr-4`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`rounded-2xl shadow-xl overflow-hidden mb-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="bg-gradient-to-r from-slate-800 to-slate-800 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Account Settings</h1>
            <p className="text-slate-100 mt-2">
              Manage your account information and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div
              className={`rounded-2xl shadow-xl p-8 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-800 to-slate-800 flex items-center justify-center text-white text-4xl font-bold mb-4 overflow-hidden">
                    {userInfo.avatarUrl ? (
                      <Image
                        src={userInfo.avatarUrl}
                        alt="Avatar"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      `${userInfo.firstName[0]}${userInfo.lastName[0]}`
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 bg-slate-800 text-white p-3 rounded-full hover:bg-slate-900 transition-colors shadow-lg"
                  >
                    <Camera size={18} />
                  </button>
                  <input
                    type="file"
                    accept="image/jpeg,image/gif,image/png"
                    onChange={handleAvatarChange}
                    className="hidden"
                    ref={fileInputRef}
                  />
                </div>
                {isUploading && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-slate-800 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Uploading: {Math.round(uploadProgress)}%
                    </p>
                  </div>
                )}
                <h2
                  className={`text-2xl font-bold mt-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {userInfo.firstName} {userInfo.lastName}
                </h2>
                <p
                  className={`mt-1 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  @{userInfo.username}
                </p>
                <p
                  className={`text-sm mt-2 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {userInfo.bio}
                </p>

                <div
                  className={`mt-6 pt-6 border-t ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <p
                    className={`text-xs mb-2 ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    AVATAR REQUIREMENTS
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    JPG, GIF or PNG. Max size of 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div
              className={`rounded-2xl shadow-xl p-8 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex items-center mb-6">
                <User className="text-slate-800 mr-3" size={24} />
                <h3
                  className={`text-xl font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EditableField
                  label="First Name"
                  field="firstName"
                  value={userInfo.firstName}
                  placeholder="Enter your first name"
                  icon={<User size={16} className="text-gray-500" />}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <EditableField
                  label="Last Name"
                  field="lastName"
                  value={userInfo.lastName}
                  placeholder="Enter your last name"
                  icon={<User size={16} className="text-gray-500" />}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <EditableField
                  label="Username"
                  field="username"
                  value={userInfo.username}
                  placeholder="Enter your username"
                  icon={<User size={16} className="text-gray-500" />}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <EditableField
                  label="Email Address"
                  field="email"
                  value={userInfo.email}
                  placeholder="Enter your email"
                  type="email"
                  icon={<Mail size={16} className="text-gray-500" />}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <EditableField
                  label="Location"
                  field="location"
                  value={userInfo.location}
                  placeholder="Enter your location"
                  icon={<MapPin size={16} className="text-gray-500" />}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <EditableField
                  label="Website"
                  field="website"
                  value={userInfo.website}
                  placeholder="Enter your website URL"
                  type="url"
                  icon={<Link size={16} className="text-gray-500" />}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </div>

              <div className="mt-6">
                <EditableField
                  label="Bio"
                  field="bio"
                  value={userInfo.bio}
                  placeholder="Tell us about yourself"
                  icon={<Edit3 size={16} className="text-gray-500" />}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </div>
            </div>

            {/* Security Settings */}
            <div
              className={`rounded-2xl shadow-xl p-8 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex items-center mb-6">
                <Shield className="text-slate-800 mr-3" size={24} />
                <h3
                  className={`text-xl font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Security
                </h3>
              </div>

              <div className="space-y-6">
                <EditableField
                  label="Current Password"
                  field="currentPassword"
                  value={userInfo.currentPassword}
                  placeholder="Enter your current password"
                  type="password"
                  icon={<Key size={16} className="text-gray-500" />}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />

                <div
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <Shield
                      className={`mr-3 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                      size={20}
                    />
                    <div>
                      <p
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Two-Factor Authentication
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {twoFAEnabled
                          ? "2FA is enabled"
                          : "Add an extra layer of security"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handle2FA}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      darkMode
                        ? "border-gray-600 text-gray-300 hover:bg-gray-600"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
                  </button>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div
              className={`rounded-2xl shadow-xl p-8 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex items-center mb-6">
                <Globe className="text-slate-800 mr-3" size={24} />
                <h3
                  className={`text-xl font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Preferences
                </h3>
              </div>

              <div className="space-y-4">
                <div
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    {darkMode ? (
                      <Moon
                        className={`mr-3 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                        size={20}
                      />
                    ) : (
                      <Sun
                        className={`mr-3 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                        size={20}
                      />
                    )}
                    <div>
                      <p
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Dark Mode
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Toggle dark theme
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      darkMode ? "bg-slate-800" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        darkMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div
              className={`rounded-2xl shadow-xl p-8 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex items-center mb-6">
                <Bell className="text-slate-800 mr-3" size={24} />
                <h3
                  className={`text-xl font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Notifications
                </h3>
              </div>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <Bell
                        className={`mr-3 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                        size={20}
                      />
                      <div>
                        <p
                          className={`font-medium capitalize ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {`${key} Notifications`}
                        </p>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {key === "email" && "Receive notifications via email"}
                          {key === "push" && "Receive push notifications"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications((prev: Notifications) => ({
                          ...prev,
                          [key]: !value,
                        }))
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? "bg-slate-800" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`rounded-2xl shadow-xl p-8 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => alert("Changes saved locally!")}
                  className="flex-1 bg-slate-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-slate-900 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("twoFAEnabled");
                    alert("Account data cleared!");
                    setUserInfo(initialUserInfo());
                    setTwoFAEnabled(false);
                  }}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSettings;
