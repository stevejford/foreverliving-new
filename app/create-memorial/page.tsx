'use client';

import { useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import DateInput from "@/components/ui/date-input";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';

interface FormData {
  fullName: string;
  dateOfBirth: Date | undefined;
  dateOfPassing: Date | undefined;
  biography: string;
  profilePhoto: File | null;
  additionalPhotos: File[];
  privacy: string;
  inviteEmails: string;
  customMessage: string;
}

export default function CreateMemorial() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    dateOfBirth: undefined,
    dateOfPassing: undefined,
    biography: '',
    profilePhoto: null,
    additionalPhotos: [],
    privacy: 'public',
    inviteEmails: '',
    customMessage: ''
  });

  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (field: 'dateOfBirth' | 'dateOfPassing') => (date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'profilePhoto' | 'additionalPhotos') => {
    const files = e.target.files;
    if (!files) return;

    if (field === 'profilePhoto') {
      setFormData(prev => ({
        ...prev,
        profilePhoto: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        additionalPhotos: Array.from(files)
      }));
    }
  };

  const uploadImage = async (file: File, path: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('memorial-images')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error('Error uploading image');
    }

    const { data: { publicUrl } } = supabase.storage
      .from('memorial-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('You must be logged in to create a memorial');
      return;
    }

    try {
      setIsSubmitting(true);

      // Upload profile photo
      let profilePhotoUrl = '';
      if (formData.profilePhoto) {
        profilePhotoUrl = await uploadImage(formData.profilePhoto, 'profile-photos');
      }

      // Upload additional photos
      const additionalPhotoUrls = await Promise.all(
        formData.additionalPhotos.map(photo => 
          uploadImage(photo, 'additional-photos')
        )
      );

      // Create memorial record
      const { error: insertError } = await supabase
        .from('memorials')
        .insert({
          user_id: user.id,
          name: formData.fullName,
          birth_date: formData.dateOfBirth?.toISOString().split('T')[0],
          death_date: formData.dateOfPassing?.toISOString().split('T')[0],
          description: formData.biography,
          image_url: profilePhotoUrl,
          additional_photos: additionalPhotoUrls,
          privacy: formData.privacy
        });

      if (insertError) throw insertError;

      toast.success('Memorial created successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error creating memorial:', error);
      toast.error(error.message || 'Failed to create memorial');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter their full name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <DateInput
                  id="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleDateChange('dateOfBirth')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Passing
                </label>
                <DateInput
                  id="dateOfPassing"
                  value={formData.dateOfPassing}
                  onChange={handleDateChange('dateOfPassing')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Brief Biography
              </label>
              <textarea
                name="biography"
                value={formData.biography}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Share a brief story about their life..."
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Profile Photo
              </label>
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-2 text-center">
                  <div className="mx-auto h-24 w-24 text-gray-400">
                    <FaUpload className="mx-auto h-12 w-12" />
                  </div>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload a photo</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'profilePhoto')}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Additional Photos
              </label>
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-2 text-center">
                  <div className="mx-auto h-24 w-24 text-gray-400">
                    <FaUpload className="mx-auto h-12 w-12" />
                  </div>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload photos</span>
                      <input
                        type="file"
                        multiple
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'additionalPhotos')}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Up to 10 photos, PNG or JPG
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Memorial Privacy
              </label>
              <select
                name="privacy"
                value={formData.privacy}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="public">Public - Anyone can view</option>
                <option value="private">Private - Only invited members</option>
                <option value="password">Password Protected</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Invite Family & Friends
              </label>
              <textarea
                name="inviteEmails"
                value={formData.inviteEmails}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email addresses, separated by commas..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Custom Message
              </label>
              <textarea
                name="customMessage"
                value={formData.customMessage}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a personal message to the invitation..."
              />
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-8"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create a Memorial
            </h1>
            <p className="text-gray-600">
              Honor your loved one by creating a beautiful memorial page.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index < totalSteps - 1 ? "flex-1" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step > index
                        ? "bg-blue-600 text-white"
                        : step === index + 1
                        ? "bg-blue-100 text-blue-600 border-2 border-blue-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < totalSteps - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        step > index + 1 ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Basic Information</span>
              <span>Photos</span>
              <span>Privacy & Sharing</span>
            </div>
          </div>

          {/* Step Content */}
          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className={`px-6 py-2 rounded-lg ${
                step === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => step === totalSteps ? handleSubmit() : setStep(step + 1)}
              disabled={isSubmitting}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting 
                ? 'Creating...' 
                : step === totalSteps 
                  ? "Create Memorial" 
                  : "Next"
              }
            </button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
