import HelmetLayout, { type HelmetProps } from "../../layouts/helmetlayout";
import { Save } from "lucide-react";
import { Upload } from "lucide-react";
import React, { useState } from "react";

export default function Main() {
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => setPhoto(null);
  const tags: HelmetProps = {
    pageTitle: "Profile",
    description: "",
  };

  return (
    <HelmetLayout {...tags}>
      <div className="">
        <>
          <div className="w-full ">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
              <div className="hidden md:block">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Profile Setup
                </h1>
                <p className="text-gray-500 text-sm">
                  Search thousands of job listings to find your next opportunity
                </p>
              </div>
              <button className="hidden md:flex items-center justify-center gap-2 cursor-pointer bg-[#67005E] hover:bg-[#51004B] text-white px-6 py-2.5 rounded-md transition w-full md:w-auto">
                <Save size={14} />
                Save Changes
              </button>
            </div>
            <div className="border rounded-lg border-grey-50 p-6 bg-white rounded-lg">
            <div className="border bg-white rounded-lg shadow-sm w-full p-5  border-grey-50">
              <h2 className="text-lg font-semibold mb-6 text-gray-800">
                Basic Information
              </h2>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                <div className="flex-shrink-0">
                  {photo ? (
                    <img
                      src={photo}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#2B0027] cursor-pointer flex items-center justify-center text-white text-3xl font-bold">
                      B
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <p className="font-semibold text-grey-500">Profile Photo</p>
                  <p className="text-sm text-[#1B1B1B] mb-3">
                    Upload a professional photo to help employers recognize you
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <label className="flex gap-2 items-center cursor-pointer border border-grey-50 bg-white text-grey-500 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 transition">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                      <Upload size={14} />
                      Upload Photo
                    </label>
                    <button
                      onClick={handleRemovePhoto}
                      className="text-[#C80000] text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <hr className="my-6 border-grey-50" />

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[16px] text-grey-500">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Blessing"
                    className="mt-1 w-full border border-grey-50 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700"
                  />
                </div>
                <div>
                  <label className="text-[16px] text-grey-500">Last Name</label>
                  <input
                    type="text"
                    placeholder="Bella"
                    className="mt-1 w-full border border-grey-50 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700"
                  />
                </div>
                <div>
                  <label className="text-[16px] text-grey-500">Email</label>
                  <input
                    type="email"
                    placeholder="blessingbella@gmail.com"
                    className="mt-1 w-full border border-grey-50 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700"
                  />
                </div>
                <div>
                  <label className="text-[16px] text-grey-500">Phone</label>
                  <input
                    type="text"
                    placeholder="+2349045637645"
                    className="mt-1 w-full border border-grey-50 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[16px] text-grey-500">Location</label>
                  <input
                    type="text"
                    placeholder="Nigeria"
                    className="mt-1 w-full border border-grey-50 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700"
                  />
                </div>
              </form>
            </div>
            </div>
            <div className="block md:hidden mt-8">
              <button className="flex items-center justify-center gap-2 cursor-pointer bg-[#67005E] hover:bg-[#51004B] text-white px-6 py-2.5 rounded-md transition w-full">
                <Save size={14} />
                Save Changes
              </button>
            </div>
          </div>
        </>
      </div>
    </HelmetLayout>
  );
}
