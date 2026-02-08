
export default function Home() {
    return (
        <section>
            {/* Hero Section */}
            <section className="relative  lg:py-24 overflow-hidden bg-gray-50/50 dark:bg-deep/20">
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
            {/* Social Proof Section */}
            <section className="py-12 bg-white dark:bg-black border-y border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Happy Patients", value: "50k+" },
                        { label: "Expert Doctors", value: "500+" },
                        { label: "Years Experience", value: "15+" },
                        { label: "Medical Centers", value: "80+" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <h3 className="text-3xl font-bold text-primary dark:text-soft">{stat.value}</h3>
                            <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>
            {/* Services Section */}
            <section className="py-24 bg-gray-50/50 dark:bg-deep/20">
                <div className="max-w-7xl mx-auto px-10">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl font-bold text-black dark:text-white">Our Medical Services</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">We provide a wide range of medical services to ensure you get the best care possible.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Telemedicine", desc: "Consult with doctors via video call from anywhere.", icon: "📱" },
                            { title: "Lab Tests", desc: "Book blood tests and diagnostics at home.", icon: "🔬" },
                            { title: "Pharmacy", desc: "Order medicines and get them delivered fast.", icon: "💊" },
                        ].map((service, i) => (
                            <div key={i} className="p-8 bg-white dark:bg-deep rounded-3xl border border-gray-100 dark:border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="text-4xl mb-6">{service.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Why Choose Us Section */}
            <section className="py-24 bg-white dark:bg-black overflow-hidden">
                <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="w-full aspect-square bg-primary/5 rounded-[60px] flex items-center justify-center overflow-hidden">

                            <div className="absolute rounded-[60px] inset-0 bg-cover bg-center opacity-10"
                                style={{ backgroundImage: "url('/login.jpg')" }}>
                            </div>
                            {/* Placeholder for a secondary medical image or illustration */}
                            <div className="z-10 p-10 bg-white dark:bg-deep rounded-3xl shadow-2xl border border-gray-100 dark:border-white/5">

                                <p className="text-primary font-bold">24/7 Support Available</p>
                                <p className="text-sm text-gray-500">We are always here for your health.</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold leading-tight">State-of-the-art care <br /><span className="text-soft">for you and your family.</span></h2>
                        <div className="space-y-6">
                            {["Verified Specialists", "Instant Booking", "Digital Health Records"].map((feat, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full bg-orange/20 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-orange"></div>
                                    </div>
                                    <span className="font-medium text-lg text-gray-700 dark:text-gray-300">{feat}</span>
                                </div>
                            ))}
                        </div>
                        <button className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold hover:scale-105 transition-transform">Learn More</button>
                    </div>
                </div>
            </section>
            {/* Top Rated Doctors Section */}
            <section className="py-24 bg-gray-50/50 dark:bg-deep/10">
                <div className="max-w-7xl mx-auto px-10">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold">Meet Our Specialists</h2>
                            <p className="text-gray-500 mt-2">Top rated doctors across all specialties.</p>
                        </div>
                        <button className="text-primary font-bold hover:underline">View All Doctors →</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="group bg-white dark:bg-deep rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 transition-all">
                                <div className="h-64 bg-gray-200 animate-pulse relative group-hover:bg-gray-300 transition-colors">
                                    {/* Actual Image would go here */}
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-lg">Dr. Sarah Johnson</h4>
                                    <p className="text-sm text-primary">Cardiologist</p>
                                    <div className="flex items-center gap-1 mt-3">
                                        <span className="text-orange">★</span>
                                        <span className="text-sm font-bold">4.9</span>
                                        <span className="text-xs text-gray-400 ml-1">(120 Reviews)</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* CTA */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-10">
                    <div className="relative bg-primary p-12 lg:p-20 rounded-[40px] overflow-hidden text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>

                        <div className="relative z-10 space-y-6 max-w-xl">
                            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">Ready to start your health journey?</h2>
                            <p className="text-white/80 text-lg">Join Medi. today and get your first consultation with a 20% discount.</p>
                        </div>

                        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                            <button className="px-10 py-5 bg-white text-primary rounded-2xl font-bold hover:bg-gray-100 transition-colors">Create Account</button>
                            <button className="px-10 py-5 bg-primary border border-white/30 text-white rounded-2xl font-bold hover:bg-white/10 transition-colors">Contact Us</button>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}