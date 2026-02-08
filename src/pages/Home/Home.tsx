 
export default function Home() {
    return (
        <section className="relative  lg:py-24 overflow-hidden bg-primary/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-10">

                {/* --- Left Column: Content --- */}
                <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-700">

                    {/* Trusted Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        Trusted by 2M+ Patients
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] text-orange">
                        Healthcare at <br />
                        your <span className="text-soft">fingertips.</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
                        Find and book consultations with top-rated specialists instantly.
                        Experience medical care from the comfort of your home.
                    </p>

                    {/* Search Bar Component */}
                    <div className="relative max-w-xl group">
                        <div className="flex items-center p-2 bg-white dark:bg-deep rounded-2xl shadow-2xl shadow-primary/10 border border-gray-100 dark:border-soft/20">
                            <div className="flex-grow flex items-center px-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search by specialty, doctor..."
                                    className="w-full px-4 py-3 bg-transparent focus:outline-none text-md"
                                />
                            </div>
                            <button className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-soft transition-all active:scale-95">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Specialist Avatars / Social Proof */}
                    <div className="flex items-center gap-4 pt-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-deep bg-soft flex items-center justify-center text-white font-bold text-xs">
                                    DR
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Join <span className="text-primary font-bold">500+</span> active specialists
                        </p>
                    </div>
                </div>

                {/* --- Right Column: Image --- */}
                <div className="relative hidden lg:block animate-in fade-in zoom-in duration-1000">
                    {/* Main Image Container with rounded corners from the reference */}
                    <div className="relative z-10 rounded-[40px] overflow-hidden border-[12px] border-white dark:border-primary/10 shadow-2xl">
                        <img
                            src="/doctor.jpg"
                            alt="Doctor using tablet"
                            className="w-full h-[600px] object-cover object-top"
                        />
                    </div>

                    {/* Decorative Background Glow */}
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-0"></div>
                    <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-orange/10 rounded-full blur-3xl -z-0"></div>
                </div>

            </div>
        </section>
    );
}