import { useState } from 'react';
import { ImageWithFallback } from './res/ImageWithFallback';
import { ArrowLeft, Upload, Star, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface EditGearPageProps {
  onBackClick?: () => void;
}

// Mock data for pre-filled gear (in real app, this would come from props or API)
const mockGearData = {
  id: '1',
  gearName: 'Street Classic 8.0"',
  category: 'Deck',
  brand: 'Independent Skate Co.',
  description: 'Perfect street deck with medium concave. Durable 7-ply maple construction. Ideal for technical skating and consistent pop.',
  rating: '4.8',
  imageUrl: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2F0ZWJvYXJkJTIwZGVja3xlbnwxfHx8fDE3Njc4OTQ2NzB8MA&ixlib=rb-4.1.0&q=80&w=1080'
};

export function EditGearPage({ onBackClick }: EditGearPageProps) {
  const [gearName, setGearName] = useState(mockGearData.gearName);
  const [category, setCategory] = useState(mockGearData.category);
  const [brand, setBrand] = useState(mockGearData.brand);
  const [description, setDescription] = useState(mockGearData.description);
  const [rating, setRating] = useState(mockGearData.rating);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB');
        return;
      }
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      setImage(file);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!gearName || !category || !brand || !description || !rating) {
      setError('Please fill in all required fields');
      return;
    }

    if (gearName.length < 3) {
      setError('Gear name must be at least 3 characters');
      return;
    }

    if (description.length < 20) {
      setError('Description must be at least 20 characters');
      return;
    }

    const ratingNum = parseFloat(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      setError('Rating must be between 1 and 5');
      return;
    }

    // Handle submit logic here
    console.log('Save changes:', {
      id: mockGearData.id,
      gearName,
      category,
      brand,
      description,
      rating: ratingNum,
      image: image?.name
    });

    // Show success message
    setSuccess(true);

    // Reset success message after 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log('Delete gear:', mockGearData.id);

    // Close dialog and redirect
    setShowDeleteDialog(false);

    // Simulate deletion and redirect after short delay
    setTimeout(() => {
      if (onBackClick) {
        onBackClick();
      }
    }, 500);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1564982752979-d8f69c6e34f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxza2F0ZWJvYXJkfGVufDF8fHx8MTc2Nzg5NDY3MHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Skateboarding background"
          className="w-full h-full object-cover opacity-30 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black"></div>
      </div>

      {/* Back Button */}
      {onBackClick && (
        <button
          onClick={onBackClick}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 text-neutral-400 hover:text-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      )}

      {/* Edit Gear Form */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl mb-4 tracking-tight text-neutral-100">
            Edit Gear Review
          </h1>
          <p className="text-xl text-neutral-400">
            Update your gear review details
          </p>
        </div>

        <div className="p-8 bg-neutral-900/80 border border-neutral-800 rounded-sm backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-900/20 border border-red-800/30 rounded-sm">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-4 bg-lime-900/20 border border-lime-800/30 rounded-sm">
                <p className="text-lime-400 text-sm">Changes saved successfully! 🛹</p>
              </div>
            )}

            {/* Gear Name Field */}
            <div>
              <label htmlFor="gearName" className="block text-neutral-100 mb-2">
                Gear Name <span className="text-red-400">*</span>
              </label>
              <input
                id="gearName"
                type="text"
                value={gearName}
                onChange={(e) => setGearName(e.target.value)}
                placeholder="e.g., Stage 11 Standard"
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label htmlFor="category" className="block text-neutral-100 mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-sm focus:outline-none focus:border-neutral-500 transition-colors"
              >
                <option value="">Select a category</option>
                <option value="Deck">Deck</option>
                <option value="Trucks">Trucks</option>
                <option value="Wheels">Wheels</option>
              </select>
            </div>

            {/* Brand Field */}
            <div>
              <label htmlFor="brand" className="block text-neutral-100 mb-2">
                Brand <span className="text-red-400">*</span>
              </label>
              <input
                id="brand"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g., Independent, Spitfire, etc."
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>

            {/* Rating Field */}
            <div>
              <label htmlFor="rating" className="block text-neutral-100 mb-2">
                Rating <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="4.5"
                  className="w-32 px-4 py-3 bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
                />
                <div className="flex items-center gap-1 text-neutral-400">
                  <Star className="w-5 h-5 fill-amber-600 text-amber-600" />
                  <span>1.0 - 5.0</span>
                </div>
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-neutral-100 mb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share your experience with this gear. What makes it stand out? How does it perform?"
                rows={5}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors resize-none"
              />
              <p className="text-neutral-500 text-sm mt-1">
                {description.length}/300 characters (minimum 20)
              </p>
            </div>

            {/* Current Image Preview */}
            {!image && mockGearData.imageUrl && (
              <div>
                <label className="block text-neutral-100 mb-2">
                  Current Image
                </label>
                <div className="relative overflow-hidden rounded-sm border border-neutral-700">
                  <ImageWithFallback
                    src={mockGearData.imageUrl}
                    alt={gearName}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            )}

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-neutral-100 mb-2">
                {image || mockGearData.imageUrl ? 'Replace Image' : 'Upload Image'}
              </label>
              <div className="relative">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="flex items-center justify-center gap-3 w-full px-4 py-8 bg-neutral-800 border-2 border-dashed border-neutral-700 text-neutral-400 rounded-sm hover:border-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                >
                  <Upload className="w-6 h-6" />
                  <span>
                    {image ? image.name : 'Click to upload or drag and drop'}
                  </span>
                </label>
              </div>
              <p className="text-neutral-500 text-sm mt-1">
                JPG, PNG, or GIF (max 5MB)
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Save Changes Button */}
              <button
                type="submit"
                className="w-full py-4 bg-neutral-100 text-black hover:bg-neutral-200 transition-colors rounded-sm tracking-wide"
              >
                SAVE CHANGES
              </button>

              {/* Delete Gear Button */}
              <button
                type="button"
                onClick={() => setShowDeleteDialog(true)}
                className="w-full py-4 bg-transparent border-2 border-red-900/50 text-red-400 hover:bg-red-900/20 hover:border-red-800 transition-colors rounded-sm tracking-wide flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                DELETE REVIEW
              </button>
            </div>
          </form>

          {/* Info Note */}
          <div className="mt-6 p-4 bg-neutral-800/50 border border-neutral-700 rounded-sm">
            <p className="text-neutral-400 text-sm">
              💡 Changes will be visible to the crew immediately. Deleted reviews cannot be recovered.
            </p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-neutral-900 border-neutral-800 text-neutral-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-neutral-100">
              Delete this gear review?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              This action cannot be undone. This will permanently delete your review for "{gearName}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-neutral-800 text-neutral-100 border-neutral-700 hover:bg-neutral-700 hover:text-neutral-100"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-900 text-red-100 hover:bg-red-800 border-0"
            >
              Delete Review
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
