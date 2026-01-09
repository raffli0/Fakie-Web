import { useState } from 'react';
import { ImageWithFallback } from './res/ImageWithFallback';
import { ArrowLeft, Upload } from 'lucide-react';

interface SubmitSpotPageProps {
  onBackClick?: () => void;
}

export function SubmitSpotPage({ onBackClick }: SubmitSpotPageProps) {
  const [spotName, setSpotName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [spotType, setSpotType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
    if (!spotName || !location || !description || !spotType || !difficulty) {
      setError('Please fill in all required fields');
      return;
    }

    if (spotName.length < 3) {
      setError('Spot name must be at least 3 characters');
      return;
    }

    if (description.length < 20) {
      setError('Description must be at least 20 characters');
      return;
    }

    // Handle submit logic here
    console.log('Submit spot:', {
      spotName,
      location,
      description,
      spotType,
      difficulty,
      image: image?.name
    });

    // Show success message
    setSuccess(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      setSpotName('');
      setLocation('');
      setDescription('');
      setSpotType('');
      setDifficulty('');
      setImage(null);
      setSuccess(false);
    }, 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1593950404789-b4f0c865fb68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2F0ZWJvYXJkJTIwc3RyZWV0JTIwdXJiYW58ZW58MXx8fHwxNzY3ODk0NjcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Skateboarding background"
          className="w-full h-full object-cover opacity-30 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black"></div>
      </div>

      {/* Back Button */}
      {onBackClick && (
        <button
          onClick={onBackClick}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 text-neutral-400 hover:text-neutral-100 hover:cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      )}

      {/* Submit Spot Form */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl mb-4 tracking-tight text-neutral-100">
            Submit a Spot
          </h1>
          <p className="text-xl text-neutral-400">
            Share your favorite skate location with the crew
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
                <p className="text-lime-400 text-sm">Spot submitted successfully! 🛹</p>
              </div>
            )}

            {/* Spot Name Field */}
            <div>
              <label htmlFor="spotName" className="block text-neutral-100 mb-2">
                Spot Name <span className="text-red-400">*</span>
              </label>
              <input
                id="spotName"
                type="text"
                value={spotName}
                onChange={(e) => setSpotName(e.target.value)}
                placeholder="e.g., Riverside DIY"
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>

            {/* Location Field */}
            <div>
              <label htmlFor="location" className="block text-neutral-100 mb-2">
                Location <span className="text-red-400">*</span>
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., East Side, Downtown"
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>

            {/* Spot Type Dropdown */}
            <div>
              <label htmlFor="spotType" className="block text-neutral-100 mb-2">
                Spot Type <span className="text-red-400">*</span>
              </label>
              <select
                id="spotType"
                value={spotType}
                onChange={(e) => setSpotType(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-sm focus:outline-none focus:border-neutral-500 transition-colors"
              >
                <option value="">Select a type</option>
                <option value="DIY / Street">DIY / Street</option>
                <option value="Park">Park</option>
                <option value="Street Spot">Street Spot</option>
                <option value="Beginner Friendly">Beginner Friendly</option>
              </select>
            </div>

            {/* Difficulty Dropdown */}
            <div>
              <label htmlFor="difficulty" className="block text-neutral-100 mb-2">
                Difficulty <span className="text-red-400">*</span>
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-sm focus:outline-none focus:border-neutral-500 transition-colors"
              >
                <option value="">Select difficulty</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
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
                placeholder="Tell us about this spot—what makes it special? Any tips for skating here?"
                rows={4}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors resize-none"
              />
              <p className="text-neutral-500 text-sm mt-1">
                {description.length}/200 characters (minimum 20)
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-neutral-100 mb-2">
                Upload Image
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-neutral-100 text-black hover:bg-neutral-200 hover:cursor-pointer transition-colors rounded-sm tracking-wide"
            >
              SUBMIT SPOT
            </button>
          </form>

          {/* Info Note */}
          <div className="mt-6 p-4 bg-neutral-800/50 border border-neutral-700 rounded-sm">
            <p className="text-neutral-400 text-sm">
              Note: Your submission will be reviewed by our crew before going live. We'll notify you once it's approved!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
