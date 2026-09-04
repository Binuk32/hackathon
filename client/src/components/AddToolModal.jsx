import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { createTool } from '../services/toolService';

export default function AddToolModal({ isOpen, onClose, onSuccess }) {
    const { user } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [quantity, setQuantity] = useState('');

    const [imageTab, setImageTab] = useState('upload'); // 'upload' or 'url'
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    // Handle image file selection with client-side canvas compression/resizing
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const maxDim = 800; // Resize large images down to max 800px

                if (width > maxDim || height > maxDim) {
                    if (width > height) {
                        height = Math.round((height * maxDim) / width);
                        width = maxDim;
                    } else {
                        width = Math.round((width * maxDim) / height);
                        height = maxDim;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                setImage(dataUrl);
                setImagePreview(dataUrl);
                setError('');
            };
            img.onerror = () => {
                setError('Failed to process image file.');
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleUrlChange = (e) => {
        const url = e.target.value;
        setImage(url);
        setImagePreview(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Form Validation per spec
        if (!name || name.trim() === '') {
            setError('Please enter a tool name.');
            return;
        }

        const parsedQuantity = parseInt(quantity, 10);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            setError('Quantity must be a positive number greater than 0.');
            return;
        }

        setLoading(true);

        try {
            await createTool({
                name: name.trim(),
                description: description.trim(),
                image: image.trim(),
                quantity: parsedQuantity
            });

            setLoading(false);
            // Reset form fields
            setName('');
            setDescription('');
            setImage('');
            setImagePreview('');
            setQuantity('');
            setError('');

            // Callback to refresh dashboard & close modal
            onSuccess('Tool added successfully.');
            onClose();
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Failed to add tool. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 overflow-y-auto" onClick={onClose}>
            <div className="bg-white w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                    <div>
                        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Add New Tool</h2>
                        <p className="text-slate-500 text-xs mt-0.5">Enter details to add inventory equipment to the system.</p>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="text-slate-400 hover:text-slate-700 text-2xl leading-none p-1 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        &times;
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Tool Name */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="tool-name">
                            Tool Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                            id="tool-name"
                            type="text"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                            placeholder="e.g. Cordless Drill, Concrete Mixer"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                            autoFocus
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="tool-desc">
                            Description
                        </label>
                        <textarea
                            id="tool-desc"
                            rows="2"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                            placeholder="Enter short description or specifications"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={loading}
                        ></textarea>
                    </div>

                    {/* Image Selection Tabs */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                Tool Image
                            </label>
                            <div className="flex gap-2 bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                                <button
                                    type="button"
                                    onClick={() => setImageTab('upload')}
                                    className={`px-2.5 py-1 rounded-md transition-all ${imageTab === 'upload' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
                                >
                                    Upload File
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setImageTab('url')}
                                    className={`px-2.5 py-1 rounded-md transition-all ${imageTab === 'url' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
                                >
                                    Image URL
                                </button>
                            </div>
                        </div>

                        {imageTab === 'upload' ? (
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors text-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="file-upload"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    disabled={loading}
                                />
                                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
                                    <svg className="w-8 h-8 text-slate-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-xs font-semibold text-slate-700">Click to select an image</span>
                                    <span className="text-[11px] text-slate-400 mt-0.5">PNG, JPG, WEBP (Auto-optimized)</span>
                                </label>
                            </div>
                        ) : (
                            <input
                                type="url"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                                placeholder="Paste image URL (https://...)"
                                value={imageTab === 'url' ? image : ''}
                                onChange={handleUrlChange}
                                disabled={loading}
                            />
                        )}

                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="mt-3 relative rounded-lg overflow-hidden border border-slate-200 h-28 bg-slate-100 flex items-center justify-center">
                                <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => { setImage(''); setImagePreview(''); }}
                                    className="absolute top-2 right-2 bg-slate-900/70 text-white rounded-full p-1 hover:bg-slate-900 text-xs"
                                >
                                    &times; Remove
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="quantity">
                            Initial Quantity <span className="text-rose-500">*</span>
                        </label>
                        <input
                            id="quantity"
                            type="number"
                            min="1"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                            placeholder="Enter total stock quantity (e.g. 10)"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            disabled={loading}
                        />
                        <p className="text-[11px] text-slate-400 mt-1">Available quantity will initially equal total quantity.</p>
                    </div>

                    {/* Validation Error Message */}
                    {error && (
                        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-semibold flex items-center gap-2">
                            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving Tool...
                                </>
                            ) : (
                                'Add Tool'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
