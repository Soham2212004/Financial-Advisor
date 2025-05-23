import React, { useState, useEffect } from 'react';
import { useApi } from '../contexts/ApiContext';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { User, DollarSign, Calendar } from 'lucide-react';

interface ProfileProps {
  userId: number;
  setUserId: (id: number) => void;
}

const Profile: React.FC<ProfileProps> = ({ userId, setUserId }) => {
  const api = useApi();
  const { theme } = useTheme();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    income: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.getUserProfile(userId);
      setProfile(data);
      setFormData({
        name: data.name || '',
        age: data.age ? data.age.toString() : '',
        income: data.income ? data.income.toString() : '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [api, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Clear success message on edit
    if (updateSuccess) {
      setUpdateSuccess(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (formData.age && (isNaN(parseInt(formData.age)) || parseInt(formData.age) < 0)) {
      newErrors.age = 'Age must be a positive number';
    }
    
    if (formData.income && (isNaN(parseFloat(formData.income)) || parseFloat(formData.income) < 0)) {
      newErrors.income = 'Income must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setUpdateLoading(true);
    setUpdateSuccess(false);
    
    try {
      await api.updateUserProfile(userId, {
        name: formData.name,
        age: formData.age ? parseInt(formData.age) : 0,
        income: formData.income ? parseFloat(formData.income) : 0,
      });
      
      await fetchProfile();
      setUpdateSuccess(true);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        <p>{error}</p>
        <button 
          onClick={fetchProfile} 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      
      <div className="max-w-2xl mx-auto">
        <Card title="Personal Information" icon={<User size={20} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />}>
          {updateSuccess && (
            <div className={`mb-4 p-3 rounded-md ${
              theme === 'dark' ? 'bg-emerald-900/30 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
            }`}>
              Profile updated successfully!
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              icon={<User size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />}
              error={errors.name}
            />
            
            <Input
              label="Age"
              name="age"
              type="number"
              placeholder="Your age"
              value={formData.age}
              onChange={handleChange}
              icon={<Calendar size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />}
              error={errors.age}
              min="0"
            />
            
            <Input
              label="Monthly Income"
              name="income"
              type="number"
              placeholder="0.00"
              value={formData.income}
              onChange={handleChange}
              icon={<DollarSign size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />}
              error={errors.income}
              min="0"
              step="0.01"
            />
            
            <Button
              type="submit"
              disabled={updateLoading}
              className="mt-2"
            >
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;