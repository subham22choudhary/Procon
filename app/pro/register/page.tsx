export default function ProRegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Register as a Professional
                </h1>

                <form className="space-y-5">
                    <div>
                        <label className="block text-sm mb-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Service Category</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Electrician, Plumber, Tutor, etc."
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Experience (Years)</label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="5"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="you@example.com"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
                    >
                        Create Professional Account
                    </button>
                </form>
            </div>
        </div>
    );
}
